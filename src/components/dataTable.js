(() => ({
  name: 'DataTable',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Children,
      env,
      getProperty,
      GetMe,
      useText,
      ModelProvider,
      useEndpoint,
      useGetAll,
      useFilter,
    } = B;
    const {
      Table,
      TableBody,
      TableContainer,
      TableHead,
      TableRow,
      TableCell,
      TablePagination,
      Paper,
      Toolbar,
      TextField,
      InputAdornment,
    } = window.MaterialUI.Core;
    const { Search } = window.MaterialUI.Icons;
    const isDev = env === 'dev';
    const {
      take,
      size,
      model,
      authProfile,
      filter,
      searchProperty,
      hideSearch,
      orderProperty,
      sortOrder,
      labelRowsPerPage,
      square,
      elevation,
      variant,
      stickyHeader,
      title,
      pagination,
      linkTo,
      showError,
      autoLoadOnScroll,
      autoLoadTakeAmount,
    } = options;
    const repeaterRef = React.createRef();
    const tableRef = React.createRef();
    const tableContainerRef = React.createRef();
    const displayError = showError === 'built-in';
    const [page, setPage] = useState(0);
    const takeNum = parseInt(take, 10);
    const initialRender = useRef(true);
    const [skip, setSkip] = useState(0);
    const autoLoadTakeAmountNum = parseInt(autoLoadTakeAmount, 10);
    const [rowsPerPage, setRowsPerPage] = useState(takeNum);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPagination, setShowPagination] = useState(true);
    const searchPropertyArray = [searchProperty].flat();
    const { label: searchPropertyLabel = '{property}' } =
      getProperty(searchProperty) || {};
    const [orderBy, setOrderBy] = React.useState({
      field: [orderProperty].flat() || null,
      order: orderProperty ? sortOrder : null,
    });

    const createSortObject = (fields, order) => {
      const fieldsArray = [fields].flat();
      const sort = fieldsArray.reduceRight((acc, property, index) => {
        const prop = getProperty(property);
        return index === fieldsArray.length - 1
          ? { [prop.name]: order.toUpperCase() }
          : { [prop.name]: acc };
      }, {});

      return sort;
    };
    const [variables, setVariables] = useState(
      orderProperty
        ? {
            sort: {
              relation: !isDev && createSortObject(orderProperty, sortOrder),
            },
          }
        : {},
    );

    const titleText = useText(title);
    const hasToolbar = titleText || (searchProperty && !hideSearch);
    const elevationLevel = variant === 'flat' ? 0 : elevation;
    const hasLink = linkTo && linkTo.id !== '';

    const deepMerge = (...objects) => {
      const isObject = item =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach(key => {
          const accumulatorValue = accumulator[key];
          const value = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
            accumulator[key] = accumulatorValue.concat(value);
          } else if (isObject(accumulatorValue) && isObject(value)) {
            accumulator[key] = deepMerge(accumulatorValue, value);
          } else {
            accumulator[key] = value;
          }
        });
        return accumulator;
      }, {});
    };

    const searchFilter = searchProperty
      ? searchPropertyArray.reduceRight(
          (acc, property, index) =>
            index === searchPropertyArray.length - 1
              ? { [property]: { matches: searchTerm } }
              : { [property]: acc },
          {},
        )
      : {};

    const newFilter =
      searchProperty && searchTerm !== ''
        ? deepMerge(filter, searchFilter)
        : filter;
    const where = useFilter(newFilter);

    const { loading, error, data, refetch } =
      model &&
      useGetAll(model, {
        rawFilter: where,
        variables,
        skip: (pagination !== 'never' && page * rowsPerPage) || skip,
        take: (pagination !== 'never' && rowsPerPage) || autoLoadTakeAmountNum,
      });

    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const fetchingNextSet = useRef(false);

    useEffect(() => {
      if (!isDev && data) {
        if (pagination !== 'never') {
          setResults(data.results);
          setTotalCount(data.totalCount);
          return;
        }
        if (searchTerm !== previousSearchTerm) {
          setSkip(0);
          setPreviousSearchTerm(searchTerm);
          setNewSearch(true);
        } else {
          if (newSearch) {
            setResults(data.results);
          } else {
            setResults(prev => [...prev, ...data.results]);
          }
          fetchingNextSet.current = false;
          setNewSearch(false);
        }
        setTotalCount(data.totalCount);
      }
    }, [data, searchTerm]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setSearchTerm(search);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [search]);

    useEffect(() => {
      B.defineFunction('Refetch', () => refetch());
      B.defineFunction('SetSearchValue', event => {
        setSearch(event.target.value);
      });
    }, []);

    useEffect(() => {
      if (!isDev) return;
      const repeat = () => {
        if (!repeaterRef.current) return;
        if (repeaterRef.current.previousElementSibling.children.length === 0) {
          return;
        }
        repeaterRef.current.innerHTML = '';
        const amount = pagination !== 'never' ? takeNum : autoLoadTakeAmountNum;
        for (let i = 0, j = amount - 1; i < j; i += 1) {
          repeaterRef.current.innerHTML +=
            repeaterRef.current.previousElementSibling.children[0].outerHTML;
        }
      };
      const mutationObserver = new MutationObserver(() => {
        repeat();
      });
      mutationObserver.observe(tableRef.current, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      });
      repeat();
    });

    useEffect(() => {
      setRowsPerPage(takeNum);
    }, [takeNum]);

    const mounted = useRef(true);
    useEffect(() => {
      if (!mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
      mounted.current = false;
    }, [loading]);

    if (error && !displayError) {
      B.triggerEvent('onError', error.message);
    }

    if (results.length > 0) {
      B.triggerEvent('onSuccess', results);
    } else {
      B.triggerEvent('onNoResults');
    }

    const handleChangePage = (_, newPage) => {
      if (loading || error) return;
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      if (loading || error) return;
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleSort = (field, newOrder) => {
      if (isDev) return;
      setOrderBy({ field, order: newOrder });
      setVariables({
        sort: {
          relation: createSortObject(field, newOrder),
        },
      });
    };

    const handleSearch = event => {
      setSearch(event.target.value);
    };

    const isFlatValue = value =>
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean';

    const history = isDev ? {} : useHistory();

    const handleRowClick = rowValue => {
      if (isDev) return;
      B.triggerEvent('OnRowClick', rowValue);
      if (hasLink) {
        const { id, params } = linkTo;
        const newParams = Object.entries(params).reduce((acc, cv) => {
          const key = cv[0];
          const value = cv[1];
          if (isFlatValue(value[0])) {
            acc[key] = value;
          } else {
            const propId = value[0].id;
            const property = getProperty(propId).name;
            acc[key] = [rowValue[property].toString()];
          }
          return acc;
        }, {});

        const endpointParams = {
          id,
          params: newParams,
        };
        history.push(useEndpoint(endpointParams));
      }
    };

    const renderTableHead = () => {
      if ((loading && pagination !== 'never') || error) {
        return Array.from(Array(children.length).keys()).map(colIdx => (
          <TableCell key={colIdx}>
            <div className={classes.skeleton}>
              {error && displayError && error.message}
            </div>
          </TableCell>
        ));
      }
      return (
        <Children headerOnly handleSort={handleSort} orderBy={orderBy}>
          {children}
        </Children>
      );
    };

    const tableContentModel = () => {
      if ((loading && pagination !== 'never') || error) {
        return Array.from(Array(rowsPerPage).keys()).map(idx => (
          <TableRow key={idx} classes={{ root: classes.bodyRow }}>
            {Array.from(Array(children.length).keys()).map(colIdx => (
              <TableCell key={colIdx}>
                <div className={classes.skeleton} />
              </TableCell>
            ))}
          </TableRow>
        ));
      }

      const rows = results.map(value => (
        <ModelProvider value={value} id={model}>
          <TableRow
            key={value[0]}
            classes={{ root: classes.bodyRow }}
            onClick={() => handleRowClick(value)}
            data-id={value.id}
          >
            {children}
          </TableRow>
        </ModelProvider>
      ));

      if (authProfile) {
        return <GetMe authenticationProfileId={authProfile}>{rows}</GetMe>;
      }

      return rows;
    };

    const renderTableContent = () => {
      let tableContent = Array.from(
        Array(
          pagination !== 'never' ? rowsPerPage : autoLoadTakeAmountNum,
        ).keys(),
      ).map(idx => (
        <TableRow key={idx} classes={{ root: classes.bodyRow }}>
          {children}
        </TableRow>
      ));
      if (isDev) {
        tableContent = (
          <TableRow classes={{ root: classes.bodyRow }}>{children}</TableRow>
        );
      } else if (model) {
        tableContent = tableContentModel();
      }
      return tableContent;
    };

    useEffect(() => {
      if (autoLoadOnScroll && !isDev) {
        const increaseSkipAmount = () => {
          if (!initialRender.current) {
            setSkip(prev => prev + autoLoadTakeAmountNum);
          }
          initialRender.current = false;
        };
        const fetchNextSet = () => {
          fetchingNextSet.current = true;
          increaseSkipAmount();
        };

        const offset = 500;
        const tableContainerElement = tableContainerRef.current;
        if (autoLoadOnScroll) {
          const parent = tableContainerElement.parentNode;
          if (tableContainerElement.scrollHeight <= parent.clientHeight) {
            fetchNextSet();
          }
          const scrollEvent = e => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            const hitBottom = scrollTop + clientHeight >= scrollHeight - offset;
            if (hitBottom && !fetchingNextSet.current) {
              fetchNextSet();
            }
          };
          tableContainerElement.addEventListener('scroll', scrollEvent);
        }
      }
    }, [results]);

    useEffect(() => {
      if (isDev) {
        if (pagination === 'never') {
          setShowPagination(false);
        } else {
          setShowPagination(true);
        }
      }
    }, [pagination]);

    useEffect(() => {
      if (!isDev && data) {
        switch (pagination) {
          case 'never':
            setShowPagination(false);
            break;
          case 'whenNeeded':
            if (rowsPerPage >= data.totalCount) {
              setShowPagination(false);
            } else {
              setShowPagination(true);
            }
            break;
          default:
          case 'always':
            setShowPagination(true);
            break;
        }
      }
    }, [data, rowsPerPage]);

    return (
      <div className={classes.root}>
        <Paper
          classes={{ root: classes.paper }}
          square={square}
          variant={variant}
          elevation={elevationLevel}
        >
          {hasToolbar && (
            <Toolbar classes={{ root: classes.toolbar }}>
              {titleText && <span className={classes.title}>{titleText}</span>}
              {searchProperty && (
                <TextField
                  classes={{ root: classes.searchField }}
                  placeholder={`Search on ${searchPropertyLabel}`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
              )}
            </Toolbar>
          )}
          <TableContainer
            ref={tableContainerRef}
            classes={{ root: classes.container }}
          >
            <Table
              stickyHeader={stickyHeader}
              size={size}
              classes={{ root: classes.tableRoot }}
            >
              <TableHead>
                <TableRow classes={{ root: classes.headerRow }}>
                  {renderTableHead()}
                </TableRow>
              </TableHead>
              <TableBody ref={tableRef}>{renderTableContent()}</TableBody>
              {isDev && (
                <TableBody ref={repeaterRef} className={classes.autoRepeat} />
              )}
            </Table>
          </TableContainer>
          {showPagination && (
            <TablePagination
              classes={{ root: classes.pagination }}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              labelRowsPerPage={useText(labelRowsPerPage)}
              component="div"
              count={model ? totalCount : takeNum}
              rowsPerPage={model ? rowsPerPage : takeNum}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </div>
    );
  })(),
  styles: B => theme => {
    const { env, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: ({ options: { height } }) => height,
      },
      paper: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
        height: '100%',
      },
      container: {
        height: ({ options: { hideSearch, searchProperty } }) => {
          if (searchProperty !== '' && !hideSearch) {
            return 'calc(100% - 64px)';
          }
          return '100%';
        },
      },
      tableRoot: {
        tableLayout: 'fixed',
      },
      toolbar: {
        paddingLeft: ['1rem', '!important'],
        paddingRight: ['1rem', '!important'],
      },
      title: {
        color: ({ options: { titleType } }) => style.getFontColor(titleType),
        fontFamily: ({ options: { titleType } }) =>
          style.getFontFamily(titleType),
        fontSize: ({ options: { titleType } }) => style.getFontSize(titleType),
        fontWeight: ({ options: { titleType } }) =>
          style.getFontWeight(titleType),
        textTransform: ({ options: { titleType } }) =>
          style.getTextTransform(titleType),
        letterSpacing: ({ options: { titleType } }) =>
          style.getLetterSpacing(titleType),
        lineHeight: '1.2',
        [`@media ${B.mediaMinWidth(600)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Desktop'),
        },
      },
      headerRow: {
        backgroundColor: ({ options: { backgroundHeader } }) => [
          style.getColor(backgroundHeader),
          '!important',
        ],
        '& th': {
          backgroundColor: ({ options: { backgroundHeader } }) => [
            style.getColor(backgroundHeader),
            '!important',
          ],
        },
      },
      bodyRow: {
        cursor: ({ options: { linkTo } }) =>
          linkTo && linkTo.id !== '' && 'pointer',
        '&:hover td': {
          backgroundColor: ({ options: { linkTo, backgroundRowHover } }) =>
            linkTo && [style.getColor(backgroundRowHover), '!important'],
        },
      },
      searchField: {
        marginLeft: ['auto', '!important'],
        pointerEvents: isDev && 'none',
      },
      pagination: {
        pointerEvents: isDev && 'none',
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      autoRepeat: {
        opacity: 0.5,
      },
      skeleton: {
        height: `calc(${style.getFont('Body1').Mobile} * 1.2)`,
        [`@media ${B.mediaMinWidth(600)}`]: {
          height: `calc(${style.getFont('Body1').Portrait} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          height: `calc(${style.getFont('Body1').Landscape} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          height: `calc(${style.getFont('Body1').Desktop} * 1.2)`,
        },
        backgroundColor: '#eee',
        borderRadius: 8,
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: `calc(${style.getFont('Body2').Landscape} / 2)`,
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
      [`@media ${B.mediaMinWidth(600)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(960)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1280)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
