(() => ({
  name: 'Paper',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { Paper } = window.MaterialUI.Core;
    const { elevation, variant, square } = options;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    const PaperComponent = (
      <Paper
        variant={variant}
        elevation={variant === 'flat' ? 0 : elevation}
        square={square}
      >
        {isEmpty ? PlaceHolder : children}
      </Paper>
    );
    return isDev ? <div>{PaperComponent}</div> : PaperComponent;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
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
      backgroundColor: '#F0F1F5',
      '&::after': {
        content: '"Paper"',
      },
    },
  }),
}))();
