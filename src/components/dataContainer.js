(() => ({
  name: 'DataContainer',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { env, getIdProperty, useEndpoint, useText, GetMe, GetOne } = B;
        const {
          filter,
          model,
          authProfile,
          redirectWithoutResult,
          showError,
          currentRecord,
          loadingType,
          loadingText,
        } = options;

        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;
        const displayError = showError === 'built-in';
        const parsedLoadingText = useText(loadingText);
        const [, setOptions] = useOptions();

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

        const redirect = () => {
          const history = useHistory();
          history.push(useEndpoint(redirectWithoutResult));
        };

        const DataContainer = () => (
          <GetOne modelId={model} filter={selectedFilter}>
            {({ loading, error, data, refetch }) => {
              if (!loading && data && data.id) {
                B.triggerEvent('onSuccess', data);
              } else {
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
                return <span>{parsedLoadingText}</span>;
              }

              if (loading && loadingType === 'showChildren') {
                B.triggerEvent('onLoad', loading);
                return <div>{children}</div>;
              }

              if (error && displayError) {
                return <span>{error.message}</span>;
              }

              if (!data && redirectWithoutResult) {
                redirect();
              }

              return <div>{children}</div>;
            }}
          </GetOne>
        );

        B.defineFunction('setCurrentRecord', value => {
          const id = Number(value);
          if (typeof id === 'number') {
            setOptions({
              currentRecord: id,
            });
          }
        });

        useEffect(() => {
          if (isDev) {
            B.defineFunction('Refetch', () => {});
          }
        });

        const Wrapper = (
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
        );

        if (isDev) {
          return Wrapper;
        }

        const CanvasLayout = () => {
          if (!hasFilter) {
            return Wrapper;
          }
          return <DataContainer />;
        };

        if (authProfile) {
          return (
            <GetMe authenticationProfileId={authProfile}>
              {({ error, loading, data }) => {
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
                return <CanvasLayout />;
              }}
            </GetMe>
          );
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
