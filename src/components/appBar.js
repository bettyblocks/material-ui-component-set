(() => ({
  name: 'AppBar',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
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

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logo = useText(logoSource);
    const LogoCmp = logo && <img src={logo} width="100" alt="" />;
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
        elevation={elevation}
      >
        <Toolbar variant={toolbarVariant} classes={{ root: classes.toolbar }}>
          {parent.showToggleIcon && (
            <IconButton color="inherit" onClick={parent.toggleDrawer}>
              <MenuIcon />
            </IconButton>
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
          {!isDev && !!children.length ? (
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
              <div className={classes.uncollapsed}>{children}</div>
            </>
          ) : (
            children
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
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
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
      },
      collapsed: {
        display: 'block',
        [`@media ${B.mediaMinWidth(768)}`]: {
          display: 'none',
        },
      },
      uncollapsed: {
        display: 'none',
        [`@media ${B.mediaMinWidth(768)}`]: {
          display: 'block',
        },
      },
    };
  },
}))();
