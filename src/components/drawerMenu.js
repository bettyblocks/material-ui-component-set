(() => ({
  name: 'DrawerMenu',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { Drawer } = window.MaterialUI.Core;

    const isEmpty = children.length === 0;
    const isPristine = isEmpty && env === 'dev';
    const { visibility, anchorOrigin } = options;

    const [isOpen, setIsOpen] = useState(visibility);

    const closeMenu = () => setIsOpen(false);
    const openMenu = () => setIsOpen(true);
    const toggleMenu = () => setIsOpen(s => !s);

    B.defineFunction('Show', openMenu);
    B.defineFunction('Hide', closeMenu);
    B.defineFunction('Show/Hide', () => setIsOpen(s => !s));

    const isDev = env === 'dev';

    const DevAnchor = () => {
      switch (anchorOrigin) {
        case 'top':
          return classes.drawerPositionTop;
        case 'bottom':
          return classes.drawerPositionBottom;
        case 'left':
          return classes.drawerPositionLeft;
        case 'right':
          return classes.drawerPositionRight;
      }
    };

    useEffect(() => {
      setIsOpen(visibility);
    }, [visibility]);

    const DevMenu = (
      <div
        className={[
          DevAnchor(),
          anchorOrigin == 'left' || anchorOrigin == 'right'
            ? classes.paperVert
            : classes.paper,
          isEmpty ? classes.empty : '',
        ].join(' ')}
      >
        {!isEmpty ? children : 'Menu Content'}
      </div>
    );

    const ProdMenu = (
      <Drawer
        open={isOpen}
        anchor={anchorOrigin}
        onClose={toggleMenu}
        ModalProps={{ keepMounted: true }}
        classes={
          anchorOrigin == 'left' || anchorOrigin == 'right'
            ? { paper: classes.paperVert }
            : { paper: classes.paper }
        }
      >
        {!isEmpty ? children : 'Menu Content'}
      </Drawer>
    );

    return isDev ? (
      <div className={isOpen ? classes.overlay : classes.root}>
        {isOpen ? DevMenu : 'Menu'}
      </div>
    ) : (
      ProdMenu
    );
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      minHeight: '2rem',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
    },
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      top: '0.25rem',
      left: '0.25rem',
      bottom: '0.25rem',
      right: '0.25rem',
      zIndex: 2,
      boxSizing: 'border-box',
    },
    empty: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
    drawerPositionRight: {
      top: '4px',
      right: '0px',
      bottom: '4px',
      height: 'auto',
      maxHeight: '100%',
    },
    drawerPositionLeft: {
      inset: '0px 0px 7px 335px',
      height: 'auto',
      maxHeight: '100%',
    },
    drawerPositionBottom: {
      bottom: '0px',
      right: '0px',
      left: '335px',
      height: 'auto',
      maxHeight: '100%',
    },
    drawerPositionTop: {
      top: '0px',
      right: '0px',
      left: '335px',
      height: 'auto',
      maxHeight: '100%',
    },
    paperVert: {
      flex: '1 0 auto',
      display: 'flex',
      minHeight: '2rem',
      width: ({ options: { width } }) => width,
      outline: 0,
      zIndex: 1200,
      position: 'fixed',
      overflowY: 'auto',
      flexDirection: 'column',
      boxShadow:
        '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
      color: 'rgba(0, 0, 0, 0.87)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: ({ options: { backgroundColor } }) => backgroundColor,
    },
    paper: {
      flex: '1 0 auto',
      display: 'flex',
      minHeight: '2rem',
      outline: 0,
      zIndex: 1200,
      position: 'fixed',
      overflowY: 'auto',
      flexDirection: 'column',
      boxShadow:
        '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
      color: 'rgba(0, 0, 0, 0.87)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: ({ options: { backgroundColor } }) => backgroundColor,
    },
    fullScreen: {
      width: '100%',
      height: '100%',
    },
    windowed: {
      borderRadius: '0.25rem',
      width: ({ options: { width } }) => Math.max(444),
      margin: '1rem',
      maxHeight: 'calc(100% - 4rem);',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
