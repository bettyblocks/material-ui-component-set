(() => ({
  name: 'DataList',
  icon: 'DataList',
  category: 'CONTENT',
  type: 'DATALIST',
  allowedTypes: [
    'ACCORDION',
    'ALERT',
    'BREADCRUMB',
    'BUTTON',
    'DATALIST',
    'DATATABLE',
    'DIVIDER',
    'FORM',
    'IMAGE',
    'PARTIAL',
    'PANEL',
    'PROGRESS',
    'TAB',
    'TEXT',
    'ROW',
  ],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const [page, setPage] = useState(1);
        const [search, setSearch] = useState('');
        const [isTyping, setIsTyping] = useState(false);

        const take = parseInt(options.take, 10) || 50;
        const searchProp = B.getProperty(options.searchProperty);

        const isEmpty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = isEmpty && isDev;

        const buildFilter = ([lhs, operator, rhs]) => {
          if (!lhs || !rhs) {
            return {};
          }

          const lhsProperty = B.getProperty(lhs);

          if (!lhsProperty) {
            return {};
          }

          const { name: propertyName, kind } = lhsProperty;

          const rhsValue = ['serial', 'integer'].includes(kind)
            ? parseInt(rhs, 10)
            : rhs;

          return {
            [propertyName]: {
              [operator]: rhsValue,
            },
          };
        };

        /* Layouts */

        const builderLayout = () => (
          <>
            {options.searchProperty && (
              <div className={classes.header}>
                <Search
                  name={B.env === 'dev' ? '[property]' : searchProp.name}
                  search={search}
                />
              </div>
            )}
            <div
              className={[
                isEmpty ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' ')}
            >
              {isPristine ? 'Data List' : children}
            </div>
            {Array.from(Array(take - 1).keys()).map(key => (
              <div
                key={key}
                className={[
                  isDev ? classes.pristine : '',
                  classes.empty,
                  classes.placeholder,
                ].join(' ')}
              >
                {isDev ? 'Dynamic Item' : ''}
              </div>
            ))}
            <div className={classes.footer}>
              {(isDev || options.model) && (
                <Pagination totalCount={0} resultCount={take} currentPage={1} />
              )}
            </div>
          </>
        );

        const canvasLayout = () => {
          if (!options.model) {
            return builderLayout();
          }

          const where = buildFilter(options.filter);

          if (searchProp && search !== '') {
            where[searchProp.name] = {
              ...(where[searchProp.name] ? where[searchProp.name] : {}),
              regex: search,
            };
          }

          const variables = Object.assign(
            Object.keys(where).length !== 0 && {
              where,
            },
          );

          return (
            <B.GetAll
              modelId={options.model}
              __SECRET_VARIABLES_DO_NOT_USE={variables}
              skip={page ? (page - 1) * take : 0}
              take={take}
            >
              {({ loading, error, data }) => {
                if (loading) return 'loading...';
                if (error) return 'failed';

                return (
                  <>
                    <div className={classes.header}>
                      {searchProp && (
                        <Search
                          name={searchProp.name}
                          search={search}
                          isTyping={isTyping}
                          setSearch={setSearch}
                          setIsTyping={setIsTyping}
                        />
                      )}
                    </div>
                    {data.results.map(item => (
                      <B.GetOneProvider key={item.id} value={item}>
                        {children}
                      </B.GetOneProvider>
                    ))}
                    <div className={classes.footer}>
                      {!isEmpty && (
                        <Pagination
                          totalCount={data.totalCount}
                          resultCount={data.results.length}
                          currentPage={page}
                        />
                      )}
                    </div>
                  </>
                );
              }}
            </B.GetAll>
          );
        };

        /* SubComponents */

        // eslint-disable-next-line no-shadow
        function Search({ name, search, isTyping, setIsTyping }) {
          const inputRef = React.createRef();

          React.useEffect(() => {
            if (isTyping) {
              inputRef.current.focus();
            }
          });

          return (
            <div className={classes.searchWrapper}>
              <i
                className={[classes.searchIcon, 'zmdi zmdi-search'].join(' ')}
              />
              <input
                className={classes.search}
                type="text"
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
                ref={inputRef}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder={`Search on ${name}`}
              />
            </div>
          );
        }

        function Pagination({ totalCount, resultCount, currentPage }) {
          const firstItem = currentPage ? (currentPage - 1) * take : 0;

          useEffect(() => {
            const totalPages = Math.ceil(totalCount / take);

            if (currentPage > totalPages) {
              setPage(totalPages);
            }
          }, [totalCount]);

          const totalText = B.env === 'dev' ? '[total]' : totalCount;

          return (
            <>
              <span>
                {firstItem + 1}
                {firstItem + 1 !== totalCount &&
                  ` - ${firstItem + resultCount}`}{' '}
                of {totalText}
              </span>
              <div className={classes.pagination}>
                {typeof currentPage !== 'undefined' && currentPage > 1 ? (
                  <button
                    className={classes.button}
                    type="button"
                    onClick={() => setPage(v => v - 1)}
                  >
                    <span
                      className={[classes.arrow, 'zmdi zmdi-chevron-left'].join(
                        ' ',
                      )}
                    />
                  </button>
                ) : (
                  <span
                    className={[
                      classes.arrow,
                      classes.arrowDisabled,
                      'zmdi zmdi-chevron-left',
                    ].join(' ')}
                  />
                )}
                {(typeof currentPage === 'undefined' ? 1 : currentPage) <
                totalCount / take ? (
                  <button
                    className={classes.button}
                    type="button"
                    onClick={() => setPage(v => v + 1)}
                  >
                    <span
                      className={[
                        classes.arrow,
                        'zmdi zmdi-chevron-right',
                      ].join(' ')}
                    />
                  </button>
                ) : (
                  <span
                    className={[
                      classes.arrow,
                      classes.arrowDisabled,
                      'zmdi zmdi-chevron-right',
                    ].join(' ')}
                  />
                )}
              </div>
            </>
          );
        }

        return isDev ? builderLayout() : canvasLayout();
      })()}
    </div>
  ),
  styles: B => {
    const { theme } = B;
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : theme.getSpacing(idx, device);
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
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        width: '100%',
      },
      searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: [0, '0.5rem'],
        borderBottom: [1, 'solid', '#000'],
        minHeight: '4rem',
      },
      searchIcon: {
        fontSize: '1.25rem',
        marginRight: '1rem',
      },
      search: {
        padding: ['0.25rem', 0],
        fontSize: '1rem',
        border: 'none',
        outline: 'none',
      },
      button: {
        background: 'transparent',
        border: 'none',
        display: 'inline-block',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        '&:active': {
          outline: 'none',
        },
      },
      footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: ['0.75rem', 0],
      },
      placeholder: {
        opacity: '0.4',
      },
      pagination: {
        marginLeft: '1rem',
      },
      arrow: {
        padding: '1rem',
        fontSize: '1.625rem',
        color: '#000',
        textDecoration: 'none',
      },
      arrowDisabled: { color: '#ccc' },
      [`@media ${B.mediaMinWidth(768)}`]: {
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
      [`@media ${B.mediaMinWidth(1024)}`]: {
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
      [`@media ${B.mediaMinWidth(1200)}`]: {
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
      empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
