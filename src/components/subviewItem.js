(() => ({
  name: 'SubviewItem',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      ListItem,
      ListItemText,
      ListItemIcon,
      ListItemSecondaryAction,
      IconButton,
    } = window.MaterialUI.Core;
    const {
      alignItems,
      disabled,
      disableGutters,
      divider,
      selected,
      prop,
      iconLeft,
      iconRight,
      linkTo,
      dense,
      dataComponentAttribute = ['Subview item'],
    } = options;
    const { env, useText, Link, Icon, getProperty } = B;
    const isDev = env === 'dev';

    const hasLink = linkTo && linkTo.id !== '';
    const propObj = getProperty(prop);

    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const IconLeftComponent = iconLeft !== 'None' && (
      <ListItemIcon>
        <Icon name={iconLeft} />
      </ListItemIcon>
    );
    const IconRightComponent = iconRight !== 'None' && (
      <ListItemSecondaryAction>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            console.log('test1234');
          }}
        >
          <Icon name={iconRight} />
        </IconButton>
      </ListItemSecondaryAction>
    );

    const isEmpty =
      propObj === null &&
      iconLeft === 'None' &&
      iconRight === 'None' &&
      children.length === 0;

    const itemText = propObj && propObj.label ? propObj.label : 'Empty Content';
    let linkComponent = 'li';
    if (hasLink && !isDev) linkComponent = Link;

    return (
      <ListItem
        onClick={(e) => {
          e.preventDefault();
          B.triggerEvent('onClick');
          alert('listitemclick');
        }}
        button={hasLink}
        component={linkComponent}
        endpoint={hasLink && !isDev ? linkTo : undefined}
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
        className={classes.root}
        dense={dense}
        data-component={dataComponentAttributeValue}
      >
        {iconLeft !== '' && IconLeftComponent}
        <ListItemText
          className={isEmpty && isDev && classes.placeholder}
          primary={itemText}
        />
        {iconRight !== '' && IconRightComponent}
      </ListItem>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const { env } = B;
    const isDev = env === 'dev';
    const style = new Styling(t);
    return {
      root: {
        color: ({ options: { titleColor } }) => style.getColor(titleColor),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        '&.MuiButtonBase-root, &.MuiListItem-button, .MuiListItem-button:hover':
          {
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
