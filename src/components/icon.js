(() => ({
  name: 'Icon',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const isDev = B.env === 'dev';
    const { icon } = options;
    const IconComponent = React.createElement(Icons[icon]);

    return isDev ? (
      <div className={classes.root}>{IconComponent}</div>
    ) : (
      IconComponent
    );
  })(),
  styles: () => () => ({
    root: {
      '&.MuiSvgIcon-root': {
        fontSize: '40px',
      },
    },
  }),
}))();
