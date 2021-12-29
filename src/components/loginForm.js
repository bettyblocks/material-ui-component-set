(() => ({
  name: 'LoginForm',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['FORM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId, modelId, filter } = options;
    const { Form } = B;

    if (B.env !== 'prod' && children.length === 0) {
      return (
        <div className={[classes.empty, classes.pristine].join(' ')}>Form</div>
      );
    }

    const onSubmitSuccess = data => {
      /* eslint-disable-next-line */
      console.log(data);
      B.triggerEvent('onSubmitSuccess', data);
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
