(() => ({
  name: 'SubviewItem',
  type: 'SUBVIEWITEM_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { ListItem, ListItemText, ListItemIcon, Chip } =
      window.MaterialUI.Core;
    const {
      recordCount,
      alignItems,
      content,
      disabled,
      disableGutters,
      divider,
      selected,
      prop,
      icon,
      linkTo,
      dense,
      dataComponentAttribute = ['Subview item'],
    } = options;
    const { env, useText, Link, Icon, getProperty, useAllQuery } = B;
    const isDev = env === 'dev';
    const [recordAmount, setRecordAmount] = useState(null);

    const hasLink = linkTo && linkTo.id !== '';
    const propObj = getProperty(prop);

    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const IconLeftComponent = icon !== 'None' && (
      <ListItemIcon style={{ minWidth: '40px' }}>
        <Icon name={icon} />
      </ListItemIcon>
    );
    const isEmpty =
      propObj === null && icon === 'None' && children.length === 0;
    const contentText = useText(content);
    let itemText = propObj && propObj.label ? propObj.label : 'Empty Content';
    if (contentText) {
      itemText = contentText;
    }
    let linkComponent = 'li';
    if (hasLink && !isDev) linkComponent = Link;

    if (!isDev && prop && recordCount) {
      useAllQuery(
        propObj.referenceModelId ? propObj.referenceModelId : propObj.modelId,
        {
          onCompleted(res) {
            const hasResult = res && res.results && res.results.length > 0;
            if (hasResult) {
              B.triggerEvent('onSuccess', res.results);
              setRecordAmount(res.totalCount);
            } else {
              B.triggerEvent('onNoResults');
            }
          },
        },
        !propObj.modelId,
      );
    }

    return (
      <ListItem
        onClick={() => B.triggerEvent('onClick')}
        button={hasLink}
        component={linkComponent}
        endpoint={hasLink && !isDev ? linkTo : undefined}
        alignItems={alignItems}
        disabled={disabled}
        disableGutters={disableGutters}
        divider={divider}
        selected={selected}
        className={includeStyling(classes.root)}
        dense={dense}
        data-component={dataComponentAttributeValue}
      >
        {icon !== '' && IconLeftComponent}
        <ListItemText
          className={isEmpty && isDev && classes.placeholder}
          primary={itemText}
        />
        {recordAmount != null && (
          <Chip
            label={recordAmount}
            style={{ cursor: hasLink && !isDev ? 'pointer' : 'default' }}
          />
        )}
        <Icon name="KeyboardArrowRight" />
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
