(() => ({
  name: 'StyleButton',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { buttonText } = options;

    return (
      <button className={classes.root} type="button">
        {buttonText}
      </button>
    );
  })(),
  styles: () => ({ styles }) => ({
    root: ({ styleId }) => ({
      padding: '0.5rem 1rem',
      ...styles[styleId],
    }),
  }),
}))();
