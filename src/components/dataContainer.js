(() => ({
  name: 'DataContainer',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const isEmpty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = isEmpty && isDev;
        const { filter, model, redirectWithoutResult } = options;

        const builderLayout = () => (
          <>
            <div
              className={[
                isEmpty ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' ')}
            >
              {isPristine ? 'Data Container' : children}
            </div>
          </>
        );

        const redirect = () => {
          const history = useHistory();
          history.push(B.useEndpoint(redirectWithoutResult));
        };

        const canvasLayout = () => {
          if (!model) {
            return builderLayout();
          }

          return (
            <B.GetOne modelId={model} filter={filter}>
              {({ loading, error, data }) => {
                if (loading) return 'loading...';
                if (error) return 'failed';

                if (!data && redirectWithoutResult) {
                  redirect();
                }

                return (
                  <>
                    {data && (
                      <B.ModelProvider key={data.id} value={data} id={model}>
                        {children}
                      </B.ModelProvider>
                    )}
                  </>
                );
              }}
            </B.GetOne>
          );
        };

        return isDev ? builderLayout() : canvasLayout();
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
