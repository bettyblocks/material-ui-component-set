(() => ({
  name: 'Button',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { CircularProgress, Tooltip, Link } = window.MaterialUI.Core;
    const {
      disabled,
      size,
      type,
      icon,
      iconPosition,
      linkType,
      linkTo,
      linkToExternal,
      linkTarget,
      visible,
      actionId,
      buttonText,
      actionModels,
      addTooltip,
      hasVisibleTooltip,
      tooltipContent,
      tooltipPlacement,
      dataComponentAttribute,
    } = options;
    const {
      env,
      getModel,
      getIdProperty,
      useText,
      useAction,
      useProperty,
      useEndpoint,
      Icon,
    } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action' || !!actionId;
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    const linkToInternalVariable =
      linkTo && linkTo.id !== '' && useEndpoint(linkTo);
    const hasInteralLink =
      linkType === 'internal' && linkTo && linkTo.id !== '';
    const buttonContent = useText(buttonText);
    const tooltipText = useText(tooltipContent);
    const [isVisible, setIsVisible] = useState(visible);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip);
    const [, setOptions] = useOptions();
    const [isDisabled, setIsDisabled] = useState(disabled);

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

    useEffect(() => {
      setIsVisible(visible);
      setIsOpen(hasVisibleTooltip);
    }, [visible, hasVisibleTooltip]);

    useEffect(
      () =>
        setOptions({
          disabled: isDisabled,
        }),
      [isDisabled],
    );

    useEffect(() => {
      B.defineFunction('Show', () => setIsVisible(true));
      B.defineFunction('Hide', () => setIsVisible(false));
      B.defineFunction('Show/Hide', () => setIsVisible((s) => !s));
      B.defineFunction('Toggle loading state', () => {
        setIsLoading((s) => !s);
      });
      B.defineFunction('Enable', () => setIsDisabled(false));
      B.defineFunction('Disable', () => setIsDisabled(true));

      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const getExternalHref = (config) => {
      if (config.disabled) {
        return undefined;
      }
      if (config.linkToExternal && config.linkToExternal.id !== '') {
        return config.linkToExternalVariable;
      }
      return undefined;
    };

    const getInternalHref = (config) => {
      if (config.disabled) {
        return undefined;
      }
      if (config.linkTo && config.linkTo.id !== '') {
        return config.linkToInternalVariable;
      }
      return undefined;
    };

    const showIndicator = isLoading || loading;

    const emptySpace = () => {
      if (icon === 'None') {
        return '\xA0';
      }
      return null;
    };

    const buttonProps = {
      disabled: disabled || isLoading || loading,
      tabIndex: isDev ? -1 : undefined,
      onClick: (event) => {
        event.stopPropagation();
        actionCallback();
      },
      role: 'button',
      type: isDev ? 'button' : type,
      endpoint:
        linkType === 'internal' && linkTo && linkTo.id ? linkTo : undefined,
      'data-component': useText(dataComponentAttribute) || 'Button',
    };

    const targetProps = {
      target: linkTarget,
      rel: linkTarget === '_blank' ? 'noopener' : '',
      'data-component': useText(dataComponentAttribute) || 'Button',
    };

    const anchorProps = {
      ...targetProps,
      href: getExternalHref({
        disabled,
        linkToExternal,
        linkToExternalVariable,
      }),
      tabIndex: isDev ? -1 : undefined,
      type: isDev ? 'button' : type,
      endpoint:
        linkType === 'internal' && linkTo && linkTo.id ? linkTo : undefined,
      onClick: (event) => {
        event.stopPropagation();
        actionCallback();
      },
    };

    const linkProps = {
      ...targetProps,
      href: getInternalHref({ linkTo, linkToInternalVariable, disabled }),
      component: hasInteralLink && !disabled ? B.Link : undefined,
      endpoint: hasInteralLink && !disabled ? linkTo : undefined,
    };

    const ButtonContent = (
      <div
        className={[classes.root, disabled ? classes.disabled : ''].join(' ')}
      >
        <span className={classes.innerRoot}>
          &#8203;
          {icon !== 'None' && iconPosition === 'start' && (
            <span
              style={{
                marginRight: buttonContent ? '5px' : 0,
                display: 'flex',
              }}
            >
              <Icon name={icon} fontSize={size} />
            </span>
          )}
          {buttonContent !== '' ? buttonContent : emptySpace}
          {icon !== 'None' && iconPosition === 'end' && (
            <span
              style={{
                marginLeft: buttonContent ? '5px' : 0,
                display: 'flex',
              }}
            >
              <Icon name={icon} fontSize={size} />
            </span>
          )}
          {showIndicator && (
            <CircularProgress size={16} className={classes.loader} />
          )}
        </span>
      </div>
    );

    const handleClick = (e) => {
      e.stopPropagation();
    };

    const LinkComponent =
      linkType === 'internal' ? (
        <Link
          className={classes.linkComponent}
          {...linkProps}
          underline="none"
          onClick={handleClick}
        >
          {ButtonContent}
        </Link>
      ) : (
        <a
          className={classes.linkComponent}
          {...anchorProps}
          onClick={handleClick}
          onKeyUp={handleClick}
          role="button"
          tabIndex="0"
        >
          {ButtonContent}
        </a>
      );

    const ButtonElement = (
      <button type="button" className={classes.button} {...buttonProps}>
        {ButtonContent}
      </button>
    );

    const ButtonComponent =
      type === 'submit' || isAction ? ButtonElement : LinkComponent;

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
      <div style={{ width: 'fit-content' }}>
        <Tooltip {...tooltipProps}>
          <div>{ButtonComponent}</div>
        </Tooltip>
      </div>
    );
    const Button = addTooltip ? ButtonWithTooltip : ButtonComponent;

    if (!isDev) {
      if (!isVisible) {
        return <></>;
      }
      return Button;
    }

    return <div className={classes.wrapper}>{Button}</div>;
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const newStyling = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : newStyling.getSpacing(idx, device);
    return {
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'flex' : 'inline-block',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      linkComponent: {
        '&, &.MuiTypography-root': {
          textDecoration: 'none',
          display: ({ options: { fullWidth } }) =>
            fullWidth ? 'inline-flex' : 'inline-block',
          width: ({ options: { fullWidth, outerSpacing } }) =>
            !fullWidth
              ? 'auto'
              : `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
                  outerSpacing[3],
                )})`,
          marginTop: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[0]),
          marginRight: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[1]),
          marginBottom: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[2]),
          marginLeft: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[3]),
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
      button: {
        border: 'none',
        background: 'transparent',
        padding: 0,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
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
      root: ({ style }) => ({
        ...style,
        boxSizing: 'border-box',
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover': {
          filter: 'brightness(90%)',
        },
        '&:active, &:focus': {
          filter: 'brightness(85%)',
          outline: 'none',
        },
      }),
      innerRoot: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '1.25rem',
      },
      disabled: {
        opacity: '50%',
        boxShadow: 'none',
        filter: 'grayscale(100%)',
        pointerEvents: 'none',
      },
      loader: {
        color: 'inherit!important',
        marginLeft: '0.25rem',
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
      tooltip: {
        backgroundColor: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
        color: ({ options: { tooltipText } }) => [
          newStyling.getColor(tooltipText),
          '!important',
        ],
      },
      arrow: {
        color: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
      },
    };
  },
}))();
