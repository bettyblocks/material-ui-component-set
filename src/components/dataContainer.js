(() => ({
  name: 'DataContainer',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const {
          env,
          getIdProperty,
          useEndpoint,
          useText,
          GetMe,
          GetOne,
          useFilter,
        } = B;
        const {
          filter,
          model,
          authProfile,
          fetchPolicy,
          redirectWithoutResult,
          showError,
          currentRecord,
          loadingType,
          loadingText,
          dataComponentAttribute,
          waitForRequest,
        } = options;

        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;
        const displayError = showError === 'built-in';
        const parsedLoadingText = useText(loadingText);
        const dataComponentAttributeText =
          useText(dataComponentAttribute) || 'DataContainer';
        const [, setOptions] = useOptions();
        const [interactionFilter, setInteractionFilter] = useState({});
        const [filterv2, setFilterV2] = useState({});

        const getFilter = React.useCallback(() => {
          if (isDev || !currentRecord || !model) {
            return filter;
          }
          const idProperty = getIdProperty(model);

          return {
            [idProperty.id]: { eq: currentRecord },
          };
        }, [isDev, filter, currentRecord, model]);

        const selectedFilter = getFilter();
        const history = isDev ? null : useHistory();

        const redirect = () => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          history.push(useEndpoint(redirectWithoutResult));
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

        const completeFilter = deepMerge(
          selectedFilter,
          interactionFilters,
          filterv2,
        );
        const where = useFilter(completeFilter);

        B.defineFunction('setCurrentRecordFromSelect', (value) => {
          const id = Number(value);
          if (typeof id === 'number') {
            setOptions({
              currentRecord: id,
            });
          }
        });
        B.defineFunction('Refetch', () => {});
        useEffect(() => {
          B.defineFunction('Advanced filter', (value) => {
            setFilterV2(value.where);
          });

          B.defineFunction('Clear advanced filter', () => {
            setFilterV2({});
          });

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
                value: event instanceof Date ? event.toISOString : event,
              },
            }));
          });

          B.defineFunction('ResetFilter', () => {
            setInteractionFilter({});
          });
        });

        function DataContainer(hasData) {
          return (
            <div
              className={includeStyling()}
              data-component={dataComponentAttributeText}
            >
              {(() => {
                if (waitForRequest) {
                  if (hasData) return children;
                  return <></>;
                }
                return children;
              })()}
            </div>
          );
        }

        const Wrapper = (
          <div
            className={includeStyling(
              [
                isEmpty ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' '),
            )}
            data-component={useText(dataComponentAttribute) || 'DataContainer'}
          >
            {isPristine
              ? 'Drag a component in the data container to display the data'
              : children}
          </div>
        );

        if (isDev) {
          return Wrapper;
        }

        if (authProfile) {
          return (
            <GetMe authenticationProfileId={authProfile}>
              {({ error, loading, data, refetch }) => {
                if (loading) {
                  B.triggerEvent('onUserLoad');
                } else if (error) {
                  B.triggerEvent('onUserError', error);
                } else if (data && data.id) {
                  B.triggerEvent('onUserSuccess', data);
                } else if (!loading && !data) {
                  B.triggerEvent('onNoUserResults');
                }
                B.defineFunction('Refetch', () => {
                  refetch();
                });
                return DataContainer(!!data);
              }}
            </GetMe>
          );
        }

        if (model) {
          return (
            <GetOne modelId={model} rawFilter={where} fetchPolicy={fetchPolicy}>
              {({ loading, error, data, refetch }) => {
                if (!loading && data && data.id) {
                  B.triggerEvent('onSuccess', data);
                } else if (!loading && !data) {
                  B.triggerEvent('onNoResults');
                }

                if (error) {
                  if (!displayError) {
                    B.triggerEvent('onError', error.message);
                  }
                }

                B.defineFunction('Refetch', () => {
                  refetch();
                });

                if (loading && loadingType === 'default') {
                  B.triggerEvent('onLoad', loading);
                  return (
                    <span data-component={dataComponentAttributeText}>
                      {parsedLoadingText}
                    </span>
                  );
                }

                if (
                  loading &&
                  loadingType === 'showChildren' &&
                  !waitForRequest
                ) {
                  B.triggerEvent('onLoad', loading);
                  // key attribute forces a rerender after loading
                  return (
                    <div
                      key={`data-loading-${loading}`}
                      data-component={dataComponentAttributeText}
                    >
                      {children}
                    </div>
                  );
                }

                if (error && displayError) {
                  return (
                    <span data-component={dataComponentAttributeText}>
                      {error.message}
                    </span>
                  );
                }

                if (!data && redirectWithoutResult && !loading) {
                  redirect();
                }
                return DataContainer(!!data);
              }}
            </GetOne>
          );
        }

        return DataContainer;
      })()}
    </div>
  ),
  styles: () => () => ({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      minHeight: '4rem',
      width: '100%',
    },
    searchWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: [0, '0.5rem'],
      borderBottom: [1, 'solid', '#000'],
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
  }),
}))();
