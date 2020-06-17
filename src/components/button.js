(() => ({
  name: 'Button',
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
      isBtnShadow,
      isNoPadding,
      isNoMinWidth,
    } = options;

    const { env, useText } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const isIcon = variant === 'icon';
    const buttonContent = useText(buttonText);

    const generalProps = {
      disabled,
      size,
      tabindex: isDev && -1,
      href:
        linkType === 'external' && hasExternalLink ? linkToExternal : undefined,
      component: linkType === 'internal' && hasLink ? B.Link : undefined,
      endpoint: linkType === 'internal' && hasLink ? linkTo : undefined,
    };

    const iconButtonProps = {
      ...generalProps,
      classes: { root: classes.root },
      classname: visible || isDev ? '' : classes.hide,

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
      className: [
        visible || isDev ? '' : classes.hide,
        buttonContent ? '' : classes.empty,
        isBtnShadow ? '' : 'MuiButton-flat',
        isNoPadding ? 'noPadding' : '',
        isNoMinWidth ? 'noMinWidth' : '',
      ].join(' '),
      type: isDev ? 'button' : type,
    };

    let ButtonComponent = (
      <Button
        {...buttonProps}
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
      >
        {isIcon
          ? React.createElement(Icons[icon === 'None' ? 'Error' : icon], {
              fontSize: size,
              padding: '6px 10px',
            })
          : buttonContent}
      </Button>
    );

    const Loader = <CircularProgress size={16} className={classes.loader} />;

    if (isAction) {
      ButtonComponent = (
        <B.Action actionId={actionId}>
          {(callAction, { loading }) => {
            const onClickAction = event => {
              event.preventDefault();
              if (!isDev && !loading && linkType === 'action') callAction();
            };
            const actionClickHandler = isAction && { onClick: onClickAction };
            return isIcon ? (
              <IconButton {...iconButtonProps} {...actionClickHandler}>
                {loading
                  ? Loader
                  : React.createElement(
                      Icons[icon === 'None' ? 'Error' : icon],
                      {
                        fontSize: size,
                      },
                    )}
              </IconButton>
            ) : (
              <Button {...buttonProps} {...actionClickHandler}>
                {buttonContent}
                {loading && Loader}
              </Button>
            );
          }}
        </B.Action>
      );
    }

    return isDev ? (
      <div className={classes.wrapper}>{ButtonComponent}</div>
    ) : (
      ButtonComponent
    );
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
        // Text transforms upon the button
        '& .MuiButton-label': {
          textTransform: ({options: {textTransform}}) => textTransform,
        },
        // Give contained buttons a shadow?
        // MuiButton-flat is new (box shadow = standard)
        '&.MuiButton-root.MuiButton-flat': {
          boxShadow: 'none',
        },
        // MuiButton forms (rounded corners = standard)
        '&.MuiButton-root.MuiButton-pill': {
          borderRadus: '50px',
        },
        '&.MuiButton-root.MuiButton-square': {
          borderRadus: '0px',
        },
        // Underneath already exists
        '&.MuiButton-root.noPadding': {
          padding: 0,
        },
        '&.MuiButton-root.noMinWidth': {
          minWidth: 0,
        },
        '&.MuiButton-root, &.MuiIconButton-root': {
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

          [`@media ${B.mediaMinWidth(768)}`]: {
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
          [`@media ${B.mediaMinWidth(1024)}`]: {
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
          [`@media ${B.mediaMinWidth(1200)}`]: {
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
      hide: {
        display: 'none',
      },
    };
  },
}))();
