(() => ({
  name: 'DrawerBar',
  type: 'LAYOUT_COMPONENT',
  allowedTypes: [
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Drawer } = window.MaterialUI.Core;
    // this will probably have to change
    const {
      isLargeScreen,
      isOpen,
      toggleDrawer,
      openDrawer,
      closeDrawer,
      anchor,
      isTemporary,
      isPermanent,
      isResponsive,
    } = parent;

    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const container = window !== undefined ? window.document.body : undefined;

    useEffect(() => {
      B.defineFunction('OpenDrawer', openDrawer);
      B.defineFunction('CloseDrawer', closeDrawer);
      B.defineFunction('ToggleDrawer', toggleDrawer);
    }, []);

    const openState = isPermanent || isOpen;
    let DrawerComponent = (
      <Drawer
        variant="persistent"
        open={openState}
        anchor={anchor}
        className={classes.drawer}
        classes={{ paper: classes.paper }}
      >
        {children}
      </Drawer>
    );

    if ((isResponsive && !isLargeScreen) || isTemporary) {
      DrawerComponent = (
        <Drawer
          container={container}
          variant="temporary"
          open={isOpen}
          anchor={anchor}
          onClose={toggleDrawer}
          classes={{ paper: classes.paper }}
          className={classes.drawer}
          ModalProps={{ keepMounted: true }}
        >
          {children}
        </Drawer>
      );
    }

    if (!isDev) return DrawerComponent;

    if ((isTemporary || isResponsive) && !isOpen) return <div />;

    return (
      <div className={isTemporary && classes.overlay}>
        <div className={isPristine ? classes.pristine : classes.dirty}>
          {!isEmpty ? (
            <Drawer
              variant="persistent"
              open
              anchor={anchor}
              className={[classes.drawer, !isEmpty && classes.dirtyDrawer]}
              classes={{
                paper: [classes.paper, !isEmpty && classes.dirtyPaper],
              }}
            >
              {children}
            </Drawer>
          ) : (
            'Drawer content here.'
          )}
        </div>
      </div>
    );
  })(),
  styles: B => () => {
    const staticPositioning =
      B.env === 'dev'
        ? { position: 'static !important', zIndex: '0 !important' }
        : {};

    const computeWidth = ({ parent }) => {
      const { anchor, drawerWidth } = parent;
      return ['left', 'right'].includes(anchor) ? drawerWidth : '100%';
    };

    return {
      drawer: {
        height: '100%',
      },
      dirtyDrawer: {
        display: 'flex',
      },
      dirtyPaper: {
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
      },
      paper: {
        ...staticPositioning,
        width: computeWidth,
      },
      pristine: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: ({ parent: { anchor } }) =>
          anchor === 'bottom' ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5 !important',
        width: computeWidth,
        height: ({ parent: { anchor } }) =>
          ['top', 'bottom'].includes(anchor) ? '20%' : '100%',
      },
      dirty: {
        width: computeWidth,
        height: '100%',
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
