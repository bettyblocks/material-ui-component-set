(() => ({
  name: 'Form',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['FORM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId } = options;
    const { Form } = B;

    if (B.env !== 'prod') {
      return (
        <div>
          <Form actionId={actionId}>{children}</Form>
        </div>
      );
    }

    return <Form actionId={actionId}>{children}</Form>;
  })(),
  styles: () => ({}),
}))();
