(() => ({
  name: 'Form',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    if (B.env !== 'prod') {
      return (
        <div className={classes.placeholder}>
          <h1>Form placeholder</h1>
        </div>
      );
    }

    const { actionId } = options;
    const { Form } = B;

    return <Form actionId={actionId} />;
  })(),
  styles: () => ({
    placeholder: {
      alignItems: 'center',
      background: '#f0f1f5',
      color: 'rgb(38, 42, 58)',
      display: 'flex',
      height: '13rem',
      justifyContent: 'center',
      width: '100%',
    },
  }),
}))();
