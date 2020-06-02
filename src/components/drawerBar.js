(() => ({
  name: 'drawerBar',
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
      isLargeScreen,
      isOpen,
      toggleDrawer,
      openDrawer,
      closeDrawer,
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

    return (
      <div className={isPristine ? classes.pristine : ''}>
        {!isLargeScreen && (
          <div className={[isPristine ? classes.pristine : ''].join(' ')}>
            {isPristine ? 'Drawer Bar' : ''}
            <Drawer
              container={container}
              variant="temporary"
              open={isOpen}
              onClose={toggleDrawer}
              classes={{
                paper:
                  B.env === 'dev'
                    ? classes.devDrawerPaper
                    : classes.drawerPaper,
              }}
              ModalProps={{ keepMounted: true }}
            >
              {drawerContent}
            </Drawer>
          </div>
        )}

        {isLargeScreen && (
          <Drawer
            variant="persistent"
            open={isOpen}
            onClose={toggleDrawer}
            classes={{
              paper:
                B.env === 'dev' ? classes.devDrawerPaper : classes.drawerPaper,
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </div>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      devDrawerPaper: {
        position: 'static !important',
        width: 200, // TODO - adjust this to be dynamic
        backgroundColor: ({ options: { bgColor } }) => style.getColor(bgColor),
      },
      drawerPaper: {
        width: 200, // TODO - adjust this to be dynamic
        backgroundColor: ({ options: { bgColor } }) => style.getColor(bgColor),
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
