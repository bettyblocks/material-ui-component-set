(() => ({
  name: 'drawerContainer',
  type: 'ROW',
  allowedTypes: [
    'BODY_COMPONENT',
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const isEmpty = children.length === 0;
    const isDev = B.env === 'dev';
    const isPristine = isEmpty && isDev;
    const { isOpen } = parent;

    return (
      <div
        className={[
          classes.root,
          isPristine ? classes.pristine : '',
          isOpen && !isDev ? classes.rootShift : '',
        ].join(' ')}
      >
        {isPristine ? 'Drawer Container' : ''}
        {children}
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
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      rootShift: {
        [theme.breakpoints.up('sm')]: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 200, // TODO - adjust this to be dynamic
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
