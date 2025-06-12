(() => ({
  name: 'SubmitButton',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { label } = options;

    function Input() {
      return (
        <div>
          <input
            className={includeStyling(classes.submit)}
            type="submit"
            value={label}
          />
        </div>
      );
    }

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
      '& > *': {
        pointerEvents: 'none',
      },
    },
    submit: {
      backgroundColor: 'rgb(63, 81, 181)',
      border: 0,
      borderRadius: '0.25rem',
      color: '#FFF',
      cursor: 'pointer',
      fontFamily: 'Roboto',
      fontWeight: 500,
      height: '2.625rem',
      letterSpacing: 'normal',
      marginTop: '0.75rem',
      padding: '0.6875rem 1rem',
      textTransform: 'uppercase',

      '&:hover': {
        filter: 'brightness(85%)',
      },
      '&:active': {
        filter: 'brightness(75%)',
      },
    },
  }),
}))();
