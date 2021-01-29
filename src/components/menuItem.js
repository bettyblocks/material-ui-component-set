(() => ({
  name: 'MenuItem',
  type: 'MENU_ITEM',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { MenuItem } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      dense,
      disabled,
      divider,
      icon,
      iconPosition,
      linkTo,
      linkToExternal,
      linkType,
      primaryText,
    } = options;
    const { Link, useText } = B;
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    let menuItemComponent = 'li';
    if (linkType === 'internal' && hasLink) menuItemComponent = Link;
    if (linkType === 'external' && hasExternalLink) menuItemComponent = 'a';
    const primary = useText(primaryText);

    return (
      <MenuItem
        className={classes.root}
        component={menuItemComponent}
        dense={dense}
        disabled={disabled}
        divider={divider}
        href={hasExternalLink ? linkToExternalVariable : undefined}
        endpoint={linkType === 'internal' && hasLink ? linkTo : undefined}
      >
        {icon !== 'None' &&
          iconPosition === 'start' &&
          React.createElement(Icons[icon])}
        {primary}
        {icon !== 'None' &&
          iconPosition === 'end' &&
          React.createElement(Icons[icon])}
      </MenuItem>
    );
  })(),
  styles: B => t => {
    const { env, Styling } = B;
    const style = new Styling(t);
    const isDev = env === 'dev';
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { disabled, textColor } }) => [
          !disabled ? style.getColor(textColor) : 'rgba(0, 0, 0, 0.26)',
          '!important',
        ],
        '& .MuiSvgIcon-root': {
          ...({ options: { iconPosition } }) => ({
            marginRight: iconPosition === 'start' ? '0.5rem' : '',
            marginLeft: iconPosition === 'end' ? '0.5rem' : '',
          }),
          marginRight: ({ options: { iconPosition } }) =>
            iconPosition === 'start' ? '0.5rem' : '',
          marginLeft: ({ options: { iconPosition } }) =>
            iconPosition === 'end' ? '0.5rem' : '',
        },
        ...(isDev && {
          '&:hover': {
            backgroundColor: ({ options: { backgroundColor } }) => [
              style.getColor(backgroundColor),
              '!important',
            ],
          },
          '& .MuiTouchRipple-root': {
            display: ['none', '!important'],
          },
        }),
      },
    };
  },
}))();
