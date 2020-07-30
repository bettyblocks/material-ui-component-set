(() => ({
  name: 'Form',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { env, Children, useAction, useGetAll } = B;

        const {
          actionId,
          model,
          filter,
          formErrorMessage,
          formSuccessMessage,
          redirect,
          showError,
        } = options;

        const formRef = React.createRef();

        const displayError = showError === 'built-in';
        const empty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = empty && isDev;
        const hasRedirect = redirect && redirect.id !== '';
        const redirectTo =
          env === 'prod' && hasRedirect && B.useEndpoint(redirect);
        const history = isDev ? {} : useHistory();
        const [isInvalid, setIsInvalid] = useState(false);
        const location = isDev ? {} : useLocation();

        const [callAction, { data, loading, error }] = useAction(actionId, {
          onCompleted({ actionb5 }) {
            if (actionb5) {
              B.triggerEvent('onSuccess', actionb5);
            } else {
              B.triggerEvent('onNoResults');
            }
            if (hasRedirect) {
              if (redirectTo === location.pathname) {
                history.go(0);
              } else {
                history.push(redirectTo);
              }
            }
          },
          onError(err) {
            if (err && !displayError) {
              B.triggerEvent('onError', formErrorMessage || err.message);
            }
          },
        });

        const { loading: isFetching, data: models, error: err } =
          model &&
          useGetAll(model, {
            filter,
            skip: 0,
            take: 1,
          });

        if (loading) {
          B.triggerEvent('onLoad', loading);
        }

        if (isFetching) {
          B.triggerEvent('onLoad', isFetching);
        }

        if (err && !displayError) {
          B.triggerEvent('onError', formErrorMessage || err.message);
        }

        const item = models && models.results[0];

        if (item) {
          if (item.id) {
            B.triggerEvent('onSuccess', item);
          } else {
            B.triggerEvent('onNoResults');
          }
        }

        const handleInvalid = () => {
          if (!isInvalid) {
            setIsInvalid(true);
            B.triggerEvent('onInvalid');
          }
        };

        const handleSubmit = evt => {
          evt.preventDefault();
          setIsInvalid(false);
          B.triggerEvent('onSubmit');
          const formData = new FormData(formRef.current);
          const values = Array.from(formData).reduce((acc, [key, value]) => {
            if (!acc[key]) return { ...acc, [key]: value };
            acc[key] = `${acc[key]},${value}`;
            return acc;
          }, {});
          callAction({ variables: { input: values } });
        };

        const renderContent = () => {
          if (!model || isDev) {
            return <Children loading={loading}>{children}</Children>;
          }
          if (isFetching) return 'Loading...';
          if (err && displayError) return err.message;
          if (!item) return children;
          return (
            <B.ModelProvider key={item.id} value={item} id={model}>
              {children}
            </B.ModelProvider>
          );
        };

        return (
          <>
            <div className={classes.messageContainer}>
              {error && displayError && (
                <span className={classes.error}>{formErrorMessage}</span>
              )}
              {data && (
                <span className={classes.success}>{formSuccessMessage}</span>
              )}
            </div>

            <form
              onInvalid={handleInvalid}
              onSubmit={handleSubmit}
              ref={formRef}
              className={[
                empty && classes.empty,
                isPristine && classes.pristine,
              ].join(' ')}
            >
              {isPristine && <span>form</span>}
              {renderContent()}
            </form>
          </>
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
