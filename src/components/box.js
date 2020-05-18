(() => ({
  name: 'Box',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Box } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { alignment } = options;
    const isEmpty = children.length === 0;
    const ButtonGroup = isEmpty ? (
      <div className={classes.empty}>Box</div>
    ) : (
      <Box display="flex" flexDirection="row" justifyContent={alignment}>
        {children}
      </Box>
    );

    return isDev ? (
      <div className={classes.wrapper}>{ButtonGroup}</div>
    ) : (
      ButtonGroup
    );
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
