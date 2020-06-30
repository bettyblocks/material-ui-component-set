(() => ({
  name: 'DataList',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const { env, GetAll, getProperty, ModelProvider, useFilter } = B;
        const [page, setPage] = useState(1);
        const [search, setSearch] = useState('');
        const {
          searchProperty,
          take,
          filter,
          hidePagination,
          type,
          model,
        } = options;
        const { TextField, InputAdornment } = window.MaterialUI.Core;
        const { Search } = window.MaterialUI.Icons;

        const rowsPerPage = parseInt(take, 10) || 50;
        const searchPropertyArray = [searchProperty].flat();
        const { label: searchPropertyLabel } =
          getProperty(searchPropertyArray[searchPropertyArray.length - 1]) ||
          {};

        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;

        const builderLayout = () => (
          <>
            {searchProperty && (
              <div className={classes.header}>
                <div className={classes.searchWrapper}>
                  <TextField
                    placeholder={`Search on ${searchPropertyLabel}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            )}
            <div className={type === 'grid' ? classes.grid : ''}>
              <div
                className={[
                  isEmpty ? classes.empty : '',
                  isPristine ? classes.pristine : '',
                ].join(' ')}
              >
                {isPristine ? 'Data List' : children}
              </div>

              {Array.from(Array(rowsPerPage - 1).keys()).map(key => (
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
            </div>
            <div className={classes.footer}>
              {(isDev || model) && !hidePagination && (
                <Pagination
                  totalCount={0}
                  resultCount={rowsPerPage}
                  currentPage={1}
                />
              )}
            </div>
          </>
        );

        const handleSearch = event => {
          setSearch(event.target.value);
        };

        const isObject = item =>
          item && typeof item === 'object' && !Array.isArray(item);
        const deepMerge = (target, ...sources) => {
          if (!sources.length) return target;
          const source = sources.shift();

          if (isObject(target) && isObject(source)) {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in source) {
              if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
              } else {
                Object.assign(target, { [key]: source[key] });
              }
            }
          }

          return deepMerge(target, ...sources);
        };

        const canvasLayout = () => {
          if (!model) {
            return builderLayout();
          }

          const searchFilter = {};

          if (searchProperty) {
            searchPropertyArray.reduce(
              // eslint-disable-next-line no-return-assign
              (acc, property, index) =>
                (acc[property] =
                  index !== searchPropertyArray.length - 1
                    ? {}
                    : { matches: search }),
              searchFilter,
            );
          }

          const newFilter =
            searchProperty && search !== ''
              ? deepMerge({}, filter, searchFilter)
              : filter;

          const where = useFilter(newFilter);

          return (
            <>
              <div className={classes.header}>
                {searchProperty && (
                  <div className={classes.searchWrapper}>
                    <TextField
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
                  </div>
                )}
              </div>
              <GetAll
                modelId={model}
                rawFilter={where}
                skip={page ? (page - 1) * rowsPerPage : 0}
                take={rowsPerPage}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div className={classes.skeleton} />;
                  if (error) return 'failed';

                  return (
                    <>
                      <div className={type === 'grid' ? classes.grid : ''}>
                        {data.results.map(item => (
                          <ModelProvider key={item.id} value={item} id={model}>
                            {children}
                          </ModelProvider>
                        ))}
                      </div>
                      <div className={classes.footer}>
                        {!isEmpty && !hidePagination && (
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
              </GetAll>
            </>
          );
        };

        /* SubComponents */

        function Pagination({ totalCount, resultCount, currentPage }) {
          const firstItem = currentPage ? (currentPage - 1) * rowsPerPage : 0;

          useEffect(() => {
            const totalPages = Math.ceil(totalCount / rowsPerPage);

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
                totalCount / rowsPerPage ? (
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
  styles: B => theme => {
    const style = new B.Styling(theme);
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
      grid: {
        display: 'grid',
        gridTemplateColumns: ({ options: { width } }) =>
          `repeat(auto-fit, minmax(${width}, 1fr))`,
        gridGap: ({ options: { gap } }) => `${gap}`,
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
