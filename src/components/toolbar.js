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
      <Link endpoint={endpoint}>{logoComponent}</Link>
    ) : (
      logoComponent
    );

    const titleWithLink = <Link endpoint={endpoint}>{title}</Link>;

    const toolbar = (
      <Toolbar>
        {options.logo.length > 0 && logoWithLink}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        />
        <Typography variant="h6" noWrap className={classes.title}>
          {endpoint.id ? titleWithLink : title}
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
    },
  }),
}))();
