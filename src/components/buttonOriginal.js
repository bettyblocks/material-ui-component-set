(() => ({
  name: 'ButtonOriginal',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Button, IconButton, CircularProgress } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;

    const {
      variant,
      disabled,
      fullWidth,
      size,
      icon,
      iconPosition,
      linkType,
      linkTo,
      linkToExternal,
      type,
      visible,
      actionId,
      buttonText,
      actionProperties,
    } = options;

    const { env, useText, useAction } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    const isIcon = variant === 'icon';
    const buttonContent = useText(buttonText);

    const [isVisible, setIsVisible] = useState(visible);
    const [isLoading, setIsLoading] = useState(false);

    const propertyMappings = new Map(actionProperties);
    const input = Array.from(propertyMappings.keys()).reduce((acc, key) => {
      const propertyId = propertyMappings.get(key);

      const value = isDev ? '' : B.useProperty(propertyId);
      acc[key] = value;
      return acc;
    }, {});

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
    }, [visible]);

    B.defineFunction('Show', () => setIsVisible(true));
    B.defineFunction('Hide', () => setIsVisible(false));
    B.defineFunction('Show/Hide', () => setIsVisible(s => !s));
    B.defineFunction('Load', () => setIsLoading(true));
    B.defineFunction('Loaded', () => setIsLoading(false));
    B.defineFunction('Load/Loaded', () => setIsLoading(l => !l));

    useEffect(() => {
      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const generalProps = {
      disabled: disabled || isLoading || loading,
      size,
      tabindex: isDev && -1,
      href:
        linkType === 'external' && hasExternalLink
          ? linkToExternalVariable
          : undefined,
      component: linkType === 'internal' && hasLink ? B.Link : undefined,
      endpoint: linkType === 'internal' && hasLink ? linkTo : undefined,
    };

    const iconButtonProps = {
      ...generalProps,
      classes: { root: classes.root },
    };

    const buttonProps = {
      ...generalProps,
      fullWidth,
      variant,
      classes: {
        root: classes.root,
        contained: classes.contained,
        outlined: classes.outlined,
      },
      className: !!buttonContent && classes.empty,
      type: isDev ? 'button' : type,
    };
    const compProps = isIcon ? iconButtonProps : buttonProps;
    const BtnComp = isIcon ? IconButton : Button;

    const showIndicator = !isIcon && (isLoading || loading);

    const ButtonComponent = (
      <BtnComp
        {...compProps}
        startIcon={
          !isIcon &&
          icon !== 'None' &&
          iconPosition === 'start' &&
          React.createElement(Icons[icon])
        }
        endIcon={
          !isIcon &&
          icon !== 'None' &&
          iconPosition === 'end' &&
          React.createElement(Icons[icon])
        }
        onClick={event => {
          event.stopPropagation();
          actionCallback();
        }}
      >
        {isIcon &&
          React.createElement(Icons[icon === 'None' ? 'Error' : icon], {
            fontSize: size,
          })}
        {!isIcon && buttonContent}
        {showIndicator && (
          <CircularProgress size={16} className={classes.loader} />
        )}
      </BtnComp>
    );

    if (isDev) {
      return <div className={classes.wrapper}>{ButtonComponent}</div>;
    }
    return isVisible ? ButtonComponent : <></>;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        width: ({ options: { fullWidth } }) => fullWidth && '100%',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      root: {
        color: ({ options: { variant, textColor, background } }) => [
          style.getColor(variant === 'icon' ? background : textColor),
          '!important',
        ],
        '&.MuiButton-contained.Mui-disabled': {
          color: ['rgba(0, 0, 0, 0.26)', '!important'],
          boxShadow: ['none', '!important'],
          backgroundColor: ['rgba(0, 0, 0, 0.12)', '!important'],
        },
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
          [`@media ${B.mediaMinWidth(600)}`]: {
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
          [`@media ${B.mediaMinWidth(960)}`]: {
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
          [`@media ${B.mediaMinWidth(1280)}`]: {
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
      contained: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      outlined: {
        borderColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      loader: {
        color: ({ options: { variant, textColor, background } }) => [
          style.getColor(variant === 'icon' ? background : textColor),
          '!important',
        ],
        marginLeft: '0.25rem',
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
    };
  },
}))();
