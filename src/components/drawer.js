(() => ({
  name: 'Drawer',
  type: 'BODY_COMPONENT',
  allowedTypes: ['DRAWER_SIDEBAR', 'DRAWER_CONTAINER'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Children, env, useText } = B;
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && env === 'dev';
    const {
      drawerWidth,
      drawerType,
      persistentAnchor,
      temporaryAnchor,
      breakpoint,
      visibility,
      runTimeVisibility,
      dataComponentAttribute,
    } = options;

    const isTemporary = drawerType === 'temporary';
    const anchor = isTemporary ? temporaryAnchor : persistentAnchor;

    // Because custom boolean option returns false as a string, do an additonal check
    const componentVisibility =
      env === 'dev' ? visibility : runTimeVisibility !== 'false';

    const [isOpen, setIsOpen] = useState(componentVisibility);

    const closeDrawer = () => setIsOpen(false);
    const openDrawer = () => setIsOpen(true);
    const toggleDrawer = () => setIsOpen((s) => !s);

    useEffect(() => {
      setIsOpen(componentVisibility);
    }, [componentVisibility]);

    return (
      <div
        className={includeStyling(
          [
            classes.root,
            isEmpty ? classes.empty : '',
            isPristine ? classes.pristine : '',
          ].join(' '),
        )}
        data-component={useText(dataComponentAttribute) || 'Drawer'}
      >
        {isPristine ? (
          'Drawer'
        ) : (
          <Children
            isOpen={isOpen}
            anchor={anchor}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            toggleDrawer={toggleDrawer}
            drawerWidth={drawerWidth}
            drawerType={drawerType}
            isTemporary={isTemporary}
            isPersistent={drawerType === 'persistent'}
            breakpoint={breakpoint}
          >
            {children}
          </Children>
        )}
      </div>
    );
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      height: '100%',
      flex: 1,
      position: 'relative',
      flexDirection: ({ options }) => {
        const { drawerType, persistentAnchor, temporaryAnchor } = options;
        const anchor =
          drawerType === 'temporary' ? temporaryAnchor : persistentAnchor;
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
    empty: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
