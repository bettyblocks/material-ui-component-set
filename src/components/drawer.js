(() => ({
  name: 'Drawer',
  type: 'ROW',
  allowedTypes: ['CONTAINER'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Children } = B;
    const { useMediaQuery, useTheme } = window.MaterialUI.Core;
    const theme = useTheme();
    // TODO - this will probably have to change
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const [isOpen, setIsOpen] = useState(true);

    const closeDrawer = () => setIsOpen(false);
    const openDrawer = () => setIsOpen(true);
    const toggleDrawer = () => setIsOpen(s => !s);

    return (
      <div className={classes.root}>
        <Children
          isLargeScreen={isLargeScreen}
          isOpen={isOpen}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          toggleDrawer={toggleDrawer}
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
