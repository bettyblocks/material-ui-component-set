(() => ({
  name: 'DataList',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const {
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

        const [, setPageState] = usePageState(useText(['']));
        const [page, setPage] = useState(1);
        const [search, setSearch] = useState('');
        const [searchTerm, setSearchTerm] = useState('');
        const [isTyping, setIsTyping] = useState(false);
        const {
          take,
          placeholderTake,
          filter,
          type,
          model,
          showError,
          searchProperty,
          order,
          orderBy,
          labelNumberOfPages,
          pagination,
          loadingType,
          loadingText,
          noResultsText,
          dataComponentAttribute,
        } = options;

        const rowsPerPage = parseInt(take, 10) || 50;
        const { TextField, InputAdornment } = window.MaterialUI.Core;
        const { label: searchPropertyLabel } =
          getProperty(searchProperty) || {};
        const parsedLoadingText = useText(loadingText);
        const parsedNoResultsText = useText(noResultsText);
        const dataComponentAttributeText = useText(dataComponentAttribute);
        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;
        const displayError = showError === 'built-in';
        const listRef = React.createRef();
        const [showPagination, setShowPagination] = useState(true);
        const numOfPagesLabel = useText(labelNumberOfPages);
        const [prevData, setPrevData] = useState(null);
        const [filterv2, setFilterV2] = useState({});
        const isInline = type === 'inline';
        const isGrid = type === 'grid';

        const [interactionFilter, setInteractionFilter] = useState({});

        const builderLayout = () => (
          <div
            className={includeStyling()}
            data-component={dataComponentAttributeText || 'DataList'}
          >
            {searchProperty &&
              searchProperty.type &&
              searchProperty.id !== '' && (
                <div className={classes.header}>
                  <SearchComponent label={searchPropertyLabel} />
                </div>
              )}
            <div ref={listRef} className={isGrid ? classes.grid : undefined}>
              <div
                className={
                  [
                    isEmpty ? classes.empty : '',
                    isPristine ? classes.pristine : '',
                    isInline ? classes.inline : '',
                  ]
                    .filter(Boolean)
                    .join(' ') || undefined
                }
              >
                {isPristine
                  ? 'Drag a component in the data list to display the data'
                  : children}
              </div>
            </div>

            {isDev && showPagination && (
              <div className={classes.footer}>
                <Pagination
                  totalCount={0}
                  resultCount={rowsPerPage}
                  currentPage={1}
                />
              </div>
            )}
          </div>
        );

        useEffect(() => {
          if (!isDev) return;
          const placeholders = placeholderTake || rowsPerPage;
          const repeat = () => {
            if (!listRef.current) return;
            const numberOfChildren = listRef.current.children.length;
            if (numberOfChildren === 0) {
              return;
            }
            for (let i = numberOfChildren - 1, j = 0; i > j; i -= 1) {
              const child = listRef.current.children[i];
              if (child) {
                listRef.current.removeChild(child);
              }
            }
            for (let i = 0, j = placeholders - 1; i < j; i += 1) {
              listRef.current.children[0].insertAdjacentHTML(
                'afterend',
                listRef.current.children[0].outerHTML,
              );
            }

            const children = Array.from(listRef.current.children);

            children.forEach((child, index) => {
              if (index > 0) {
                const elem = child;
                elem.style.opacity = 0.4;
                elem.style.pointerEvents = 'none';
              }
            });
          };
          const mutationObserver = new MutationObserver(() => {
            repeat();
          });
          mutationObserver.observe(listRef.current.children[0], {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false,
          });
          repeat();
        });

        const handleSearch = (event) => {
          setSearch(event.target.value);
        };

        const transformValue = (value) => {
          if (value instanceof Date) {
            return value.toISOString();
          }

          return value;
        };

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

        let orderByPath = null;
        if (orderBy && Array.isArray(orderBy.id)) {
          orderByPath = orderBy.id;
        } else if (orderBy && orderBy.id) {
          orderByPath = [orderBy.id];
        }
        const sort =
          !isDev && orderByPath
            ? orderByPath.reduceRight((acc, property, index) => {
                const prop = getProperty(property);
                return index === orderByPath.length - 1
                  ? { [prop.name]: order.toUpperCase() }
                  : { [prop.name]: acc };
              }, {})
            : {};

        let interactionFilters = {};

        const isEmptyValue = (value) =>
          !value || (Array.isArray(value) && value.length === 0);

        const clauses = Object.entries(interactionFilter)
          .filter(([, { value }]) => !isEmptyValue(value))
          .map(([, { property, value }]) =>
            property.id.reduceRight((acc, field, index, arr) => {
              const isLast = index === arr.length - 1;
              if (isLast) {
                if (Array.isArray(value)) {
                  return {
                    _or: value.map((d) =>
                      arr.reduceRight((accq, fieldf, i, a) => {
                        const issLast = i === a.length - 1;
                        if (issLast) {
                          return { [fieldf]: { [property.operator]: d } };
                        }
                        return { [fieldf]: accq };
                      }, {}),
                    ),
                  };
                }
                return { [field]: { [property.operator]: value } };
              }

              if (Object.keys(acc).includes('_or')) {
                return acc;
              }

              return { [field]: acc };
            }, {}),
          );

        interactionFilters =
          clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

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

        const completeFilter = deepMerge(
          newFilter,
          interactionFilters,
          filterv2,
        );
        const where = useFilter(completeFilter);

        const {
          loading: queryLoading,
          error,
          data: queryData,
          refetch,
        } = useAllQuery(
          model,
          {
            rawFilter: where,
            skip: page ? (page - 1) * rowsPerPage : 0,
            take: rowsPerPage,
            variables: {
              ...(orderByPath ? { sort: { relation: sort } } : {}),
            },
            onError(resp) {
              if (!displayError) {
                B.triggerEvent('onError', resp);
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
        const hasResult = data && data.results && data.results.length > 0;

        if (hasResult) {
          B.triggerEvent('onSuccess', data.results);
        } else if (!hasResult && hasResult !== undefined) {
          B.triggerEvent('onNoResults');
        }

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
                setShowPagination(rowsPerPage < data.totalCount);
                break;
              case 'always':
              default:
                setShowPagination(true);
            }
            setPrevData(data);
          }
        }, [queryData, rowsPerPage]);

        useEffect(() => {
          const handler = setTimeout(() => {
            setSearchTerm(search);
          }, 300);

          return () => {
            clearTimeout(handler);
          };
        }, [search]);

        B.defineFunction('setSelectedRecord', (value) => {
          const id = value.context.modelData && value.context.modelData.id;
          setPageState(useText([`${id}`]));
        });

        B.defineFunction('Advanced filter', (value) => {
          setPage(1);
          setFilterV2(value.where);
        });

        B.defineFunction('Clear advanced filter', () => {
          setPage(1);
          setFilterV2({});
        });

        useEffect(() => {
          B.defineFunction('Refetch', () => refetch());

          /**
           * @name Filter
           * @param {Property} property
           * @returns {Void}
           */
          B.defineFunction('Filter', ({ event, property, interactionId }) => {
            if (event === undefined || event === null) {
              // eslint-disable-next-line no-console
              console.error(
                'Event is empty. Please use this function with valid input events.',
              );
              return;
            }
            setInteractionFilter((s) => ({
              ...s,
              [interactionId]: {
                property,
                value: event.target
                  ? event.target.value
                  : transformValue(event),
              },
            }));
          });

          B.defineFunction('ResetFilter', () => {
            setInteractionFilter({});
          });
        }, []);

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

        const handleClick = (event, context) => {
          B.triggerEvent('OnItemClick', { ...event, context }, context);
        };

        const Looper = (results) =>
          results.map((item) => (
            <ModelProvider key={item.id} value={item} id={model}>
              <InteractionScope model={model}>
                {(context) => (
                  <div
                    role="none"
                    className={isInline ? classes.inline : undefined}
                    onClick={(event) => handleClick(event, context)}
                  >
                    {children}
                  </div>
                )}
              </InteractionScope>
            </ModelProvider>
          ));

        const canvasLayout = () => {
          if (!model) {
            return builderLayout();
          }

          if (loading && loadingType === 'default') {
            B.triggerEvent('onLoad', loading);
            return <span>{parsedLoadingText}</span>;
          }

          if (loading && loadingType === 'showChildren') {
            B.triggerEvent('onLoad', loading);
            return (
              <ModelProvider
                className={includeStyling()}
                value={prevData}
                id={model}
              >
                {children}
              </ModelProvider>
            );
          }

          if (loading && loadingType === 'skeleton') {
            return Array.from(Array(rowsPerPage).keys()).map((idx) => (
              <div key={idx} className={classes.skeleton} />
            ));
          }

          if (error && displayError) {
            return (
              <span
                data-component={dataComponentAttributeText || 'DataContainer'}
              >
                {error.message}
              </span>
            );
          }

          const { results = [], totalCount } = data || {};
          const resultCount = results && results.length;

          if (!resultCount) {
            return <span>{parsedNoResultsText}</span>;
          }

          return (
            <div data-component={dataComponentAttributeText || 'DataContainer'}>
              {searchProperty &&
                searchProperty.type &&
                searchProperty.id !== '' && (
                  <div className={classes.header}>
                    <SearchComponent
                      label={searchPropertyLabel}
                      onChange={handleSearch}
                      value={search}
                      isTyping={isTyping}
                      setIsTyping={setIsTyping}
                    />
                  </div>
                )}

              {!isGrid ? (
                Looper(results)
              ) : (
                <div className={classes.grid}>{Looper(results)}</div>
              )}

              {showPagination && (
                <div className={classes.footer}>
                  <Pagination
                    totalCount={totalCount}
                    resultCount={resultCount}
                    currentPage={page}
                  />
                </div>
              )}
            </div>
          );
        };

        /* SubComponents */

        function SearchComponent({
          label,
          onChange,
          value,
          // eslint-disable-next-line no-shadow
          isTyping,
          // eslint-disable-next-line no-shadow
          setIsTyping,
        }) {
          const inputRef = React.createRef();

          useEffect(() => {
            if (isTyping) {
              inputRef.current.focus();
            }
          });

          return (
            <div className={classes.searchWrapper}>
              <TextField
                placeholder={`Search on ${label}`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon name="Search" />
                    </InputAdornment>
                  ),
                }}
                onChange={onChange}
                inputRef={inputRef}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                value={value}
              />
            </div>
          );
        }

        function Pagination({ totalCount, resultCount, currentPage }) {
          const firstItem = currentPage ? (currentPage - 1) * rowsPerPage : 0;

          useEffect(() => {
            const totalPages = Math.ceil(totalCount / rowsPerPage);

            if (currentPage > totalPages) {
              setPage(totalPages);
            }
          }, [totalCount]);

          const totalText = env === 'dev' ? '[total]' : totalCount;
          return (
            <>
              <span>
                {firstItem + 1}
                {firstItem + 1 !== totalCount &&
                  ` - ${firstItem + resultCount}`}{' '}
                {numOfPagesLabel} {totalText}
              </span>
              <div className={classes.pagination}>
                {typeof currentPage !== 'undefined' && currentPage > 1 ? (
                  <button
                    className={classes.button}
                    type="button"
                    onClick={() => setPage((v) => v - 1)}
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
                    onClick={() => setPage((v) => v + 1)}
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
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
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
      inline: {
        display: 'inline-flex',
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
        margin: '0.625rem 0',
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
