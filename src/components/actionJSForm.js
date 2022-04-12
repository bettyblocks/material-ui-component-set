(() => ({
  name: 'Action Form Beta',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['FORM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId, modelId, filter } = options;
    const { Form, GetOne } = B;

    const [errors, setErrors] = useState([]);

    const isDev = B.env === 'dev';

    if (isDev && children.length === 0) {
      return (
        <div className={[classes.empty, classes.pristine].join(' ')}>Form</div>
      );
    }

    const onActionSuccess = (response) => {
      /* eslint-disable-next-line */
      if (response.errors) {
        const messages = response.errors.flatMap((error) => {
          if (!error.messages.errors) return [];
          return error.message.errors.map((inner) => inner.message);
        });

        B.triggerEvent('onActionError', new Error(messages.join(', ')));

        setErrors(messages);
        return;
      }

      const event = response.data.action.results;

      B.triggerEvent('onActionSuccess', event);

      setErrors([]);
    };

    const onActionError = (error) => {
      setErrors([error.message || error.toString()]);
      B.triggerEvent('onActionError', error);
    };

    const onActionDone = () => {
      B.triggerEvent('onActionDone');
    };

    const onActionLoad = (loading) => {
      B.triggerEvent('onActionLoad', loading);
    };

    const FormComponent = function () {
      return (
        <Form
          actionId={actionId}
          onActionLoad={onActionLoad}
          onActionDone={onActionDone}
          onActionSuccess={onActionSuccess}
          onActionError={onActionError}
        >
          <fieldset className={classes.fieldset}>{children}</fieldset>
          <ul>
            {errors.map((error) => (
              // eslint-disable-next-line react/jsx-key
              <li>{error}</li>
            ))}
          </ul>
        </Form>
      );
    };

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
