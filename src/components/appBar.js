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

          <div class="menuItems">{children}</div>

        </Toolbar>
      </AppBar>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        '& .menuItems': {
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
          paddingLeft: '24px',
        },
        // Fix voor shadow:
        // ul.MuiList-root.MuiMenu-list:after{ content: ""; background: #fff; width: 100%; height: 100vh;}
        '& .responsiveItems.uncollapsed': {
          margin: ({ options: { alignItems } }) => {
            if(alignItems === 'right') return  0;
            if(alignItems === 'left') return "0 auto 0 0";

            return "auto";
          }
        },
        '&.MuiMenu-paper .fixedItems': {
            display: 'none',
        },
        '&.MuiMenu-paper .responsiveItems.uncollapsed': {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        '& .uncollapsed': {
          display: 'none',
          [`@media ${B.mediaMinWidth(768)}`]: {
            display: 'flex',
          },
        },
        '&.MuiPaper-root.MuiMenu-paper': {
          left: '0 !important',
           marginTop: ({ options: { toolbarVariant } }) => [
             toolbarVariant === 'dense' ? '34px' : '64px',
             '!important',
           ],
          //  height: ({ options: { toolbarVariant } }) =>
          //    `calc(100vh - ${toolbarVariant === 'dense' ? '50px' : '80px'})`,
           height: 'auto',
           transform: 'none !important',
           maxHeight: 'none',
           width: '100%',
           maxWidth: 'none',
           borderTop: '1px solid #ddd',
          //  boxShadow: '0 50px 0 0 #fff, 0 100px 0 0 #fff, 0 150px 0 0 #fff, 0 200px 0 0 #fff, 0 250px 0 0 #fff, 0 300px 0 0 #fff, 0 350px 0 0 #fff, 0 400px 0 0 #fff, 0 450px 0 0 #fff, 0 450px 0 0 #fff, 0 500px 0 0 #fff, 0 550px 0 0 #fff, 0 600px 0 0 #fff, 0 650px 0 0 #fff, 0 700px 0 0 #fff, 0 750px 0 0 #fff, 0 800px 0 0 #fff, 0 850px 0 0 #fff, 0 900px 0 0 #fff, 0 950px 0 0 #fff, 0 1000px 0 0 #fff;',
        },
        // SEBAS REVIEW
        '&.MuiList-root.MuiMenu-list': {
          '&:after': {
            content: "",
            background: "#f00",
            width: "100%",
            height: "100vh",
          },
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
      menuButton: {
        marginLeft: style.getSpacing('M'),
        marginRight: style.getSpacing('M'),
      },
      title: {
        textDecoration: 'none',
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
