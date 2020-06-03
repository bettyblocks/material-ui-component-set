(() => ({
  name: 'DrawerContainer',
  type: 'ROW',
  allowedTypes: [
    'BODY_COMPONENT',
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Children } = B;
    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const { isResponsive, toggleDrawer, isLargeScreen } = parent;
    const showDrawer = isResponsive && !isDev;

    return (
      <div
        className={[
          classes.root,
          isPristine ? classes.pristine : '',
          showDrawer ? classes.rootShift : '',
        ].join(' ')}
      >
        <Children showToggleIcon={!isLargeScreen} toggleDrawer={toggleDrawer}>
          {isPristine ? 'Drawer Container' : children}
        </Children>
      </div>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const { useTheme } = window.MaterialUI.Core;
    const theme = useTheme();

    return {
      root: {
        flexGrow: 1,
        backgroundColor: ({ options: { bgColor } }) => style.getColor(bgColor),
        boxSizing: 'border-box',
      },
      rootShift: {
        [theme.breakpoints.up('sm')]: {
          marginLeft: ({ parent }) => parent.drawerWidth,
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
