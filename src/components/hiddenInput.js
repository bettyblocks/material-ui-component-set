(() => ({
  name: 'HiddenInput',
  icon: 'HiddenInputIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { getActionInput, useText } = B;
    const isDev = B.env === 'dev';
    const { actionInputId } = options;
    const actionInput = getActionInput(actionInputId);

    return isDev ? (
      <div className={[classes.root, isDev ? classes.bordered : ''].join(' ')}>
        HIDDEN INPUT
      </div>
    ) : (
      <input
        type="hidden"
        name={actionInput.name}
        value={useText(options.defaultValue)}
      />
    );
  })(),
  styles: () => () => ({
    root: {
      display: ({ options: { fullWidth } }) =>
        fullWidth ? 'block' : 'inline-block',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    bordered: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
      height: '100%',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
  }),
}))();
