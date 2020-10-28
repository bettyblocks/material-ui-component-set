(() => ({
  name: 'DrawerContainer',
  type: 'DRAWER_CONTAINER',
  allowedTypes: [
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
    'BODY_COMPONENT',
  ],
  orientation: 'VERTICAL',
  jsx: (() => {
    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const { isOpen, isPersistent, breakpoint } = parent;
    const showDrawer = isPersistent && isOpen && !isDev;

    return (
      <div
        className={[
          classes.root,
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
          showDrawer && breakpoint === 'xs' ? classes.rootShiftxs : '',
          showDrawer && breakpoint === 'sm' ? classes.rootShiftsm : '',
          showDrawer && breakpoint === 'md' ? classes.rootShiftmd : '',
          showDrawer && breakpoint === 'lg' ? classes.rootShiftlg : '',
        ].join(' ')}
      >
        {isPristine ? 'Page content' : children}
      </div>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const { useTheme } = window.MaterialUI.Core;
    const theme = useTheme();

    return {
      root: {
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: ({ options: { themeBgColor, bgColor } }) =>
          style.getColor(themeBgColor) || bgColor,
        boxSizing: 'border-box',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${B.mediaMinWidth(600)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      rootShiftxs: {
        [theme.breakpoints.up('xs')]: {
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
      rootShiftsm: {
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
      rootShiftmd: {
        [theme.breakpoints.up('md')]: {
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
      rootShiftlg: {
        [theme.breakpoints.up('lg')]: {
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
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
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
    };
  },
}))();
