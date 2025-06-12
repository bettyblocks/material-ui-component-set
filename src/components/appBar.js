(() => ({
  name: 'AppBar',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } =
      window.MaterialUI.Core;
    const {
      position,
      title,
      logoSource,
      urlFileSource,
      endpoint,
      type,
      appBarVariant,
      toolbarVariant,
      square,
      elevation,
      dataComponentAttribute,
    } = options;
    const { Link, Icon, env, useText, usePublicFile } = B;
    const isDev = env === 'dev';
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = !!anchorEl;
    const titleText = useText(title);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const { url: logoUrl = '', name: alt = '' } =
      usePublicFile(logoSource) || {};
    const LogoCmp = logoUrl !== '' && (
      <img src={logoUrl} className={classes.logo} alt={alt} />
    );
    const logo = useText(urlFileSource);
    const LogoComp = logo && <img src={logo} className={classes.logo} alt="" />;

    const LogoComponent =
      type === 'img' && endpoint.id ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link endpoint={endpoint}>{LogoCmp}</Link>
      ) : (
        LogoCmp
      );
    const LogoComponentUrl =
      type === 'url' && endpoint.id ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link endpoint={endpoint}>{LogoComp}</Link>
      ) : (
        LogoComp
      );

    function getLogo() {
      switch (true) {
        case type === 'img':
          return LogoComponent;
        case type === 'url':
          return LogoComponentUrl;
        default:
          return '';
      }
    }

    const initialLogo = getLogo();

    const AppBarComponent = (
      <AppBar
        position={isDev ? 'static' : position}
        classes={{ root: classes.root }}
        className={includeStyling()}
        variant={appBarVariant}
        square={square}
        elevation={appBarVariant === 'flat' ? 0 : elevation}
        data-component={useText(dataComponentAttribute) || 'AppBar'}
      >
        <Toolbar variant={toolbarVariant} classes={{ root: classes.toolbar }}>
          {initialLogo}
          <Typography
            noWrap
            className={classes.title}
            component={endpoint.id && Link}
            endpoint={endpoint.id && endpoint}
          >
            {titleText}
          </Typography>
          <div className={classes.spacer} />
          {!isDev && !!children.length ? (
            <>
              <div className={classes.collapsed}>
                <IconButton color="inherit" onClick={handleMenu}>
                  <Icon name="Menu" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  keepMounted
                  onClose={handleClose}
                  classes={{ paper: classes.paper }}
                >
                  {React.Children.map(children, (child) => (
                    <MenuItem
                      className={classes.menuItem}
                      onTouchEnd={handleClose}
                    >
                      {child}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div className={classes.uncollapsed}>{children}</div>
            </>
          ) : (
            <div>{children}</div>
          )}
        </Toolbar>
      </AppBar>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        height: ({ options: { height } }) => height,
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        '& $title': {
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),
          fontSize: ({ options: { font } }) => style.getFontSize(font),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Desktop'),
          },
        },
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
        zIndex: '1201 !important',
      },
      paper: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'none',
        },
      },
      logo: {
        width: ({ options: { logoWidth } }) => logoWidth,
      },
      toolbar: {
        flexDirection: ({ options: { alignItems } }) =>
          alignItems === 'right' ? 'row' : 'row-reverse',
      },
      menuButton: {
        marginLeft: style.getSpacing('M'),
        marginRight: style.getSpacing('M'),
      },

      title: {
        textDecoration: 'none',
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
      spacer: {
        flexGrow: 1,
      },
      menuItem: {
        '& .MuiButtonBase-root > .MuiTouchRipple-root': {
          display: 'none !important',
        },
      },
      collapsed: {
        display: 'block',
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'none',
        },
      },
      uncollapsed: {
        display: 'none',
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'block',
        },
      },
    };
  },
}))();
