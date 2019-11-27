(() => ({
  name: 'Alert',
  icon: 'AlertIcon',
  category: 'CONTENT',
  type: 'ALERT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => (
    <section className={classes.root}>
      {(() => {
        const {
          icon,
          titleText,
          bodyText,
          buttonLink,
          buttonText,
          linkToExternal,
        } = options;
    
        const useExternalLink =
          linkType === 'External' && linkToExternal !== '';
        const useInternalLink = linkType === 'Internal' && buttonLink !== '';
        const useTextOnly = !useExternalLink && !useInternalLink;
        return (
          <>
            <div className={classes.iconWrapper}>
              {icon && <i className={[classes.icon, icon].join(' ')} />}
            </div>
            <div className={classes.contentWrapper}>
              <div className={classes.textWrapper}>
                {titleText && (
                  <h1 className={classes.title}>
                    <B.Text value={titleText} />
                  </h1>
                )}
                {bodyText && (
                  <p className={classes.content}>
                    <B.Text value={bodyText} />
                  </p>
                )}
              </div>
            </div>
            <div className={classes.controlsWrapper}>
              <div className={classes.buttonsWrapper}>
                {buttonText && useExternalLink && (
                  <a
                    href={linkToExternal}
                    className={[classes.button, classes.link].join(' ')}
                  >
                    <B.Text value={buttonText} />
                  </a>
                )}

                {buttonText && useInternalLink && (
                  <B.Link
                    endpointId={buttonLink}
                    className={[classes.button, classes.link].join(' ')}
                  >
                    <B.Text value={buttonText} />
                  </B.Link>
                )}

                {buttonText && useTextOnly && (
                  <button type="button" className={classes.button}>
                    <B.Text value={buttonText} />
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })()}
    </section>
  ))(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        extend: theme.base,
        display: 'flex',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        fontFamily: style.getFontFamily('Body1'),
        backgroundColor: style.getColor('White'),
        border: ({ options }) => `1px solid ${style.getColor(options.color)}`,
        borderRadius: '0.125rem',
        width: ({ options: { outerSpacing } }) =>
          `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
            outerSpacing[3],
          )})`,
      },
      iconWrapper: {
        padding: '0.25rem',
        margin: '-0.0625rem 0 -0.0625rem -0.0625rem',
        backgroundColor: ({ options }) => style.getColor(options.color),
        borderRadius: '0.125rem 0 0 0.125rem',
      },
      icon: {
        margin: ({ options: { titleText } }) =>
          `${titleText ? '1rem' : '0.875rem'} 0.5rem 0`,
        fontSize: '1.5rem',
        color: style.getColor('White'),
      },
      contentWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        flex: 1,
        padding: '0 1rem',
      },
      textWrapper: {
        flex: '1 1 auto',
      },
      controlsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 0.625rem',
      },
      buttonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      title: {
        margin: '1.25rem 0',
        fontSize: style.getFontSize('Title6'),
        fontWeight: style.getFontSize('Title6'),
      },
      content: {
        margin: '1.125rem 0',
        fontSize: style.getFontSize('Body1'),
        fontWeight: style.getFontWeight('Body1'),
        color: ({ options: { titleText, color } }) =>
          titleText ? style.getColor(color) : style.getColor('Dark'),
      },
      buttonWrapper: {
        display: 'flex',
        alignItems: ({ options: { titleText, bodyText } }) =>
          !titleText || !bodyText ? 'center' : 'flex-end',
        paddingLeft: '2.5rem',
      },
      button: {
        padding: '0.625rem 0.75rem',
        margin: '0 0.5rem 0.5rem',
        marginBottom: ({ options: { titleText, bodyText } }) =>
          (!titleText || !bodyText) && 0,
        fontFamily: style.getFontFamily('Button'),
        fontSize: style.getFontSize('Button'),
        fontWeight: style.getFontWeight('Button'),
        color: ({ options: { color } }) => style.getColor(color),
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        border: 'none',
        '&:first-of-type': {
          marginLeft: 0,
        },
        '&:last-of-type': {
          marginRight: 0,
        },
      },
      link: {
        cursor: 'pointer',
        textDecoration: 'none',
        '&:active': {
          boxShadow: ({ options: { color } }) =>
            `0 0 0 0.2rem ${B.color.alpha(style.getColor(color), 0.5)}`,
        },
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          width: ({ options: { outerSpacing } }) =>
            `calc(100% - ${getSpacing(
              outerSpacing[1],
              'Portrait',
            )} - ${getSpacing(outerSpacing[3], 'Portrait')})`,
        },
        icon: {
          marginTop: ({ options: { titleText } }) =>
            titleText ? '1.25rem' : '1rem',
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          width: ({ options: { outerSpacing } }) =>
            `calc(100% - ${getSpacing(
              outerSpacing[1],
              'Landscape',
            )} - ${getSpacing(outerSpacing[3], 'Landscape')})`,
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          width: ({ options: { outerSpacing } }) =>
            `calc(100% - ${getSpacing(
              outerSpacing[1],
              'Desktop',
            )} - ${getSpacing(outerSpacing[3], 'Desktop')})`,
        },
      },
    };
  },
}))();
