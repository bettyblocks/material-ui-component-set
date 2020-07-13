(() => ({
  name: 'Tab',
  type: 'TAB_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Typography, Box } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { value } = parent;
    const isActive = value === index;

    const emptyBox = (
      <Box className={classes.empty} p={3}>
        Tab
      </Box>
    );

    const TabPanel = (isActive || !isDev) && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={!isActive}
        aria-labelledby="tabs"
      >
        {children.length === 0 ? emptyBox : children}
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
