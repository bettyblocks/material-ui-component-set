(() => ({
  name: 'AppBar',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      AppBar,
      Toolbar,
      IconButton,
      Typography,
      Menu,
    } = window.MaterialUI.Core;
    const { Menu: MenuIcon } = window.MaterialUI.Icons;
    const {
      position,
      title,
      logoSource,
      endpoint,
      appBarVariant,
      toolbarVariant,
      square,
      elevation,
    } = options;
    const { Link, env, useText } = B;
    const isDev = env === 'dev';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = !!anchorEl;
    const elevationLevel = appBarVariant === 'flat' ? 0 : elevation;

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logo = useText(logoSource);
    const LogoCmp = logo && (
      <img src={logo} width="100" alt="" className={classes.logo} />
    );
    const LogoComponent = endpoint.id ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link endpoint={endpoint}>{LogoCmp}</Link>
    ) : (
      LogoCmp
    );

    const AppBarComponent = (
      <AppBar
        position={isDev ? 'static' : position}
        classes={{ root: classes.root }}
        variant={appBarVariant}
        square={square}
        elevation={elevationLevel}
      >
        <Toolbar variant={toolbarVariant} classes={{ root: classes.toolbar }}>
          {classes.collapsed && (
            <>
              <div className={classes.collapsed}>
                <IconButton color="inherit" onClick={handleMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  keepMounted
                  onClose={handleClose}
                  classes={{ paper: classes.root, list: classes.list }}
                >
                  {children}
                </Menu>
              </div>
            </>
          )}
          {logo.length > 0 && LogoComponent}
          <Typography
            variant="h6"
            noWrap
            className={classes.title}
            component={endpoint.id && Link}
            endpoint={endpoint.id && endpoint}
          >
            {title}
          </Typography>
          <div className={classes.spacer} />
          {classes.uncollapsed && (
            <>
              <div className={classes.uncollapsed}>{children}</div>
            </>
          )}
        </Toolbar>
      </AppBar>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        '&.MuiPaper-root.MuiMenu-paper': {
          position: 'absolute !important',
          left: '0 !important',
          top: ({ options: { toolbarVariant } }) => [
            toolbarVariant === 'dense' ? '50px' : '80px',
            '!important',
          ],
          height: ({ options: { toolbarVariant } }) =>
            `calc(100vh - ${toolbarVariant === 'dense' ? '50px' : '80px'})`,
          transform: 'none !important',
          bottom: '0 !important',
          maxHeight: 'none',
          width: '100%',
          boxShadow: 'none',
          maxWidth: 'none',
          borderTop: '1px solid #ddd',
        },
        justifyContent: 'center',
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
        height: ({ options: { toolbarVariant } }) =>
          toolbarVariant === 'dense' ? '50px' : '80px',
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
      },
      spacer: {
        flexGrow: 1,
      },
      list: {
        '& > *': {
          display: 'block',
        },
        '&.MuiList-root.MuiMenu-list': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '0',
        },
        '&.MuiList-root.MuiMenu-list button': {
          [`@media ${B.mediaMinWidth(600)}`]: {
            padding: '16px 24px',
          },
          width: '100%',
          background: '#fff',
          justifyContent: 'flex-start',
          padding: '16px',
          borderBottom: '1px solid #ddd',
        },
      },
      collapsed: {
        display: 'block',
        marginLeft: '-12px',
        [`@media ${B.mediaMinWidth(768)}`]: {
          display: 'none',
        },
      },
      uncollapsed: {
        display: 'none',
        [`@media ${B.mediaMinWidth(768)}`]: {
          display: 'flex',
        },
      },
      logo: {
        maxHeight: ({options: {toolbarVariant}}) => 
          toolbarVariant === 'dense' ? '28px' : '40px',
        width: 'auto',
        maxWidth: '130px',
        marginRight: '16px',
      },
    };
  },
}))();
