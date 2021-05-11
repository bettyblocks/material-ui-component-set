(() => ({
  name: 'Menu',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['MENU_ITEM'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const {
      Button,
      Grow,
      IconButton,
      Popper,
      Paper,
      ClickAwayListener,
      MenuList,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;

    const {
      buttonText,
      disabled,
      fullWidth,
      icon,
      iconPosition,
      isMenuListVisible,
      placement,
      outerSpacing,
      size,
      type,
      variant,
    } = options;

    const { Children, env, useText } = B;
    const isDev = env === 'dev';
    const isIcon = variant === 'icon';
    const buttonContent = useText(buttonText);
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const paperRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const getDevPlacement = (anchorRef, menuRef, position) => {
      let top = 0;
      let left = 0;
      if (!anchorRef.current || !menuRef.current) {
        return { top, left };
      }

      const sideA = position.split('-')[0];
      const sideB = position.split('-')[1];

      const anchorBoundingRect = anchorRef.current.getBoundingClientRect();
      const menuBoundingRect = menuRef.current.getBoundingClientRect();
      const anchorStyles = getComputedStyle(anchorRef.current);
      const anchorMargins = {
        top: parseFloat(anchorStyles.marginTop),
        bottom: parseFloat(anchorStyles.marginBottom),
        left: parseFloat(anchorStyles.marginLeft),
        right: parseFloat(anchorStyles.marginRight),
      };

      if (sideA === 'top' || sideA === 'bottom') {
        if (sideA === 'top') {
          top =
            -menuBoundingRect.height -
            anchorBoundingRect.height -
            anchorMargins.top;
        } else {
          top = -anchorMargins.bottom;
        }
        left =
          anchorBoundingRect.width / 2 -
          menuBoundingRect.width / 2 +
          (anchorMargins.left + anchorMargins.right) / 2;
        if (sideB === 'end') {
          left =
            -menuBoundingRect.width +
            anchorBoundingRect.width +
            anchorMargins.left;
        } else if (sideB === 'start') {
          const { left: leftMargin } = anchorMargins;
          left = leftMargin;
        }
      }
      if (sideA === 'left' || sideA === 'right') {
        if (sideA === 'left') {
          left = -menuBoundingRect.width + anchorMargins.left;
        } else {
          left = anchorBoundingRect.width + anchorMargins.left;
        }
        top =
          -(anchorBoundingRect.height + menuBoundingRect.height) / 2 -
          anchorMargins.top;
        if (sideB === 'end') {
          top = -menuBoundingRect.height;
        } else if (sideB === 'start') {
          top = -anchorBoundingRect.height - anchorMargins.top;
        }
      }

      return { top, left };
    };

    useEffect(() => {
      if (isDev && anchorEl) {
        setIsOpen(true);
      }

      let ref = buttonRef.current;
      if (ref && ref.parentElement.classList.contains('MuiListItem-root')) {
        ref = ref.parentElement;
      }

      setAnchorEl(ref);
    }, []);

    useEffect(() => {
      if (isDev) {
        const { top, left } = getDevPlacement(buttonRef, paperRef, placement);
        setMenuPosition({ top, left });
      }
    }, [children, icon, isMenuListVisible, placement, outerSpacing, variant]);

    const generalProps = {
      disabled,
      size,
      tabindex: isDev && -1,
    };

    const iconButtonProps = {
      ...generalProps,
      classes: { root: classes.button },
    };

    const buttonProps = {
      ...generalProps,
      fullWidth,
      variant,
      classes: {
        root: classes.button,
        contained: classes.buttonContained,
        outlined: classes.buttonOutlined,
      },
      className: !!buttonContent && classes.empty,
      type: isDev ? 'button' : type,
    };
    const compProps = isIcon ? iconButtonProps : buttonProps;
    const ButtonComp = isIcon ? IconButton : Button;

    const handleToggle = () => {
      if (isDev) return;

      setIsOpen(prevOpen => !prevOpen);
    };

    const handleClose = e => {
      if (isDev || (anchorEl && anchorEl.contains(e.target))) {
        return;
      }

      setIsOpen(false);
    };

    const ButtonComponent = (
      <ButtonComp
        ref={buttonRef}
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
        onClick={handleToggle}
        onTouchEnd={e => e.stopPropagation()}
      >
        {isIcon &&
          React.createElement(Icons[icon === 'None' ? 'Error' : icon], {
            fontSize: size,
          })}
        {!isIcon && buttonContent}
      </ButtonComp>
    );

    const MenuComp = (
      <>
        {ButtonComponent}
        {!isDev ? (
          <Popper
            className={classes.popper}
            open={isOpen}
            anchorEl={anchorEl}
            role={undefined}
            disablePortal={false}
            placement={placement}
          >
            <Grow in={isOpen} style={{ transformOrigin: '0 0 0' }}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={isOpen}>
                    <Children onClick={handleClose}>{children}</Children>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          </Popper>
        ) : (
          isMenuListVisible && (
            <Paper
              ref={paperRef}
              className={classes.paper}
              style={{
                transform: `translate(${menuPosition.left}px, ${menuPosition.top}px)`,
                willChange: 'transform',
              }}
            >
              {children}
            </Paper>
          )
        )}
      </>
    );

    return !isDev ? (
      MenuComp
    ) : (
      <div className={classes.wrapper}>{MenuComp}</div>
    );
  })(),
  styles: B => t => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const isDev = env === 'dev';
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
      button: {
        color: ({ options: { background, disabled, textColor, variant } }) => [
          !disabled
            ? style.getColor(variant === 'icon' ? background : textColor)
            : 'rgba(0, 0, 0, 0.26)',
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
      buttonContained: {
        backgroundColor: ({ options: { background, disabled } }) => [
          !disabled ? style.getColor(background) : 'rgba(0, 0, 0, 0.12)',
          '!important',
        ],
      },
      buttonOutlined: {
        borderColor: ({ options: { background, disabled } }) => [
          !disabled ? style.getColor(background) : 'rgba(0, 0, 0, .12)',
          '!important',
        ],
      },
      popper: {
        zIndex: 3500,
      },
      paper: {
        minWidth: '5rem',
        minHeight: '2rem',
        backgroundColor: ({ options: { menuColor } }) => [
          style.getColor(menuColor),
          '!important',
        ],
        ...(isDev && {
          position: 'absolute',
          pointerEvents: ['unset', '!important'],
          zIndex: 9,
        }),
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
    };
  },
}))();
