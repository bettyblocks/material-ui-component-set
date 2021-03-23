(() => ({
  name: 'Button',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { Button, CircularProgress, Tooltip } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;

    const {
      disabled,
      fullWidth,
      icon,
      iconPosition,
      linkType,
      linkTo,
      linkToExternal,
      openLinkToExternal,
      type,
      visible,
      actionId,
      buttonText,
      actionModels,
      addTooltip,
      hasVisibleTooltip,
      tooltipContent,
      tooltipPlacement,
    } = options;
    const {
      env,
      getModel,
      getIdProperty,
      Link: BLink,
      useText,
      useAction,
      useProperty,
    } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    const buttonContent = useText(buttonText);
    const tooltipText = useText(tooltipContent);

    const [isVisible, setIsVisible] = useState(visible);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip);

    const camelToSnakeCase = str =>
      str[0].toLowerCase() +
      str
        .slice(1, str.length)
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

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

    useEffect(() => {
      setIsVisible(visible);
      setIsOpen(hasVisibleTooltip);
    }, [visible, hasVisibleTooltip]);

    B.defineFunction('Show', () => setIsVisible(true));
    B.defineFunction('Hide', () => setIsVisible(false));
    B.defineFunction('Show/Hide', () => setIsVisible(s => !s));
    B.defineFunction('Toggle loading state', () => setIsLoading(s => !s));

    useEffect(() => {
      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const generalProps = {
      disabled: disabled || isLoading || loading,
      tabindex: isDev && -1,
      target:
        linkType === 'external' && hasExternalLink
          ? openLinkToExternal
          : undefined,
      href:
        linkType === 'external' && hasExternalLink
          ? linkToExternalVariable
          : undefined,
      component: linkType === 'internal' && hasLink ? BLink : undefined,
      endpoint: linkType === 'internal' && hasLink ? linkTo : undefined,
    };

    const buttonProps = {
      ...generalProps,
      fullWidth,
      classes: {
        root: classes.root,
        wrapper: isDev ? classes.wrapper : undefined,
      },
      className: !!buttonContent && classes.empty,
      type: isDev ? 'button' : type,
    };

    const showIndicator = isLoading || loading;

    const BasicButtonComponent = (
      <Button
        {...buttonProps}
        startIcon={
          icon !== 'None' &&
          iconPosition === 'start' &&
          React.createElement(Icons[icon])
        }
        endIcon={
          icon !== 'None' &&
          iconPosition === 'end' &&
          React.createElement(Icons[icon])
        }
        onClick={event => {
          event.stopPropagation();
          actionCallback();
        }}
      >
        {buttonContent}
        {showIndicator && (
          <CircularProgress size={16} className={classes.loader} />
        )}
      </Button>
    );

    let tooltipProps = {
      title: tooltipText,
      placement: tooltipPlacement,
      arrow: true,
      classes: {
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      },
    };

    if (isDev) {
      tooltipProps = {
        ...tooltipProps,
        open: isOpen,
      };
    }

    const ButtonWithTooltip = (
      <Tooltip {...tooltipProps}>{BasicButtonComponent}</Tooltip>
    );

    const ButtonComponent = addTooltip
      ? ButtonWithTooltip
      : BasicButtonComponent;

    return isVisible ? ButtonComponent : <></>;
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      wrapper: {
        pointerEvents: 'none',
      },
      root: {
        backgroundColor: ({ style: s }) => [s.backgroundColor, '!important'],
        boxShadow: ({ style: s }) => [s.boxShadow, '!important'],
        borderRadius: ({ style: s }) => [s.borderRadius, '!important'],
        borderWidth: ({ style: s }) => [s.borderWidth, '!important'],
        borderStyle: ({ style: s }) => [s.borderStyle, '!important'],
        borderColor: ({ style: s }) => [s.borderColor, '!important'],
        color: ({ style: s, options: { disabled } }) => [
          !disabled ? s.color : 'rgba(0, 0, 0, 0.26)',
          '!important',
        ],
        width: ({ options: { fullWidth, outerSpacing } }) => {
          if (!fullWidth) return 'auto';
          const marginRight = getSpacing(outerSpacing[1]);
          const marginLeft = getSpacing(outerSpacing[3]);
          return `calc(100% - ${marginRight} - ${marginLeft})`;
        },
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        '&.MuiButton-root, &.MuiIconButton-root': {
          [`@media ${mediaMinWidth(600)}`]: {
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Portrait');
              const marginLeft = getSpacing(outerSpacing[3], 'Portrait');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
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
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Landscape');
              const marginLeft = getSpacing(outerSpacing[3], 'Landscape');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
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
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Desktop');
              const marginLeft = getSpacing(outerSpacing[3], 'Desktop');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
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
      loader: {
        color: ({ style: s }) => [s.color, '!important'],
        marginLeft: '0.25rem',
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
      tooltip: {
        backgroundColor: ({ options: { tooltipBackground } }) => [
          style.getColor(tooltipBackground),
          '!important',
        ],
        color: ({ options: { tooltipText } }) => [
          style.getColor(tooltipText),
          '!important',
        ],
      },
      arrow: {
        color: ({ options: { tooltipBackground } }) => [
          style.getColor(tooltipBackground),
          '!important',
        ],
      },
    };
  },
}))();
