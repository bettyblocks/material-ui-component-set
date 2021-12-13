(() => ({
  name: 'TextInput',
  type: 'FORM_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { name } = options;

    const Input = () => (
      <label htmlFor={name}>
        {name}
        <input className={classes.input} id={name} name={name} type="text" />
      </label>
    );

    if (B.env !== 'prod') {
      return (
        <div className={classes.root}>
          <Input />
        </div>
      );
    }

    return <Input />;
  })(),
  styles: () => ({
    root: {
      display: ({ options: { fullWidth } }) =>
        fullWidth ? 'block' : 'inline-block',
      '& > *': {
        pointerEvents: 'none',
      },
    },
  }),
}))();
