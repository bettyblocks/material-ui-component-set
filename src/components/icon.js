(() => ({
  name: 'Icon',
  icon: 'ContainerIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const isDev = B.env === 'dev';
    const { icon } = options;
    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    return isDev ? (
      <span className={classes.wrapper}>{IconComponent}</span>
    ) : (
      IconComponent
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {
        '&.MuiSvgIcon-root': {
          fontSize: ({ options: { size } }) => style.getIconSize(size),
          color: ({ options: { color } }) => style.getColor(color),
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0]),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1]),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2]),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3]),
          [`@media ${B.mediaMinWidth(768)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Portrait'),
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
          },
        },
      },
    };
  },
}))();
