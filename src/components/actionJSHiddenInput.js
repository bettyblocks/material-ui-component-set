(() => ({
  name: 'Hidden Input Beta',
  type: 'FORM_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionVariableId: name, value } = options;
    const isDev = B.env === 'dev';

    if (isDev) {
      return <div className={classes.dev}>Hidden input</div>;
    }

    const valueProperty = B.useProperty(value);

    function Input() {
      return (
        <input
          className={[isDev ? classes.dev : ''].join(' ')}
          defaultValue={parseInt(valueProperty, 10)}
          id={name}
          name={name}
          type="hidden"
        />
      );
    }

    return <Input />;
  })(),
  styles: () => () => ({
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
    dev: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '2rem',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
  }),
}))();
