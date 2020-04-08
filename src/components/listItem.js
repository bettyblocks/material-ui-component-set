(() => ({
  name: 'ListItem',
  type: 'LIST_ITEM',
  allowedTypes: ['TEXT', 'IMAGE', 'CHIP', 'BUTTON', 'LINK', 'SWITCH'],
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
    } = options;
    const isDev = B.env === 'dev';
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

    const listItem = (
      <ListItem
        button={linkTo}
        component={linkTo ? B.Link : 'li'}
        endpoint={linkTo}
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
      >
        {icon !== 'None' && (avatar ? AvatarComponent : IconComponent)}
        <ListItemText
          primary={primaryText}
          secondary={children.length ? children : secondaryText}
        />
      </ListItem>
    );

    return isDev ? <span>{listItem}</span> : listItem;
  })(),
  styles: () => () => ({}),
}))();
