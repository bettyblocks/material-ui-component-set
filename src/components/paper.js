(() => ({
  name: 'Paper',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Paper } = window.MaterialUI.Core;
    const { elevation, variant, square } = options;
    const isDev = B.env === 'dev';
    const isPristine = children.length === 0 && isDev;
    const PlaceHolder = <div className={classes.empty}>Paper</div>;

    const paper = (
      <Paper
        className={[
          isPristine ? classes.pristine : '',
          isDev ? classes.dev : '',
        ].join(' ')}
        variant={variant}
        elevation={elevation}
        square={square}
        m={3}
      >
        {isPristine ? PlaceHolder : children}
      </Paper>
    );
    return isDev ? <div>{paper}</div> : paper;
  })(),
  styles: () => () => ({
    dev: {
      paddingBottom: '10px',
    },
    pristine: {
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
