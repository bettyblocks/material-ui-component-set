(() => ({
  name: 'SubmitButton',
  icon: 'SubmitButtonIcon',
  category: 'FORM',
  type: 'SUBMIT_BUTTON',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (
    <span className={classes.wrapper}>
      {(() => (
        <button
          type="button"
          className={[
            classes.root,
            classes['size-normal'],
            B.env === 'dev' ? classes.noEvents : '',
          ].join(' ')}
          disabled={B.env === 'dev' ? false : options.buttonDisabled}
          onClick={options.onClick}
        >
          {options.submitButtonText}
          <span
            className={[
              classes.loader,
              options.formStatus && options.formStatus === 'waiting'
                ? classes.show
                : classes.hidden,
            ].join(' ')}
          />
        </button>
      ))()}
    </span>
  ),
  styles: B => {
    const { theme } = B;
    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {
        display: 'inline-flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        color: theme.getColor('White'),
        fontFamily: theme.getFontFamily('Button'),
        fontSize: theme.getFontSize('Button'),
        fontWeight: theme.getFontWeight('Button'),
        textTransform: theme.getTextTransform('Button'),
        letterSpacing: theme.getLetterSpacing('Button'),
        textDecoration: 'none',
        backgroundColor: ({ options: { backgroundColor } }) =>
          theme.getColor(backgroundColor),
        border: 'none',
        borderRadius: theme.getBorderRadius('M'),
        boxSizing: 'border-box',
        padding: '0 1rem',
        minWidth: '4rem',
        height: '2.25rem',
        appearance: 'none',
        overflow: 'hidden',
        verticalAlign: 'middle',
        userSelect: 'none',
        transition: 'box-shadow 0.1s',
        cursor: 'pointer',
        '&::-moz-focus-inner': {
          border: 0,
        },
        '&:disabled': {
          opacity: 0.38,
          cursor: 'default',
        },
        '&:hover': {
          backgroundColor: ({ options: { backgroundColor } }) =>
            B.color.darken(theme.getColor(backgroundColor), 0.08),
        },
        '&:active': {
          backgroundColor: ({ options: { backgroundColor } }) =>
            B.color.darken(theme.getColor(backgroundColor), 0.08),
        },
        '&:hover, &:active, &:focus': {
          outline: 'none',
        },
        '&:not(:active):focus': {
          boxShadow: ({ options: { backgroundColor } }) =>
            `0 0 0 0.2rem ${B.color.alpha(
              theme.getColor(backgroundColor),
              0.5,
            )}`,
        },
      },
      noEvents: {
        pointerEvents: 'none',
      },
      normal: {
        padding: '0 1rem',
        fontSize: '0.875rem',
        height: '2.25rem',
      },
      '@keyframes loading': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '50%': {
          transform: 'rotate(180deg)',
          opacity: '0.35',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      loader: {
        display: 'inline-block',
        width: '0.75rem',
        height: '0.75rem',
        marginLeft: '0.75rem',
        border: '0.1875rem solid #ffffff',
        borderRadius: '50%',
        borderTop: '0.1875rem solid transparent',
        animation: 'loading infinite linear 1s',
      },
      show: {
        display: 'inline-block',
      },
      hidden: {
        display: 'none',
      },
    };
  },
}))();
