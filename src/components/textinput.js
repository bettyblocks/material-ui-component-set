(() => ({
  name: 'TextInput',
  type: 'FORM_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { name, type } = options;

    const Input = () => (
      <div className={classes.formField}>
        <label htmlFor={name}>{name}</label>

        <input
          className={classes.input}
          id={name}
          name={name}
          type={type || 'text'}
        />
      </div>
    );

    if (B.env !== 'prod') {
      return (
        <div>
          <Input />
        </div>
      );
    }

    return <Input />;
  })(),
  styles: () => ({
    formField: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '0.75rem',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    input: {
      border: '1px solid #DDD',
      borderRadius: '3px',
      fontSize: '1rem',
      height: '1.125rem',
      lineHeight: '1.125rem',
      margin: 0,
      padding: '1.125rem 1rem',
    },
  }),
}))();
