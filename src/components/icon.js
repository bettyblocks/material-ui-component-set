(() => ({
  name: 'Icon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const { Link, Badge } = window.MaterialUI.Core;
    const { env, useText, Link: BLink } = B;
    const isDev = env === 'dev';
    const {
      icon,
      addBadge,
      content,
      badgeColor,
      anchorOrigin,
      variant,
      linkTo,
      linkToExternal,
      linkType,
    } = options;

    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';

    const contentText = useText(content);
    const linkToExternalText = useText(linkToExternal);
    const anchorOriginSplit = anchorOrigin.split(',');
    const anchorOriginObj = {
      horizontal: anchorOriginSplit[0],
      vertical: anchorOriginSplit[1],
    };
    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const href =
      linkType === 'external' && hasExternalLink
        ? linkToExternalText
        : undefined;
    const LinkComponent = (
      <Link
        href={href}
        component={linkType === 'internal' && hasLink ? BLink : undefined}
        endpoint={linkType === 'internal' && hasLink ? linkTo : undefined}
      >
        {IconComponent}
      </Link>
    );

    const Icon = hasLink ? LinkComponent : IconComponent;

    const BadgeComponent = (
      <Badge
        classes={{ root: classes.badge }}
        badgeContent={contentText}
        color={badgeColor}
        anchorOrigin={anchorOriginObj}
        variant={variant}
        overlap={variant === 'dot' ? 'circle' : 'rectangle'}
      >
        {Icon}
      </Badge>
    );

    const Component = addBadge ? BadgeComponent : Icon;

    return isDev ? (
      <span className={classes.wrapper}>{Component}</span>
    ) : (
      Component
    );
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
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
          [`@media ${mediaMinWidth(600)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Landscape'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Landscape'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Landscape'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
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
