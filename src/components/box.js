(() => ({
  name: 'Box',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Box } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { alignment } = options;
    const isEmpty = children.length === 0;
    const BoxCmp = (
      <Box
        className={classes.root}
        display="flex"
        flexDirection="row"
        justifyContent={alignment}
      >
        {children}
      </Box>
    );

    return isDev ? (
      <div
        className={[classes.wrapper, isEmpty ? classes.empty : ''].join(' ')}
      >
        {BoxCmp}
      </div>
    ) : (
      BoxCmp
    );
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      wrapper: {
        flex: ({ options: { stretch } }) => (stretch ? 1 : 0),
      },
      root: {
        flex: ({ options: { stretch } }) => (stretch ? 1 : 0),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${B.mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '2.5rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor === 'Transparent'
            ? '#F0F1F5'
            : style.getColor(backgroundColor),
        '& > div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& > div::after': {
          content: '"Box"',
        },
      },
    };
  },
}))();
