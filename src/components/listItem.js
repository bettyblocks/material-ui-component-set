(() => ({
  name: 'ListItem',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      ListItem,
      ListItemText,
      ListItemIcon,
      ListItemAvatar,
      Avatar,
    } = window.MaterialUI.Core;
    const {
      alignItems,
      disabled,
      disableGutters,
      divider,
      selected,
      primaryText,
      secondaryText,
      icon,
      avatar,
      avatarUrl,
      avatarOrIcon,
      linkType,
      linkTo,
      linkToExternal,
      dense,
      dataComponentAttribute = ['ListItem'],
    } = options;
    const { env, useText, Link, Icon } = B;
    const isDev = env === 'dev';

    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';

    const primary = useText(primaryText);
    const secondary = useText(secondaryText);
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const IconComponent = icon !== 'None' && (
      <ListItemIcon>
        <Icon name={icon} />
      </ListItemIcon>
    );

    const AvatarComponent = (
      <ListItemAvatar>
        <Avatar src={avatarOrIcon === 'avatar' && avatarUrl}>
          {avatarOrIcon === 'icon' && <Icon name={icon} />}
        </Avatar>
      </ListItemAvatar>
    );

    const isEmpty =
      primary === '' &&
      secondary === '' &&
      icon === 'None' &&
      children.length === 0;

    const itemText = isEmpty && isDev ? 'Empty content' : primary;

    let linkComponent = 'li';
    if (linkType === 'internal' && hasLink && !isDev) linkComponent = Link;
    if (linkType === 'external' && hasExternalLink && !isDev)
      linkComponent = 'a';

    return (
      <ListItem
        onClick={() => B.triggerEvent('onClick')}
        button={hasLink || linkToExternalVariable}
        href={hasExternalLink ? linkToExternalVariable : undefined}
        component={linkComponent}
        endpoint={
          linkType === 'internal' && hasLink && !isDev ? linkTo : undefined
        }
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
        className={classes.root}
        dense={dense}
        data-component={dataComponentAttributeValue}
      >
        {avatarOrIcon === 'avatar' || (avatarOrIcon === 'icon' && avatar)
          ? AvatarComponent
          : avatarOrIcon !== 'none' && IconComponent}
        <ListItemText
          className={isEmpty && isDev && classes.placeholder}
          primary={itemText}
          secondary={children.length > 0 ? children : secondary}
        />
      </ListItem>
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const { env } = B;
    const isDev = env === 'dev';
    const style = new Styling(t);
    return {
      root: {
        color: ({ options: { titleColor } }) => style.getColor(titleColor),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        '&.MuiButtonBase-root, &.MuiListItem-button, .MuiListItem-button:hover': {
          color: ({ options: { titleColor } }) => style.getColor(titleColor),
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
        },
        '& .MuiListItemText-primary': {
          fontSize: ({ options: { titleSize } }) => titleSize,
          fontWeight: ({ options: { titleWeight } }) => titleWeight,
        },
        '& .MuiListItemText-secondary': {
          color: ({ options: { subtitleColor } }) =>
            style.getColor(subtitleColor),
          fontSize: ({ options: { subtitleSize } }) => subtitleSize,
          fontWeight: ({ options: { subtitleWeight } }) => subtitleWeight,
        },
        '& .MuiListItemIcon-root': {
          color: ({ options: { iconColor } }) => style.getColor(iconColor),
        },
        '& .MuiTouchRipple-root': {
          display: isDev ? 'none' : undefined,
        },
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
