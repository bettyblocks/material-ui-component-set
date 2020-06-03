(() => ({
  name: 'DrawerBar',
  type: 'ROW',
  allowedTypes: [
    'BODY_COMPONENT',
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Drawer } = window.MaterialUI.Core;
    // this will probably have to change
    const {
      isResponsive,
      isLargeScreen,
      isOpen,
      toggleDrawer,
      openDrawer,
      closeDrawer,
      anchor,
    } = parent;

    const isEmpty = children.length === 0;
    const isPristine = isEmpty && B.env === 'dev';
    const container = window !== undefined ? window.document.body : undefined;

    useEffect(() => {
      B.defineFunction('OpenDrawer', openDrawer);
      B.defineFunction('CloseDrawer', closeDrawer);
      B.defineFunction('ToggleDrawer', toggleDrawer);
    }, []);

    const drawerContent = children.length ? children : 'Drawer content here.';
    const anchorValue = isResponsive ? 'left' : anchor;

    if (!isResponsive || !isLargeScreen) {
      return (
        <div className={isPristine ? classes.pristine : ''}>
          <Drawer
            container={container}
            variant="temporary"
            open={isOpen}
            anchor={anchorValue}
            onClose={toggleDrawer}
            classes={{ paper: classes.paper }}
            className={classes.drawer}
            ModalProps={{ keepMounted: true }}
          >
            {drawerContent}
          </Drawer>
        </div>
      );
    }

    return (
      <div className={isPristine ? classes.pristine : ''}>
        {isResponsive && isLargeScreen && (
          <Drawer
            variant="persistent"
            open
            className={classes.drawer}
            classes={{ paper: classes.paper }}
          >
            {drawerContent}
          </Drawer>
        )}
      </div>
    );
  })(),
  styles: B => () => {
    const staticPositioning =
      B.env === 'dev' ? { position: 'static !important' } : {};

    return {
      drawer: {
        height: '100%',
      },
      paper: {
        ...staticPositioning,
        width: ({ parent }) => {
          const { anchor, isResponsive, drawerWidth } = parent;
          return isResponsive || ['left', 'right'].includes(anchor)
            ? drawerWidth
            : '100%';
        },
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5 !important',
        textAlign: 'center',
        lineHeight: '100vh',
      },
    };
  },
}))();
