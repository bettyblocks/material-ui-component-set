(() => ({
  name: 'DrawerContainer',
  type: 'LAYOUT_COMPONENT',
  allowedTypes: [
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const { isOpen, isResponsive, isPermanent } = parent;
    const showDrawer = ((isResponsive && isOpen) || isPermanent) && !isDev;

    return (
      <div
        className={[
          classes.root,
          isPristine ? classes.pristine : '',
          showDrawer ? classes.rootShift : '',
        ].join(' ')}
      >
        {isPristine ? 'Drawer Container' : children}
      </div>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const isDev = B.env === 'dev';
    const { useTheme } = window.MaterialUI.Core;
    const theme = useTheme();

    return {
      root: {
        flexGrow: 1,
        backgroundColor: ({ options: { bgColor } }) => style.getColor(bgColor),
        boxSizing: 'border-box',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: ({ parent }) => {
          const { isPermanent, drawerWidth, anchor } = parent;
          return isPermanent && !isDev && anchor === 'left' ? drawerWidth : 0;
        },
        marginRight: ({ parent }) => {
          const { drawerWidth, anchor, isPermanent } = parent;
          return isPermanent && !isDev && anchor === 'right' ? drawerWidth : 0;
        },
      },
      rootShift: {
        [theme.breakpoints.up('sm')]: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: ({ parent }) => {
            const { isTemporary, drawerWidth, anchor } = parent;
            return !isTemporary && anchor === 'left' ? drawerWidth : 0;
          },
          marginRight: ({ parent }) => {
            const { isTemporary, drawerWidth, anchor } = parent;
            return !isTemporary && anchor === 'right' ? drawerWidth : 0;
          },
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
