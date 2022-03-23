(() => ({
  name: 'ActionJSButton',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { Tooltip } = window.MaterialUI.Core;
    const {
      actionId,
      property,
      addTooltip,
      buttonText,
      dataComponentAttribute,
      disabled,
      hasVisibleTooltip,
      icon,
      iconPosition,
      size,
      tooltipContent = [''],
      tooltipPlacement,
      type,
      visible,
    } = options;
    const { env, getProperty, useProperty, useActionJs, useText, Icon } = B;
    const isDev = env === 'dev';
    const buttonContent = useText(buttonText);
    const tooltipText = useText(tooltipContent);
    const [isVisible, setIsVisible] = useState(visible);
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip);
    const [, setOptions] = useOptions();
    const [isDisabled] = useState(disabled);

    const [callActionJs] = useActionJs(actionId);

    const prop = !isDev && property && getProperty(property);
    const propValue = !isDev && property && useProperty(property.id);

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

    const emptySpace = () => {
      if (icon === 'None') {
        return '\xA0';
      }
      return null;
    };

    const buttonProps = {
      disabled,
      tabIndex: isDev ? -1 : undefined,
      onClick: (event) => {
        event.stopPropagation();

        if (actionId) {
          callActionJs({
            ...(prop
              ? {
                  variables: {
                    input: {
                      [prop.name]: propValue,
                    },
                  },
                }
              : {}),
          });
        }
      },
      role: 'button',
      type: isDev ? 'button' : type,
      'data-component': useText(dataComponentAttribute) || 'Button',
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
        </span>
      </div>
    );

    const ButtonElement = (
      <button type="button" className={classes.button} {...buttonProps}>
        {ButtonContent}
      </button>
    );

    const ButtonComponent = type === 'submit' || ButtonElement;

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
      <Tooltip {...tooltipProps}>{ButtonComponent}</Tooltip>
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
