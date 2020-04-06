(() => ({
  name: 'Icon',
  icon: 'ContainerIcon',
  category: 'CONTENT',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const isDev = B.env === 'dev';
    const { icon } = options;
    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    return isDev ? <span>{IconComponent}</span> : IconComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      root: {
        '&.MuiSvgIcon-root': {
          [`@media ${B.mediaMinWidth(768)}`]: {
            fontSize: ({ options: { type } }) =>
              style.getFontSize(type, 'Portrait'),
          },
          [`@media ${B.mediaMinWidth(1024)}`]: {
            fontSize: ({ options: { type } }) =>
              style.getFontSize(type, 'Landscape'),
          },
          [`@media ${B.mediaMinWidth(1200)}`]: {
            fontSize: ({ options: { type } }) =>
              style.getFontSize(type, 'Desktop'),
          },
        },
      },
    };
  },
}))();
