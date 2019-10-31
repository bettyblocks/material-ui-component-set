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
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {
        extend: t.base,
        display: 'inline-flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        color: style.getColor('White'),
        fontFamily: style.getFontFamily('Button'),
        fontSize: style.getFontSize('Button'),
        fontWeight: style.getFontWeight('Button'),
        textTransform: style.getTextTransform('Button'),
        letterSpacing: style.getLetterSpacing('Button'),
        textDecoration: 'none',
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        border: 'none',
        borderRadius: style.getBorderRadius('M'),
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
            B.color.darken(style.getColor(backgroundColor), 0.08),
        },
        '&:active': {
          backgroundColor: ({ options: { backgroundColor } }) =>
            B.color.darken(style.getColor(backgroundColor), 0.08),
        },
        '&:hover, &:active, &:focus': {
          outline: 'none',
        },
        '&:not(:active):focus': {
          boxShadow: ({ options: { backgroundColor } }) =>
            `0 0 0 0.2rem ${B.color.alpha(
              style.getColor(backgroundColor),
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
