(() => ({
  name: 'Tab',
  type: 'TAB_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Typography, Box } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { value } = parent;
    const renderOnCanvas = isDev && value === index;

    const TabPanel = (renderOnCanvas || !isDev) && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        aria-labelledby="tabs"
      >
        {value === index && (
          <Box
            className={isDev && children.length === 0 && classes.empty}
            p={3}
          >
            {children.length === 0 ? 'Tab' : children}
          </Box>
        )}
      </Typography>
    );
    return isDev ? <div>{TabPanel}</div> : TabPanel;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
