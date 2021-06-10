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
          MeProvider,
          ModelProvider,
          useEndpoint,
          useOneQuery,
          useMeQuery,
        } = B;

        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;
        const {
          filter,
          model,
          authProfile,
          redirectWithoutResult,
          showError,
          currentRecord,
        } = options;
        const displayError = showError === 'built-in';

        const [, setOptions] = useOptions();

        B.defineFunction('setCurrentRecord', value => {
          const id = Number(value);
          if (typeof id === 'number') {
            setOptions({
              currentRecord: id,
            });
          }
        });

        const BuilderLayout = () => {
          B.defineFunction('Refetch', () => {});

          return (
            <>
              <div
                className={[
                  isEmpty ? classes.empty : '',
                  isPristine ? classes.pristine : '',
                ].join(' ')}
              >
                {isPristine
                  ? 'Drag a component in the data container to display the data'
                  : children}
              </div>
            </>
          );
        };

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
        const hasFilter =
          selectedFilter && Object.keys(selectedFilter).length > 0;

        const {
          loading: oneDataLoading,
          data: oneData,
          error: oneError,
          refetch,
        } =
          (!isDev &&
            useOneQuery(model, {
              filter: hasFilter ? getFilter() : undefined,
              onCompleted(resp) {
                if (resp && resp.id) {
                  B.triggerEvent('onSuccess', resp);
                } else {
                  B.triggerEvent('onNoResults');
                }
              },
              onError(resp) {
                if (!displayError) {
                  B.triggerEvent('onError', resp);
                }
              },
            })) ||
          {};

        B.defineFunction('Refetch', () => {
          refetch();
        });

        if (isDev) {
          return <BuilderLayout />;
        }

        const CanvasLayout = () => {
          if (!hasFilter) {
            return <BuilderLayout />;
          }

          return <One />;
        };

        const redirect = () => {
          const history = useHistory();
          history.push(useEndpoint(redirectWithoutResult));
        };

        const One = () => {
          if (oneDataLoading) {
            B.triggerEvent('onLoad', oneDataLoading);
            return <span>Loading...</span>;
          }

          if (oneError && displayError) {
            return <span>{oneError.message}</span>;
          }

          if (!oneData && redirectWithoutResult) {
            redirect();
          }

          return (
            oneData && (
              <ModelProvider value={oneData} id={model}>
                {children}
              </ModelProvider>
            )
          );
        };

        const Me = ({ authenticationProfileId }) => {
          const { data, loading, error } = useMeQuery(authenticationProfileId);

          if (loading) {
            B.triggerEvent('onUserLoad');
          }
          if (error) {
            B.triggerEvent('onUserError', error);
          }

          if (data && data.id) {
            B.triggerEvent('onUserSuccess', data);
          } else {
            B.triggerEvent('onNoUserResults');
          }

          return (
            <MeProvider value={data} id={model}>
              <CanvasLayout />
            </MeProvider>
          );
        };

        if (authProfile) {
          return <Me authenticationProfileId={authProfile} />;
        }

        return <CanvasLayout />;
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
