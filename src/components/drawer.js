(() => ({
  name: 'Drawer',
  type: 'ROW',
  allowedTypes: ['CONTAINER'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Children } = B;
    const { useMediaQuery, useTheme } = window.MaterialUI.Core;
    // TODO - this will probably have to change
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const { anchor, isResponsive, drawerWidth } = options;

    const [isOpen, setIsOpen] = useState(isResponsive);

    const closeDrawer = () => setIsOpen(false);
    const openDrawer = () => setIsOpen(true);
    const toggleDrawer = () => setIsOpen(s => !s);

    useEffect(() => {
      setIsOpen(isResponsive);
    }, [isResponsive]);

    return (
      <div className={classes.root}>
        <Children
          isLargeScreen={isLargeScreen}
          isResponsive={isResponsive}
          isOpen={isOpen}
          anchor={anchor}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
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
    },
  }),
}))();
