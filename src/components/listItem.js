(() => ({
  name: 'ListItem',
  type: 'LIST_ITEM',
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
    } = options;
    const { env, useText, Link } = B;
    const isDev = env === 'dev';

    const primary = isDev
      ? primaryText.map(t => (t.name ? t.name : t)).join(' ')
      : useText(primaryText);
    const secondary = isDev
      ? secondaryText.map(t => (t.name ? t.name : t)).join(' ')
      : useText(primaryText);

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
        button={linkTo}
        component={linkTo ? Link : 'li'}
        endpoint={linkTo}
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
        className={classes.root}
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
      wrapper: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      root: {
        color: ({ options: { textColor } }) => style.getColor(textColor),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        '&.MuiButtonBase-root': {
          color: ({ options: { textColor } }) => style.getColor(textColor),
          backgroundColor: ({ options: { backgroundColor } }) =>
            style.getColor(backgroundColor),
        },
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
