(() => ({
  name: 'Button',
  icon: 'ButtonIcon',
  category: 'CONTENT',
  type: 'BUTTON',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (
    <span className={classes.wrapper}>
      {(() => {
        const { linkTo, disabled, buttonText } = options;
        if (linkTo && linkTo !== '') {
          return (
            <B.Link
              endpointId={linkTo}
              className={[
                classes.root,
                classes['size-normal'],
                classes.link,
                B.env === 'dev' ? classes.noEvents : '',
              ].join(' ')}
            >
              <B.Text value={buttonText} />
            </B.Link>
          );
        }

        return (
          <button
            type="button"
            className={[
              classes.root,
              classes['size-normal'],
              B.env === 'dev' ? classes.noEvents : '',
            ].join(' ')}
            disabled={B.env === 'dev' ? false : disabled === 'true'}
          >
            <B.Text value={buttonText} />
          </button>
        );
      })()}
    </span>
  ),
  styles: B => {
    const { theme } = B;
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : theme.getSpacing(idx, device);
    return {
      wrapper: {
        display: 'inline-block',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
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
        opacity: ({ options: { disabled } }) =>
          disabled === 'true' ? 0.38 : 1,
        '&::-moz-focus-inner': {
          border: 0,
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
      link: {
        cursor: 'pointer',
        '&:active': {
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
      [`@media ${B.mediaMinWidth(768)}`]: {
        wrapper: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        wrapper: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        wrapper: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
