(() => ({
  name: 'Icon',
  icon: 'ContainerIcon',
  category: 'CONTENT',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const { Badge } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { icon, badge } = options;
    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const BagdedIcon = badge ? (
      <Badge badgeContent={badge} color="primary">
        {IconComponent}
      </Badge>
    ) : (
      IconComponent
    );

    return isDev ? (
      <span className={classes.wrapper}>{BagdedIcon}</span>
    ) : (
      BagdedIcon
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      wrapper: {
        display: 'inline-block',
      },
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
