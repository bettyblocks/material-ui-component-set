(() => ({
  name: 'DataTable',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Children,
      defineFunction = () => {},
      env,
      getProperty,
      GetMe,
      InteractionScope,
      ModelProvider,
      triggerEvent = () => {},
      useAllQuery,
      useFilter,
      useText,
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
      labelNumberOfPages,
      labelSearchOn,
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
    const skipAppend = useRef(false);
    const [skip, setSkip] = useState(0);
    const loadOnScroll = pagination === 'never' && autoLoadOnScroll;
    const autoLoadTakeAmountNum = parseInt(autoLoadTakeAmount, 10);
    const [rowsPerPage, setRowsPerPage] = useState(takeNum);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPagination, setShowPagination] = useState(false);
    const { label: searchPropertyLabel = '{property}' } =
      getProperty(searchProperty) || {};
    const [orderBy, setOrderBy] = React.useState({
      field: [orderProperty].flat() || null,
      order: orderProperty ? sortOrder : null,
    });
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const fetchingNextSet = useRef(false);
    const [initialTimesFetched, setInitialTimesFetched] = useState(0);
    const amountOfRows = loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage;

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
    const toolbarRef = React.createRef();
    const paginationRef = React.createRef();
    const [stylesProps, setStylesProps] = useState(null);

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

    let path = [searchProperty].flat();
    if (typeof searchProperty.id !== 'undefined') {
      path = [searchProperty.id].flat();
    }

    const searchFilter = searchProperty
      ? path.reduceRight(
          (acc, property, index) =>
            index === path.length - 1
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
      useAllQuery(model, {
        rawFilter: where,
        variables,
        skip: loadOnScroll ? skip : page * rowsPerPage,
        take: loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage,
      });

    useEffect(() => {
      if (!isDev && data) {
        if (pagination !== 'never') {
          setResults(data.results);
          setTotalCount(data.totalCount);
          return;
        }
        if (searchTerm !== previousSearchTerm) {
          setSkip(0);
          setInitialTimesFetched(0);
          setPreviousSearchTerm(searchTerm);
          setNewSearch(true);
        } else {
          if (newSearch || (!autoLoadOnScroll && skipAppend.current)) {
            setResults(data.results);
          } else {
            setResults(prev => [...prev, ...data.results]);
          }
          fetchingNextSet.current = false;
          setNewSearch(false);
        }
        skipAppend.current = false;
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

    function clearResults() {
      setInitialTimesFetched(0);
      setResults([]);
      setTimeout(() => {
        setSkip(0);
      }, 0);
    }

    defineFunction('Refetch', () => {
      if (pagination === 'never') {
        clearResults();
        skipAppend.current = true;
        setTimeout(() => {
          refetch();
        }, 0);
      } else {
        refetch();
      }
    });

    defineFunction('SetSearchValue', event => {
      setSearch(event.target.value);
    });

    useEffect(() => {
      if (!isDev) return;
      const repeat = () => {
        if (!repeaterRef.current) return;
        if (repeaterRef.current.previousElementSibling.children.length === 0) {
          return;
        }
        repeaterRef.current.innerHTML = '';
        for (let i = 0, j = amountOfRows - 1; i < j; i += 1) {
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

    const mounted = useRef(false);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useEffect(() => {
      if (mounted.current && loading) {
        triggerEvent('onLoad', loading);
      }
    }, [loading]);

    if (error && !displayError) {
      triggerEvent('onError', error);
    }

    if (results.length > 0) {
      triggerEvent('onSuccess', results);
    } else {
      triggerEvent('onNoResults');
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

    const handleRowClick = (endpoint, context) => {
      if (isDev) return;
      triggerEvent('OnRowClick', endpoint, context);
      if (hasLink) {
        const history = useHistory();
        history.push(endpoint);
      }
    };

    const renderTableHead = () => {
      if ((loading && !loadOnScroll) || error) {
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
      if ((loading && !loadOnScroll) || error) {
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
          <InteractionScope model={model}>
            {context => (
              <TableRow
                key={value[0]}
                classes={{ root: classes.bodyRow }}
                data-id={value.id}
              >
                <Children
                  linkTo={linkTo}
                  handleRowClick={handleRowClick}
                  context={context}
                >
                  {children}
                </Children>
              </TableRow>
            )}
          </InteractionScope>
        </ModelProvider>
      ));

      if (authProfile) {
        return <GetMe authenticationProfileId={authProfile}>{rows}</GetMe>;
      }

      return rows;
    };

    const renderTableContent = () => {
      if (isDev) {
        return (
          <TableRow classes={{ root: classes.bodyRow }}>{children}</TableRow>
        );
      }

      if (model) {
        return tableContentModel();
      }

      return Array.from(Array(amountOfRows).keys()).map(idx => (
        <TableRow key={idx} classes={{ root: classes.bodyRow }}>
          {children}
        </TableRow>
      ));
    };

    useEffect(() => {
      if (loadOnScroll && !isDev) {
        const fetchNextSet = () => {
          fetchingNextSet.current = true;
          if (!initialRender.current) {
            setSkip(prev => prev + autoLoadTakeAmountNum);
          }
          initialRender.current = false;
        };

        const tableContainerElement = tableContainerRef.current;
        if (loadOnScroll) {
          const parent = tableContainerElement.parentNode;

          if (
            tableContainerElement.scrollHeight <= parent.clientHeight &&
            initialTimesFetched < 5
          ) {
            setInitialTimesFetched(prev => prev + 1);
            fetchNextSet();
          }
          const scrollEvent = e => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            const offset = scrollHeight / 5;
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
      if (pagination === 'never') {
        const dataResults = data && data.results;
        const needsCacheFix =
          results.length === 0 && dataResults && dataResults.length > 0;

        const setExistingData = () => {
          setResults(dataResults);
          fetchingNextSet.current = false;
        };

        if (needsCacheFix && !autoLoadOnScroll) {
          setExistingData();
        }
        if (needsCacheFix && autoLoadOnScroll && skip === 0) {
          setExistingData();
        }
        if (needsCacheFix && autoLoadOnScroll && skip !== 0) {
          setSkip(0);
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

    useEffect(() => {
      let amount = 0;
      if (hasToolbar) {
        amount += toolbarRef.current.clientHeight;
      }
      if (showPagination) {
        amount += paginationRef.current.clientHeight;
      }
      let style;
      if (amount > 0 || !hasToolbar) {
        style = {
          height: `calc(100% - ${amount}px)`,
          borderRadius: `${hasToolbar ? '0rem' : '0.1875rem'}`,
        };
        setStylesProps({ style });
      } else {
        setStylesProps(null);
      }
    }, [showPagination, hasToolbar]);

    return (
      <div className={classes.root}>
        <Paper
          classes={{ root: classes.paper }}
          square={square}
          variant={variant}
          elevation={elevationLevel}
        >
          {hasToolbar && (
            <Toolbar ref={toolbarRef} classes={{ root: classes.toolbar }}>
              {titleText && <span className={classes.title}>{titleText}</span>}
              {searchProperty && !hideSearch && (
                <TextField
                  classes={{ root: classes.searchField }}
                  placeholder={`${useText(
                    labelSearchOn,
                  )} ${searchPropertyLabel}`}
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
            {...stylesProps}
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
              ref={paginationRef}
              classes={{ root: classes.pagination }}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              labelRowsPerPage={useText(labelRowsPerPage)}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${useText(labelNumberOfPages)} ${count}`
              }
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
    const { env, mediaMinWidth, Styling } = B;
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
        height: '100%',
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
        [`@media ${mediaMinWidth(600)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { titleType } }) =>
            style.getFontSize(titleType, 'Desktop'),
        },
      },
      headerRow: {
        backgroundColor: ({ options: { backgroundHeader } }) => [
          style.getColor(backgroundHeader),
          '!important',
        ],
        '& div': {
          borderBottom: `${isDev ? '0.0625rem solid #cccccc' : 0}`,
        },
        '& th, & div[role="columnheader"]': {
          borderBottom: `${isDev ? 0 : '0.0625rem solid #cccccc!important'}`,
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
        borderRadius: '0.1875rem',
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
        [`@media ${mediaMinWidth(600)}`]: {
          height: `calc(${style.getFont('Body1').Portrait} * 1.2)`,
        },
        [`@media ${mediaMinWidth(960)}`]: {
          height: `calc(${style.getFont('Body1').Landscape} * 1.2)`,
        },
        [`@media ${mediaMinWidth(1280)}`]: {
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
      [`@media ${mediaMinWidth(600)}`]: {
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
      [`@media ${mediaMinWidth(960)}`]: {
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
      [`@media ${mediaMinWidth(1280)}`]: {
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
