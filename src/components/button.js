(() => ({
  name: 'Button',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['INPUT_VARIABLE'],
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
      type = 'submit',
      visible,
      actionId,
      buttonText,
    } = options;

    const { env, useText } = B;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const isIcon = variant === 'icon';
    const buttonContent = useText(buttonText);

    const formRef = React.createRef();

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
      ].join(' '),
      type: isDev ? 'button' : type,
    };

    function ButtonComponent() {
      return (
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
              })
            : buttonContent}
        </Button>
      );
    }

    const Loader = <CircularProgress size={16} className={classes.loader} />;

    function ButtonComponentAction() {
      return (
        <B.Action actionId={actionId}>
          {(runAction, { loading, error, data }) => (
            <form
              className={classes.form}
              onSubmit={event => {
                event.preventDefault();
                const formData = new FormData(formRef.current);
                const entries = Array.from(formData);
                const values = entries.reduce((acc, currentvalue) => {
                  const key = currentvalue[0];
                  const value = currentvalue[1];
                  if (acc[key]) {
                    acc[key] = `${acc[key]},${value}`;
                    return acc;
                  }
                  return { ...acc, [key]: value };
                }, {});

                runAction({
                  variables: { input: values },
                });
              }}
              ref={formRef}
            >
              {isIcon ? (
                <IconButton {...iconButtonProps}>
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
                <Button {...buttonProps}>
                  {buttonContent}
                  {loading && Loader}
                </Button>
              )}
              <div
                id="vars"
                className={[!isDev ? classes.hide : classes.vars].join(' ')}
              >
                {children}
              </div>
            </form>
          )}
        </B.Action>
      );
    }

    if (isAction) {
      return <div>{ButtonComponentAction()}</div>;
    }

    return isDev ? (
      <div className={classes.wrapper}>{ButtonComponent()}</div>
    ) : (
      ButtonComponent()
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
        display: 'none !important',
      },
      vars: {
        display: 'flex',
      },
    };
  },
}))();
