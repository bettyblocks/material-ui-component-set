(() => ({
  name: 'DrawerSidebar',
  type: 'DRAWER_SIDEBAR',
  allowedTypes: [
    'BODY_COMPONENT',
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Hidden, Drawer, useMediaQuery, useTheme } = window.MaterialUI.Core;
    const {
      isOpen,
      toggleDrawer,
      openDrawer,
      closeDrawer,
      anchor,
      isTemporary,
      isPersistent,
      breakpoint,
    } = parent;
    const { defineFunction = () => {}, env } = B;

    const isEmpty = children.length === 0;
    const isDev = env === 'dev';
    const isPristine = isEmpty && isDev;
    const aboveBreakpoint = useMediaQuery(
      useTheme().breakpoints.up(breakpoint),
    );
    const activeTemporary = isTemporary || (isPersistent && !aboveBreakpoint);

    defineFunction('Show', openDrawer);
    defineFunction('Hide', closeDrawer);
    defineFunction('Show/Hide', toggleDrawer);

    const TempDrawer = (
      <Drawer
        variant={activeTemporary ? 'temporary' : 'persistent'}
        open={isOpen}
        anchor={anchor}
        onClose={toggleDrawer}
        classes={{ paper: classes.paper }}
        ModalProps={{ keepMounted: true }}
      >
        {children}
      </Drawer>
    );

    if (!isDev && isTemporary) return TempDrawer;

    const DrawerComponent = (
      <div className={classes.wrapper}>
        <Hidden
          smUp={breakpoint === 'sm'}
          mdUp={breakpoint === 'md'}
          lgUp={breakpoint === 'lg'}
        >
          {TempDrawer}
        </Hidden>
        <Hidden xsDown>
          <Drawer
            variant={activeTemporary ? 'temporary' : 'persistent'}
            open={isOpen}
            anchor={anchor}
            classes={{ paper: classes.paper }}
          >
            {children}
          </Drawer>
        </Hidden>
      </div>
    );

    if (!isDev) return DrawerComponent;

    if (!isOpen) return <div />;

    return (
      <div
        className={[isTemporary && classes.overlay, classes.wrapper].join(' ')}
      >
        {!isEmpty ? (
          <Drawer
            variant="persistent"
            open
            anchor={anchor}
            className={classes.drawerDev}
            classes={{
              paper: [classes.paper, classes.paperDev],
            }}
          >
            {children}
          </Drawer>
        ) : (
          <div
            className={[
              classes.drawerDev,
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            Drawer Sidebar
          </div>
        )}
      </div>
    );
  })(),
  styles: B => t => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const staticPositioning =
      env === 'dev'
        ? { position: 'static !important', zIndex: '0 !important' }
        : {};

    const computeWidth = ({ parent }) => {
      const { anchor, drawerWidth } = parent;
      return ['left', 'right'].includes(anchor) ? drawerWidth : '100%';
    };

    return {
      wrapper: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
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
      paper: {
        ...staticPositioning,
        top: ['unset', '!important'],
        left: ['unset', '!important'],
        width: computeWidth,
        '&.MuiPaper-root': {
          boxSizing: 'border-box',
          backgroundColor: ({ options: { themeBgColor } }) => [
            style.getColor(themeBgColor),
            '!important',
          ],
        },
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      drawerDev: {
        display: 'flex',
        height: '100vh',
        overflowY: 'hidden',
        width: computeWidth,
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
      },
      paperDev: {
        width: computeWidth,
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
        color: 'blue !important',
        backgroundColor: ({ options: { themeBgColor } }) => [
          style.getColor(themeBgColor),
          '!important',
        ],
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: computeWidth,
        height: ({ parent: { anchor } }) =>
          ['top', 'bottom'].includes(anchor) ? '20%' : '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5 !important',
      },
      overlay: {
        display: 'flex',
        justifyContent: ({ parent: { anchor } }) =>
          anchor === 'right' ? 'flex-end' : 'flex-start',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: 2,
      },
    };
  },
}))();
