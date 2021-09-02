(() => ({
  name: 'Form',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const {
          Action,
          Children,
          env,
          getActionInput,
          getIdProperty,
          ModelProvider,
          useAllQuery,
          useEndpoint,
          useText,
        } = B;

        const {
          formData,
          filter,
          formErrorMessage,
          formSuccessMessage,
          redirect,
          showError,
          showSuccess,
          currentRecord,
          loadingType,
          loadingText,
        } = options;
        const formRef = React.createRef();
        const parsedLoadingText = useText(loadingText);
        const displayError = showError === 'built-in';
        const displaySuccess = showSuccess === 'built-in';
        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;
        const hasRedirect = redirect && redirect.id !== '';
        const redirectTo =
          env === 'prod' && hasRedirect && useEndpoint(redirect);
        const { actionId, modelId, variableId, objectVariableId } = formData;
        const formVariable = getActionInput(variableId);

        const hasFilter =
          modelId &&
          ((filter && Object.keys(filter).length !== 0) || currentRecord);

        const mounted = useRef(false);

        B.defineFunction('Submit', () => {
          if (formRef.current) {
            if (typeof formRef.current.requestSubmit === 'function') {
              formRef.current.requestSubmit();
            } else {
              formRef.current.dispatchEvent(
                new Event('submit', { cancelable: true }),
              );
            }
          }
        });

        const [, setOptions] = useOptions();

        B.defineFunction('setCurrentRecord', value => {
          if (typeof value === 'number') {
            setOptions({
              currentRecord: value,
            });
          }
        });

        useEffect(() => {
          mounted.current = true;
          return () => {
            mounted.current = false;
          };
        }, []);

        const handleSubmit = (evt, callAction, item) => {
          evt.preventDefault();
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
          const postObjValues = item && item.id ? { variable_id: item.id } : {};
          let variables = { variables: { input: postValues } };
          if (formVariable && formVariable.name) {
            let inputVariables = {
              [formVariable.name]: postValues,
            };
            if (objectVariableId) {
              const objectVariable = getActionInput(objectVariableId);
              inputVariables = {
                ...inputVariables,
                [objectVariable.name]: postObjValues,
              };
            }

            variables = {
              variables: {
                input: inputVariables,
              },
            };
          }
          callAction(variables);
        };

        const trigger = (data, loading, error) => {
          if (data || error) {
            B.triggerEvent('onActionDone');
          }
          if (data) {
            B.triggerEvent('onActionSuccess', data.actionb5);

            if (!isDev && hasRedirect) {
              const history = useHistory();
              const location = useLocation();
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
            B.triggerEvent('onActionError', error);
          }
        };

        const classNames = [
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ]
          .join(' ')
          .trim();

        const FormElement = () => {
          B.defineFunction('Refetch', () => {});
          return (
            <form className={classNames || undefined}>
              {isPristine && (
                <span>Drag form components in the form to submit data</span>
              )}
              {children}
            </form>
          );
        };

        const FormCmp = ({ item, refetch }) => {
          const [isInvalid, setIsInvalid] = useState(false);
          const handleInvalid = () => {
            if (!isInvalid) {
              setIsInvalid(true);
              B.triggerEvent('onInvalid');
            }
          };

          B.defineFunction('Refetch', () => {
            if (refetch) refetch();
          });

          useEffect(() => {
            B.triggerEvent('onComponentRendered');
          }, []);

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
                    onSubmit={evt => {
                      setIsInvalid(false);
                      handleSubmit(evt, callAction, item);
                    }}
                    ref={formRef}
                    className={classNames || undefined}
                  >
                    {isPristine && (
                      <span>
                        Drag form components in the form to submit data
                      </span>
                    )}
                    {item ? (
                      <ModelProvider key={item.id} value={item} id={modelId}>
                        {children}
                      </ModelProvider>
                    ) : (
                      <Children loading={loading}>{children}</Children>
                    )}
                  </form>
                </>
              )}
            </Action>
          );
        };

        const FormWithData = () => {
          const getFilter = React.useCallback(() => {
            if (isDev || !currentRecord || !modelId) {
              return filter;
            }

            const idProperty = getIdProperty(modelId);
            return {
              [idProperty.id]: { eq: currentRecord },
            };
          }, [isDev, filter, currentRecord, modelId]);

          const applyFilter = modelId && getFilter();

          const {
            loading: isFetching,
            data: records,
            error: err,
            refetch,
          } = useAllQuery(
            modelId,
            {
              filter: applyFilter,
              skip: 0,
              take: 1,
            },
            !applyFilter,
          );

          B.defineFunction('Refetch', () => refetch());

          useEffect(() => {
            if (mounted.current && isFetching) {
              B.triggerEvent('onDataLoad', isFetching);
            }
          }, [isFetching]);

          if (err) {
            B.triggerEvent('onDataError', err);
          }

          const item = records && records.results[0];

          if (item) {
            if (item.id) {
              B.triggerEvent('onDataSuccess', item);
            } else {
              B.triggerEvent('onDataNoResults');
            }
          }

          if (isFetching && loadingType === 'default')
            return <span>{parsedLoadingText}</span>;

          if (isFetching && loadingType === 'showChildren') return children;

          if (err && displayError) return err.message;
          if (!item) return children;

          return <FormCmp item={item} refetch={refetch} />;
        };

        const RuntimeForm = hasFilter ? <FormWithData /> : <FormCmp />;

        return isDev ? <FormElement /> : RuntimeForm;
      })()}
    </div>
  ),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);

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
