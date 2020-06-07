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

    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const aboveBreakpoint = useMediaQuery(
      useTheme().breakpoints.up(breakpoint),
    );
    const activeTemporary = isTemporary || (isPersistent && !aboveBreakpoint);

    useEffect(() => {
      B.defineFunction('OpenDrawer', openDrawer);
      B.defineFunction('CloseDrawer', closeDrawer);
      B.defineFunction('ToggleDrawer', toggleDrawer);
    }, []);

    const tempDrawer = (
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

    if (!isDev && isTemporary) return tempDrawer;

    const DrawerComponent = (
      <>
        <Hidden
          smUp={breakpoint === 'sm'}
          mdUp={breakpoint === 'md'}
          lgUp={breakpoint === 'lg'}
        >
          {tempDrawer}
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
      </>
    );

    if (!isDev) return DrawerComponent;

    if (!isOpen) return <div />;

    return (
      <div className={isTemporary && classes.overlay}>
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
    const style = new B.Styling(t);
    const staticPositioning =
      B.env === 'dev'
        ? { position: 'static !important', zIndex: '0 !important' }
        : {};

    const computeWidth = ({ parent }) => {
      const { anchor, drawerWidth } = parent;
      return ['left', 'right'].includes(anchor) ? drawerWidth : '100%';
    };

    return {
      paper: {
        ...staticPositioning,
        width: computeWidth,
        '&.MuiPaper-root': {
          backgroundColor: ({ options: { themeBgColor, bgColorOverwrite } }) =>
            bgColorOverwrite
              ? `${bgColorOverwrite} !important`
              : [style.getColor(themeBgColor), '!important'],
        },
      },
      drawerDev: {
        display: 'flex',
        height: '100%',
        width: computeWidth,
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
      },
      paperDev: {
        width: computeWidth,
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
        color: 'blue !important',
        backgroundColor: ({ options: { themeBgColor, bgColorOverwrite } }) =>
          bgColorOverwrite
            ? `${bgColorOverwrite} !important`
            : [style.getColor(themeBgColor), '!important'],
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
