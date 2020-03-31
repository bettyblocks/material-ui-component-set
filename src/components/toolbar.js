(() => ({
  name: 'Toolbar',
  type: 'TOOLBAR',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Toolbar, IconButton, Typography } = window.MaterialUI.Core;
    const { title, logo, endpoint } = options;
    const { Link } = B;

    const logoComponent = <img src={logo} width="100" alt="" />;
    const logoWithLink = endpoint.id ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link endpoint={endpoint}>{logoComponent}</Link>
    ) : (
      logoComponent
    );

    const toolbar = (
      <Toolbar>
        {options.logo.length > 0 && logoWithLink}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        />
        <Typography
          variant="h6"
          noWrap
          className={classes.title}
          component={endpoint.id && Link}
          endpoint={endpoint.id && endpoint}
        >
          {title}
        </Typography>
        {children}
      </Toolbar>
    );

    const isDev = B.env === 'dev';
    return isDev ? <div>{toolbar}</div> : toolbar;
  })(),
  styles: () => () => ({
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: '#fff',
      textDecoration: 'none',
    },
  }),
}))();
