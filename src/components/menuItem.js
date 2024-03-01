(() => ({
  name: 'MenuItem',
  type: 'MENU_ITEM',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { CircularProgress, MenuItem } = window.MaterialUI.Core;
    const {
      actionId,
      actionModels,
      dense,
      disabled,
      displayLogic,
      divider,
      icon,
      iconPosition,
      linkTo,
      linkToExternal,
      linkType,
      openLinkToExternal,
      primaryText,
      dataComponentAttribute,
    } = options;
    const { onClick } = parent;
    const {
      env,
      getModel,
      getIdProperty,
      Link,
      useAction,
      useLogic,
      useProperty,
      useText,
      Icon,
    } = B;
    const [isLoading, setIsLoading] = useState(false);

    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const hasLink = linkType === 'internal' && linkTo && linkTo.id !== '';
    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    let menuItemComponent = 'li';
    if (!isDev && hasLink) menuItemComponent = Link;
    if (!isDev && hasExternalLink) menuItemComponent = 'a';
    const primary = useText(primaryText);
    const logic = useLogic(displayLogic);

    const camelToSnakeCase = (str) =>
      str[0].toLowerCase() +
      str
        .slice(1, str.length)
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    const input =
      !isDev && actionModels
        ? actionModels.reduce((acc, value) => {
            const propertyUuid = getIdProperty(value);
            const model = getModel(value);
            const recordId = propertyUuid && useProperty(propertyUuid);

            if (recordId !== undefined) {
              acc[camelToSnakeCase(model.name)] = {
                variable_id: recordId,
              };
            }
            return acc;
          }, {})
        : {};

    const [actionCallback, { loading }] = (isAction &&
      useAction(actionId, {
        variables: {
          input,
        },
        onCompleted(data) {
          B.triggerEvent('onActionSuccess', data.actionb5);
        },
        onError(error) {
          B.triggerEvent('onActionError', error);
        },
      })) || [() => {}, { loading: false }];

    B.defineFunction('Toggle loading state', () => setIsLoading((s) => !s));

    useEffect(() => {
      if (loading) {
        setIsLoading(loading);
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const menuItemCmp = (
      <MenuItem
        className={includeStyling(classes.root)}
        component={menuItemComponent}
        dense={dense}
        disabled={!isDev && (disabled || isLoading)}
        divider={divider}
        href={hasExternalLink ? linkToExternalVariable : undefined}
        endpoint={hasLink ? linkTo : undefined}
        target={hasExternalLink ? openLinkToExternal : undefined}
        onClick={(e) => {
          if (onClick) onClick(e);
          actionCallback();
        }}
        data-component={useText(dataComponentAttribute) || 'MenuItem'}
      >
        {icon !== 'None' && iconPosition === 'start' && <Icon name={icon} />}
        {primary}
        {icon !== 'None' && iconPosition === 'end' && <Icon name={icon} />}
        {isLoading && <CircularProgress size={16} className={classes.loader} />}
      </MenuItem>
    );

    if (!isDev && !logic) {
      return <></>;
    }
    return menuItemCmp;
  })(),
  styles: (B) => (t) => {
    const { env, Styling } = B;
    const style = new Styling(t);
    const isDev = env === 'dev';
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor !== 'Transparent' && [
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
          color: ({ options: { iconColor } }) => style.getColor(iconColor),
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
      loader: {
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        marginLeft: '0.25rem',
      },
    };
  },
}))();
