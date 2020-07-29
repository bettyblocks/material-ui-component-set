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
      useText,
      ModelProvider,
      useEndpoint,
      useGetAll,
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
    } = options;
    const repeaterRef = React.createRef();
    const tableRef = React.createRef();
    const displayError = showError === 'built-in';
    const [page, setPage] = React.useState(0);
    const takeNum = parseInt(take, 10);
    const [rowsPerPage, setRowsPerPage] = React.useState(takeNum);
    const [search, setSearch] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const { name: orderProp } = getProperty(orderProperty) || {};
    const [orderBy, setOrderBy] = React.useState({
      field: orderProp || null,
      order: orderProp ? sortOrder : null,
    });
    const { id: searchId, name: searchPropertyName = '{property}' } =
      getProperty(searchProperty) || {};
    const [variables, setVariables] = React.useState(
      orderProp
        ? {
            sort: {
              field: orderProp,
              order: sortOrder.toUpperCase(),
            },
          }
        : {},
    );
    const titleText = useText(title);
    const hasToolbar = titleText || (searchProperty && !hideSearch);
    const elevationLevel = variant === 'flat' ? 0 : elevation;
    const hasLink = linkTo && linkTo.id !== '';

    const { loading, error, data, refetch } =
      model &&
      useGetAll(model, {
        filter:
          searchId && searchTerm !== ''
            ? { ...filter, [searchId]: { matches: searchTerm } }
            : filter,
        variables,
        skip: pagination && page * rowsPerPage,
        take: pagination && rowsPerPage,
      });

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

    React.useEffect(() => {
      if (!isDev) return;
      const repeat = () => {
        if (!repeaterRef.current) return;
        if (repeaterRef.current.previousElementSibling.children.length === 0) {
          return;
        }
        repeaterRef.current.innerHTML = '';
        for (let i = 0, j = takeNum - 1; i < j; i += 1) {
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

    const { totalCount = 0, results = [] } = data || {};

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
          field,
          order: newOrder.toUpperCase(),
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
      if (loading || error) {
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
      if (loading || error) {
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
      return results.map(value => (
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
    };

    const renderTableContent = () => {
      let tableContent = Array.from(Array(rowsPerPage).keys()).map(idx => (
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
                  placeholder={`Search on ${searchPropertyName}`}
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
          <TableContainer classes={{ root: classes.container }}>
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
          {pagination && (
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
      },
      paper: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      container: {
        height: ({ options: { stickyHeader, height } }) =>
          stickyHeader && height,
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
