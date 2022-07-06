(() => ({
  name: 'Form Beta',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId, modelId, filter } = options;
    const { Form, GetOne } = B;
    const formRef = React.createRef();

    const isDev = B.env === 'dev';

    if (isDev && children.length === 0) {
      return (
        <div className={[classes.empty, classes.pristine].join(' ')}>Form</div>
      );
    }

    const onActionSuccess = (response) => {
      const event = response.data.action.results;

      B.triggerEvent('onActionSuccess', event);
    };

    const onActionError = (error) => {
      B.triggerEvent('onActionError', error);
    };

    const onActionDone = () => {
      B.triggerEvent('onActionDone');
    };

    const onActionLoad = (loading) => {
      if (loading) B.triggerEvent('onActionLoad', loading);
    };

    useEffect(() => {
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
    }, [formRef]);

    function FormComponent() {
      return (
        <Form
          actionId={actionId}
          onActionLoad={onActionLoad}
          onActionDone={onActionDone}
          onActionSuccess={onActionSuccess}
          onActionError={onActionError}
          ref={formRef}
        >
          <fieldset className={classes.fieldset}>{children}</fieldset>
        </Form>
      );
    }

    if (isDev) {
      return (
        <div>
          <FormComponent />
        </div>
      );
    }

    if (modelId) {
      return (
        <GetOne modelId={modelId} filter={filter}>
          <FormComponent />
        </GetOne>
      );
    }

    return <FormComponent />;
  })(),
  styles: () => ({
    fieldset: {
      border: 0,
      margin: 0,
      padding: 0,
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: ({ options: { columnHeight } }) => (columnHeight ? 0 : '4rem'),
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
