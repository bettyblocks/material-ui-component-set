(() => ({
  name: 'Drawer',
  type: 'BODY_COMPONENT',
  allowedTypes: [
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Children } = B;
    const { useMediaQuery, useTheme } = window.MaterialUI.Core;
    // TODO - this will probably have to change
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const {
      drawerWidth,
      drawerType,
      permanentAnchor,
      temporaryAnchor,
      editDrawer,
    } = options;
    const isTemporary = drawerType === 'temporary';
    const isPermanent = drawerType === 'permanent';
    const isResponsive = drawerType === 'responsive';

    const [isOpen, setIsOpen] = useState(editDrawer);

    let anchor = temporaryAnchor;
    if (!isTemporary) anchor = permanentAnchor;

    const closeDrawer = () => setIsOpen(false);
    const openDrawer = () => setIsOpen(true);
    const toggleDrawer = () => setIsOpen(s => !s);

    useEffect(() => {
      setIsOpen(editDrawer);
    }, [editDrawer]);

    return (
      <div className={classes.root}>
        <Children
          isLargeScreen={isLargeScreen}
          isOpen={isOpen}
          anchor={anchor}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
          drawerType={drawerType}
          isTemporary={isTemporary}
          isPermanent={isPermanent}
          isResponsive={isResponsive}
        >
          {children}
        </Children>
      </div>
    );
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      height: '100vh',
      position: 'relative',
      flexDirection: ({ options }) => {
        const { drawerType, permanentAnchor, temporaryAnchor } = options;
        let anchor = temporaryAnchor;
        if (drawerType !== 'temporary') anchor = permanentAnchor;
        switch (anchor) {
          case 'right':
            return 'row-reverse';
          case 'top':
            return 'column';
          case 'bottom':
            return 'column-reverse';
          default:
            return 'row';
        }
      },
    },
  }),
}))();
