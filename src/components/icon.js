(() => ({
  name: 'Icon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const { Link, Badge } = window.MaterialUI.Core;
    const { useText } = B;
    const isDev = B.env === 'dev';
    const {
      icon,
      addBadge,
      content,
      badgeColor,
      invisible,
      anchorOrigin,
      variant,
      linkTo,
      linkToExternal,
      linkType,
    } = options;

    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';

    const Content = useText(content);
    const anchorOriginSplit = anchorOrigin.split(',');
    const anchorOriginObj = {
      horizontal: anchorOriginSplit[0],
      vertical: anchorOriginSplit[1],
    };

    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const LinkComponent = (
      <Link
        href={
          linkType === 'external' && hasExternalLink
            ? linkToExternal
            : 'https://google.com'
        }
        component={linkType === 'internal' && hasLink ? B.Link : undefined}
        endpoint={linkType === 'internal' && hasLink ? linkTo : undefined}
      >
        {IconComponent}
      </Link>
    );

    const Icon = hasLink ? LinkComponent : IconComponent;

    const BadgeComponent = (
      <div className={classes.badge}>
        <Badge
          badgeContent={Content}
          color={badgeColor}
          invisible={invisible}
          anchorOrigin={anchorOriginObj}
          variant={variant}
        >
          {Icon}
        </Badge>
      </div>
    );

    const Component = addBadge ? BadgeComponent : Icon;

    return isDev ? (
      <span className={classes.wrapper}>{Component}</span>
    ) : (
      Component
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
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
          [`@media ${B.mediaMinWidth(600)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Portrait'),
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
          },
        },
      },
      badge: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        display: 'inline-flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
      },
    };
  },
}))();
