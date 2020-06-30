(() => ({
  name: 'Form',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { Action, Children } = B;

        const {
          actionId,
          model,
          filter,
          formErrorMessage,
          formSuccessMessage,
          redirect,
        } = options;

        const formRef = React.createRef();

        const empty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = empty && isDev;
        const hasRedirect = redirect && redirect.id !== '';
        const redirectTo =
          B.env === 'prod' && hasRedirect && B.useEndpoint(redirect);
        const history = isDev ? {} : useHistory();
        const location = isDev ? {} : useLocation();

        const trigger = (data, loading, error) => {
          if (data) {
            B.triggerEvent('onSuccess', data);

            if (hasRedirect) {
              if (redirectTo === location.pathname) {
                history.go(0);
              } else {
                history.push(redirectTo);
              }
            }
          }

          if (loading) {
            B.triggerEvent('onLoad', loading);
          }

          if (error) {
            B.triggerEvent('onError', error);
          }
        };

        const [invalid, setInvalid] = useState(false);
        const handleInvalid = () => {
          if (!invalid) {
            setInvalid(true);
            B.triggerEvent('onInvalid');
          }
        };

        return (
          <Action actionId={actionId}>
            {(callAction, { data, loading, error }) => (
              <>
                {trigger(data, loading, error)}
                <div className={classes.messageContainer}>
                  {error && (
                    <span className={classes.error}>{formErrorMessage}</span>
                  )}
                  {data && (
                    <span className={classes.success}>
                      {formSuccessMessage}
                    </span>
                  )}
                </div>

                <form
                  onInvalid={handleInvalid}
                  onSubmit={event => {
                    event.preventDefault();
                    setInvalid(false);
                    B.triggerEvent('onSubmit');
                    const formData = new FormData(formRef.current);
                    const entries = Array.from(formData);
                    const values = entries.reduce((acc, currentvalue) => {
                      const key = currentvalue[0];
                      const value = currentvalue[1];
                      if (acc[key]) {
                        acc[key] = `${acc[key]},${value}`;
                        return acc;
                      }
                      return { ...acc, [key]: value };
                    }, {});
                    callAction({
                      variables: { input: values },
                    });
                  }}
                  ref={formRef}
                  className={[
                    empty && classes.empty,
                    isPristine && classes.pristine,
                  ].join(' ')}
                >
                  {isPristine && <span>form</span>}
                  {!model || isDev ? (
                    <Children loading={loading}>{children}</Children>
                  ) : (
                    <B.GetAll modelId={model} filter={filter} skip={0} take={1}>
                      {({
                        loading: dataLoading,
                        error: dataError,
                        data: modelData,
                      }) => {
                        if (dataLoading) return 'Loading...';
                        if (dataError) return 'Failed';

                        const item = modelData.results[0];

                        if (!item) return children;

                        return (
                          <>
                            <B.ModelProvider
                              key={item.id}
                              value={item}
                              id={model}
                            >
                              {children}
                            </B.ModelProvider>
                          </>
                        );
                      }}
                    </B.GetAll>
                  )}
                </form>
              </>
            )}
          </Action>
        );
      })()}
    </div>
  ),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      error: {
        color: style.getColor('Danger'),
      },
      success: {
        color: style.getColor('Success'),
      },
      messageContainer: {
        marginBottom: '0.5rem',
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: ({ options: { columnHeight } }) =>
          columnHeight ? 0 : '4rem',
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
