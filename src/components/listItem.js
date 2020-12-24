(() => ({
  name: 'ListItem',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      ListItem,
      ListItemText,
      ListItemIcon,
      ListItemAvatar,
      Avatar,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
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
      linkTo,
      dense,
    } = options;
    const { env, useText, Link } = B;
    const isDev = env === 'dev';

    const hasLink = linkTo && linkTo.id !== '';

    const primary = useText(primaryText);
    const secondary = useText(secondaryText);

    const IconComponent = (
      <ListItemIcon>
        {icon !== 'None' && React.createElement(Icons[icon])}
      </ListItemIcon>
    );

    const AvatarComponent = (
      <ListItemAvatar>
        <Avatar>{icon !== 'None' && React.createElement(Icons[icon])}</Avatar>
      </ListItemAvatar>
    );

    const isEmpty =
      primary === '' &&
      secondary === '' &&
      icon === 'None' &&
      children.length === 0;

    const itemText = isEmpty && isDev ? 'Empty content' : primary;

    const listItem = (
      <ListItem
        button={hasLink}
        component={hasLink ? Link : 'li'}
        endpoint={linkTo}
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
        className={classes.root}
        dense={dense}
      >
        {icon !== 'None' && (avatar ? AvatarComponent : IconComponent)}
        <ListItemText
          className={isEmpty && isDev && classes.placeholder}
          primary={itemText}
          secondary={children.length > 0 ? children : secondary}
        />
      </ListItem>
    );

    return isDev ? <div className={classes.wrapper}>{listItem}</div> : listItem;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
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
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
