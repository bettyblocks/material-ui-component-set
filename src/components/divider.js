(() => ({
  name: 'Divider',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      <div className={B.env === 'dev' ? classes.clickSpace : ''}>
        <hr className={classes.divider} />
      </div>
    </div>
  ),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        width: ({ options: { outerSpacing } }) =>
          `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
            outerSpacing[3],
          )})`,
        [`@media ${B.mediaMinWidth(768)}`]: {
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
        [`@media ${B.mediaMinWidth(1024)}`]: {
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
        [`@media ${B.mediaMinWidth(1200)}`]: {
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
      clickSpace: {
        padding: '0.25rem 0',
      },
      divider: {
        height: ({ options: { thickness } }) => style.getBorderSize(thickness),
        margin: 0,
        backgroundColor: ({ options: { color } }) => style.getColor(color),
        border: 'none',
      },
    };
  },
}))();
