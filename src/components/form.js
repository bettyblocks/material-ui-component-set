(() => ({
  name: 'Form',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['FORM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId } = options;
    const { Form } = B;

    const FormComponent = () => (
      <Form actionId={actionId}>
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

    return FormComponent;
  })(),
  styles: () => ({
    fieldset: {
      border: 0,
      margin: 0,
      padding: 0,
    },
  }),
}))();
