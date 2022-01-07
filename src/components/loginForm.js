(() => ({
  name: 'LoginForm',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['FORM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId, modelId, filter } = options;
    const { Form } = B;

    const [errors, setErrors] = useState([]);

    if (B.env !== 'prod' && children.length === 0) {
      return (
        <div className={[classes.empty, classes.pristine].join(' ')}>Form</div>
      );
    }

    const onSubmitSuccess = response => {
      /* eslint-disable-next-line */
      if (response.errors) {
        const messages = response.errors.flatMap(error =>
          error.message.errors.map(inner => inner.message),
        );

        B.triggerEvent('onSubmitError', new Error(messages.join(', ')));

        setErrors(messages);
        return;
      }

      const {
        data: {
          action: {
            results: { jwtToken },
          },
        },
      } = response;

      localStorage.setItem('TOKEN', jwtToken);
      B.triggerEvent('onSubmitSuccess', response);

      setErrors([]);
    };

    const onSubmitError = error => {
      /* eslint-disable-next-line */
      console.log(error);
      B.triggerEvent('onSubmitError', error);
    };

    const FormComponent = () => (
      <Form
        actionId={actionId}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
      >
        <fieldset className={classes.fieldset}>{children}</fieldset>
        <ul>
          {errors.map(error => (
            <li>{error}</li>
          ))}
        </ul>
      </Form>
    );

    if (B.env !== 'prod') {
      return (
        <div>
          <FormComponent />
        </div>
      );
    }

    if (modelId) {
      return (
        <B.GetOne modelId={modelId} filter={filter}>
          <FormComponent />
        </B.GetOne>
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
