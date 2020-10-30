(() => ({
  name: 'Form',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { env, Children, Action, useAllQuery, getActionInput } = B;

        const {
          formData,
          filter,
          formErrorMessage,
          formSuccessMessage,
          redirect,
          showError,
          showSuccess,
        } = options;
        const formRef = React.createRef();

        const displayError = showError === 'built-in';
        const displaySuccess = showSuccess === 'built-in';
        const empty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = empty && isDev;
        const hasRedirect = redirect && redirect.id !== '';
        const redirectTo =
          env === 'prod' && hasRedirect && B.useEndpoint(redirect);
        const history = isDev ? {} : useHistory();
        const [isInvalid, setIsInvalid] = useState(false);
        const location = isDev ? {} : useLocation();
        const { actionId, modelId, variableId } = formData;
        const formVariable = getActionInput(variableId);
        const hasFilter = modelId && filter && Object.keys(filter).length > 0;

        const { loading: isFetching, data: records, error: err } =
          (hasFilter &&
            useAllQuery(modelId, {
              filter,
              skip: 0,
              take: 1,
            })) ||
          {};

        const mounted = useRef(false);

        useEffect(() => {
          B.defineFunction('Submit', () => {
            formRef.current.dispatchEvent(new Event('submit'));
          });
          B.triggerEvent('onComponentLoad');
        }, []);

        useEffect(() => {
          mounted.current = true;
          return () => {
            mounted.current = false;
          };
        }, []);

        useEffect(() => {
          if (mounted.current && isFetching) {
            B.triggerEvent('onDataLoad', isFetching);
          }
        }, [isFetching]);

        if (err) {
          B.triggerEvent('onDataError', err.message);
        }

        const item = records && records.results[0];

        if (item) {
          if (item.id) {
            B.triggerEvent('onDataSuccess', item);
          } else {
            B.triggerEvent('onDataNoResults');
          }
        }

        const handleInvalid = () => {
          if (!isInvalid) {
            setIsInvalid(true);
            B.triggerEvent('onInvalid');
          }
        };

        const handleSubmit = (evt, callAction) => {
          evt.preventDefault();
          setIsInvalid(false);
          B.triggerEvent('onSubmit');
          const formDataValues = new FormData(formRef.current);
          const values = Array.from(formDataValues).reduce(
            (acc, [key, value]) => {
              if (!acc[key]) return { ...acc, [key]: value };
              acc[key] = `${acc[key]},${value}`;
              return acc;
            },
            {},
          );
          const postValues =
            item && item.id ? { id: item.id, ...values } : values;
          let variables = { variables: { input: postValues } };
          if (formVariable && formVariable.name) {
            variables = {
              variables: { input: { [formVariable.name]: postValues } },
            };
          }
          callAction(variables);
        };

        const renderContent = loading => {
          if (!hasFilter || isDev) {
            return <Children loading={loading}>{children}</Children>;
          }
          if (isFetching) return 'Loading...';
          if (err && displayError) return err.message;
          if (!item) return children;
          return (
            <B.ModelProvider key={item.id} value={item} id={modelId}>
              {children}
            </B.ModelProvider>
          );
        };

        const trigger = (data, loading, error) => {
          if (data || error) {
            B.triggerEvent('onActionDone');
          }
          if (data) {
            B.triggerEvent('onActionSuccess', data.actionb5);

            if (hasRedirect) {
              if (redirectTo === location.pathname) {
                history.go(0);
              } else {
                history.push(redirectTo);
              }
            }
          }

          if (loading) {
            B.triggerEvent('onActionLoad', loading);
          }

          if (error && !displayError) {
            B.triggerEvent('onActionError', error.message);
          }
        };

        return (
          <Action actionId={actionId}>
            {(callAction, { data, loading, error }) => (
              <>
                {trigger(data, loading, error)}
                <div className={classes.messageContainer}>
                  {error && displayError && (
                    <span className={classes.error}>{formErrorMessage}</span>
                  )}
                  {data && displaySuccess && (
                    <span className={classes.success}>
                      {formSuccessMessage}
                    </span>
                  )}
                </div>

                <form
                  onInvalid={handleInvalid}
                  onSubmit={evt => handleSubmit(evt, callAction)}
                  ref={formRef}
                  className={[
                    empty && classes.empty,
                    isPristine && classes.pristine,
                  ].join(' ')}
                >
                  {isPristine && (
                    <span>Drag form components in the form to submit data</span>
                  )}
                  {renderContent(loading)}
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
