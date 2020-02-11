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
        const {
          linkType,
          linkTo,
          linkToExternal,
          disabled,
          buttonText,
        } = options;

        if (linkType === 'External' && linkToExternal !== '') {
          return (
            <a
              href={linkToExternal}
              className={[
                classes.root,
                classes['size-normal'],
                classes.link,
                B.env === 'dev' ? classes.noEvents : '',
              ].join(' ')}
            >
              <B.Text value={buttonText} />
            </a>
          );
        }

        if (linkType === 'Internal' && linkTo !== '') {
          return (
            <B.Link
              endpoint={linkTo}
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
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

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
        opacity: ({ options: { disabled } }) =>
          disabled === 'true' ? 0.38 : 1,
        '&::-moz-focus-inner': {
          border: 0,
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
      link: {
        cursor: 'pointer',
        '&:active': {
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
