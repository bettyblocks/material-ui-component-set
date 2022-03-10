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
      InteractionScope,
      ModelProvider,
      useAllQuery,
      useFilter,
      useRelation,
      useText,
      Icon,
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
      Checkbox,
    } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const {
      take,
      placeholderTake,
      size,
      model,
      filter,
      searchProperty,
      hideSearch,
      orderProperty,
      sortOrder,
      labelRowsPerPage,
      labelNumberOfPages,
      labelSearchOn,
      square,
      striped,
      elevation,
      variant,
      stickyHeader,
      title,
      pagination,
      linkTo,
      showError,
      autoLoadOnScroll,
      autoLoadTakeAmount,
      dataComponentAttribute,
      enableRecordSelection,
      showSelectedRecordCount,
      selectionHeaderText,
      totalRecordsSelectedText,
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
    const [interactionSearchTerm, setInteractionSearchTerm] = useState('');
    const [interactionSearchProperty, setInteractionSearchProperty] =
      useState('');
    const [previousInteractionSearchTerm, setPreviousInteractionSearchTerm] =
      useState('');
    const [
      previousInteractionSearchProperty,
      setPreviousInteractionSearchProperty,
    ] = useState('');
    const [showPagination, setShowPagination] = useState(false);
    const [interactionFilter, setInteractionFilter] = useState({});
    const perPageLabel = useText(labelRowsPerPage);
    const numOfPagesLabel = useText(labelNumberOfPages);

    const { label: searchPropertyLabel = '{property}', kind } =
      getProperty(searchProperty) || {};
    let orderPropertyPath = null;
    if (orderProperty && Array.isArray(orderProperty.id)) {
      orderPropertyPath = orderProperty.id;
    } else if (orderProperty && orderProperty.id) {
      orderPropertyPath = [orderProperty.id];
    }
    const [orderBy, setOrderBy] = React.useState({
      field: orderPropertyPath,
      order: orderProperty ? sortOrder : null,
    });
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const [selectedIds, setSelected] = useState([]);
    const fetchingNextSet = useRef(false);
    const [initialTimesFetched, setInitialTimesFetched] = useState(0);
    const amountOfRows = loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage;
    const history = isDev ? null : useHistory();

    const createSortObject = (fields, order) => {
      const sort = fields.reduceRight((acc, property, index) => {
        const prop = getProperty(property);
        return index === fields.length - 1
          ? { [prop.name]: order.toUpperCase() }
          : { [prop.name]: acc };
      }, {});

      return sort;
    };

    const [variables, setVariables] = useState(
      orderPropertyPath
        ? {
            sort: {
              relation:
                !isDev && createSortObject(orderPropertyPath, sortOrder),
            },
          }
        : {},
    );

    const titleText = useText(title);
    const hasSearchProperty = searchProperty && searchProperty.id;
    const hasToolbar = titleText || (hasSearchProperty && !hideSearch);
    const elevationLevel = variant === 'flat' ? 0 : elevation;
    const hasLink = linkTo && linkTo.id !== '';
    const toolbarRef = React.createRef();
    const paginationRef = React.createRef();
    const [stylesProps, setStylesProps] = useState(null);

    const deepMerge = (...objects) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach((key) => {
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

    const transformValue = (value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }

      return value;
    };

    B.defineFunction('Filter', ({ event, property, interactionId }) => {
      if (typeof event === 'undefined') return;
      setInteractionFilter({
        ...interactionFilter,
        [interactionId]: {
          property,
          value: event.target ? event.target.value : transformValue(event),
        },
      });
      setInteractionSearchTerm(
        event.target ? event.target.value : transformValue(event),
      );
      setInteractionSearchProperty(property ? property.id : '');
    });

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
      setInteractionSearchTerm('');
      setInteractionSearchProperty('');
    });

    let interactionFilters = {};

    const isEmptyValue = (value) =>
      !value || (Array.isArray(value) && value.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value }]) => !isEmptyValue(value))
      .map(([, { property, value }]) =>
        property.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(value)
              ? {
                  _or: value.map((el) => ({
                    [field]: { [property.operator]: el },
                  })),
                }
              : { [field]: { [property.operator]: value } };
          }

          return { [field]: acc };
        }, {}),
      );

    interactionFilters =
      clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

    const searchOperator =
      kind === 'serial' || kind === 'integer' ? 'eq' : 'matches';

    const searchFilter = searchProperty
      ? path.reduceRight(
          (acc, property, index) =>
            index === path.length - 1
              ? { [property]: { [searchOperator]: searchTerm } }
              : { [property]: acc },
          {},
        )
      : {};

    const newFilter =
      searchProperty && searchTerm !== ''
        ? deepMerge(filter, searchFilter)
        : filter;

    const completeFilter = deepMerge(newFilter, interactionFilters);

    const where = useFilter(completeFilter);

    // TODO: move model to skip
    const {
      loading: queryLoading,
      error,
      data: queryData,
      refetch,
    } = useAllQuery(
      model,
      {
        rawFilter: where,
        variables,
        skip: loadOnScroll ? skip : page * rowsPerPage,
        take: loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage,
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(err) {
          if (!displayError) {
            B.triggerEvent('onError', err);
          }
        },
      },
      !model,
    );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );
    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;

    useEffect(() => {
      if (!isDev && data) {
        if (pagination !== 'never') {
          setResults(data.results);
          setTotalCount(data.totalCount);
          return;
        }
        if (
          searchTerm !== previousSearchTerm ||
          interactionSearchTerm !== previousInteractionSearchTerm ||
          interactionSearchProperty !== previousInteractionSearchProperty
        ) {
          setSkip(0);
          setInitialTimesFetched(0);
          setPreviousSearchTerm(searchTerm);
          setPreviousInteractionSearchTerm(interactionSearchTerm);
          setPreviousInteractionSearchProperty(interactionSearchProperty);
          setNewSearch(true);
        } else {
          if (
            newSearch ||
            (!autoLoadOnScroll && skipAppend.current) ||
            (pagination === 'never' && !autoLoadOnScroll)
          ) {
            setResults(data.results);
          } else {
            setResults((prev) => [...prev, ...data.results]);
          }
          fetchingNextSet.current = false;
          setNewSearch(false);
        }
        skipAppend.current = false;
        setTotalCount(data.totalCount);
      }
    }, [data, searchTerm, interactionSearchTerm, interactionSearchProperty]);

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

    B.defineFunction('Refetch', () => {
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

    B.defineFunction('SetSearchValue', (event) => {
      setSearch(event.target.value);
    });

    useEffect(() => {
      if (!isDev) return;
      const placeholders = placeholderTake || amountOfRows;
      const repeat = () => {
        if (!repeaterRef.current) return;
        if (repeaterRef.current.previousElementSibling.children.length === 0) {
          return;
        }
        repeaterRef.current.innerHTML = '';
        for (let i = 0, j = placeholders - 1; i < j; i += 1) {
          repeaterRef.current.innerHTML +=
            repeaterRef.current.previousElementSibling.children[0].outerHTML;
        }
        if (striped) {
          const childrenLenght = children.length;
          const collection = Array.from(repeaterRef.current.children);
          collection
            .filter((item) => item.tagName === 'DIV')
            .forEach((item, index) => {
              if (
                ((Math.ceil((index + 1) / childrenLenght) * childrenLenght) /
                  childrenLenght) %
                  2 ===
                0
              ) {
                item.classList.add('striped');
              }
            });
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
        B.triggerEvent('onLoad', loading);
      }
    }, [loading]);

    const handleChangePage = (_, newPage) => {
      if (loading || error) return;
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      if (loading || error) return;
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelectedIds = results.map((n) => n.id);
        setSelected(newSelectedIds);
        return;
      }
      setSelected([]);
    };

    const handleSelection = (event, selectionData) => {
      const selectedIndex = selectedIds.indexOf(selectionData.id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedIds, selectionData.id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedIds.slice(1));
      } else if (selectedIndex === selectedIds.length - 1) {
        newSelected = newSelected.concat(selectedIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedIds.slice(0, selectedIndex),
          selectedIds.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
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

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    const handleRowClick = (endpoint, context) => {
      if (isDev) return;
      B.triggerEvent('OnRowClick', endpoint, context);

      if (hasLink) {
        history.push(endpoint);
      }
    };

    const renderTableHeadSelection = () => {
      if (isDev) {
        return (
          <div>
            <TableCell padding="normal" component="div">
              <span className={classes.columnHeader}>
                {selectionHeaderText}
              </span>
            </TableCell>
          </div>
        );
      }

      return (
        <TableCell padding="normal">
          <span className={classes.columnHeader}>{selectionHeaderText}</span>
        </TableCell>
      );
    };

    const renderTableHead = () => {
      if ((loading && !loadOnScroll) || error) {
        return Array.from(Array(children.length).keys()).map((colIdx) => (
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
        return Array.from(Array(rowsPerPage).keys()).map((idx) => (
          <TableRow key={idx} classes={{ root: classes.bodyRow }}>
            {Array.from(Array(children.length).keys()).map((colIdx) => (
              <TableCell key={colIdx}>
                <div className={classes.skeleton} />
              </TableCell>
            ))}
          </TableRow>
        ));
      }

      return results.map((value, index) => (
        <ModelProvider key={value.id} value={value} id={model}>
          <InteractionScope model={model}>
            {(context) => (
              <TableRow
                key={value[0]}
                classes={{ root: classes.bodyRow }}
                data-id={value.id}
              >
                {enableRecordSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => handleSelection(e, value)}
                      checked={selectedIds.includes(value.id)}
                      value={value.id}
                      size={size}
                      inputProps={{
                        'aria-labelledby': `table-cell-${index}`,
                      }}
                    />
                  </TableCell>
                )}
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
    };

    const renderTableContent = () => {
      if (isDev) {
        return (
          <TableRow classes={{ root: classes.bodyRow }}>
            {enableRecordSelection && (
              <TableCell
                classes={{ root: classes.root }}
                padding="checkbox"
                component="div"
              >
                <Checkbox color="primary" checked={false} size={size} />
              </TableCell>
            )}
            {children}
          </TableRow>
        );
      }

      if (model) {
        return tableContentModel();
      }

      return Array.from(Array(amountOfRows).keys()).map((idx, index) => (
        <TableRow key={idx} classes={{ root: classes.bodyRow }}>
          {enableRecordSelection && (
            <TableCell classes={{ root: classes.root }} padding="checkbox">
              <Checkbox
                color="primary"
                checked={false}
                size={size}
                inputProps={{ 'aria-labelledby': `table-cell-${index}` }}
              />
            </TableCell>
          )}
          {children}
        </TableRow>
      ));
    };

    useEffect(() => {
      if (loadOnScroll && !isDev) {
        const fetchNextSet = () => {
          fetchingNextSet.current = true;
          if (!initialRender.current) {
            setSkip((prev) => prev + autoLoadTakeAmountNum);
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
            setInitialTimesFetched((prev) => prev + 1);
            fetchNextSet();
          }
          const scrollEvent = (e) => {
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
      B.triggerEvent('sendSelectedIds', selectedIds);
    }, [selectedIds]);

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
          case 'always':
          default:
            setShowPagination(true);
            break;
        }
      }
    }, [data, rowsPerPage]);

    const isRelation = !isDev && typeof model !== 'string';

    useEffect(() => {
      let amount = 0;
      if (hasToolbar) {
        amount += toolbarRef.current.clientHeight;
      }
      if (showPagination && !isRelation) {
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
      <div
        className={classes.root}
        data-component={useText(dataComponentAttribute) || 'DataTable'}
      >
        <Paper
          classes={{ root: classes.paper }}
          square={square}
          variant={variant}
          elevation={elevationLevel}
        >
          {hasToolbar && (
            <Toolbar ref={toolbarRef} classes={{ root: classes.toolbar }}>
              {titleText && <span className={classes.title}>{titleText}</span>}
              {hasSearchProperty && !hideSearch && (
                <TextField
                  classes={{ root: classes.searchField }}
                  placeholder={`${useText(
                    labelSearchOn,
                  )} ${searchPropertyLabel}`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon name="Search" />
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
                  {enableRecordSelection && renderTableHeadSelection()}
                  {renderTableHead()}
                </TableRow>
              </TableHead>
              <TableBody ref={tableRef}>{renderTableContent()}</TableBody>
              {isDev && (
                <TableBody ref={repeaterRef} className={classes.autoRepeat} />
              )}
            </Table>
          </TableContainer>
          <div
            className={enableRecordSelection ? classes.paginationContainer : ''}
          >
            <div className={classes.selectCount}>
              {enableRecordSelection && showSelectedRecordCount && (
                <div className={classes.selectCountInner}>
                  <p className="MuiTypography-root MuiTypography-body2">
                    {totalRecordsSelectedText} {selectedIds.length}
                  </p>
                </div>
              )}
            </div>
            {showPagination && !isRelation && (
              <TablePagination
                ref={paginationRef}
                classes={{ root: classes.pagination }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                labelRowsPerPage={perPageLabel}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${numOfPagesLabel} ${count}`
                }
                component="div"
                count={model ? totalCount : takeNum}
                rowsPerPage={model ? rowsPerPage : takeNum}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </div>
        </Paper>
      </div>
    );
  })(),
  styles: (B) => (theme) => {
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
        height: ({ options: { height, autoLoadOnScroll } }) =>
          autoLoadOnScroll && !height ? '375px' : height,
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
          display: 'table-cell',
          verticalAlign: 'middle',
          width: ({ options: { width } }) => width || 'auto',
          '& > div': {
            display: 'block',
          },
        },
        '& th, & div[role="columnheader"]': {
          borderBottom: `${isDev ? 0 : '0.0625rem solid #cccccc!important'}`,
          backgroundColor: ({ options: { backgroundHeader } }) => [
            style.getColor(backgroundHeader),
            '!important',
          ],
        },
        '& > div > .MuiTableCell-head, & > .MuiTableCell-head': {
          textOverflow: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'ellipsis' : 'clip',
          overflow: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'hidden' : 'visible',
          whiteSpace: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'nowrap' : 'normal',
        },
      },
      columnHeader: {
        color: ({ options: { type } }) => style.getFontColor(type),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        fontWeight: ({ options: { type } }) => style.getFontWeight(type),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        lineHeight: '1.2',
        [`@media ${mediaMinWidth(600)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      bodyRow: {
        '& > div': {
          display: 'table-cell',
          verticalAlign: 'middle',
          width: ({ options: { width } }) => width || 'auto',
          '& > div': {
            display: 'block',
          },
        },
        cursor: ({ options: { linkTo } }) =>
          linkTo && linkTo.id !== '' && 'pointer',
        '&:hover td': {
          backgroundColor: ({ options: { linkTo, backgroundRowHover } }) =>
            linkTo && [style.getColor(backgroundRowHover), '!important'],
        },
        '&:nth-child(odd)': {
          backgroundColor: ({ options: { striped, stripeColor } }) => [
            striped ? style.getColor(stripeColor) : 'transparent',
          ],
        },
        '& > .MuiTableCell-root, & ~ .MuiTableCell-root': {
          textOverflow: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'ellipsis' : 'clip',
          overflow: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'hidden' : 'visible',
          whiteSpace: ({ options: { hideTextOverflow } }) =>
            hideTextOverflow ? 'nowrap' : 'normal',
          borderColor: ({ options: { borderColor } }) => [
            style.getColor(borderColor),
            '!important',
          ],
        },
        '& > .MuiTableCell-body, & ~ .MuiTableCell-body': {
          backgroundColor: ({ options: { background } }) => [
            style.getColor(background),
            '!important',
          ],
          borderColor: ({ options: { borderColor } }) => [
            style.getColor(borderColor),
            '!important',
          ],
        },
      },
      searchField: {
        marginLeft: ['auto', '!important'],
        pointerEvents: isDev && 'none',
      },
      paginationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      selectCount: {
        overflow: 'auto',
      },
      selectCountInner: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        minHeight: '52px',
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
        '& .striped': {
          background: ({ options: { striped, stripeColor } }) => [
            striped ? style.getColor(stripeColor) : 'transparent',
            '!important',
          ],
        },
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
