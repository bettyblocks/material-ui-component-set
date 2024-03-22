(() => ({
  name: 'PageContent',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const isDev = env === 'dev';

    return isDev ? (
      <div
        className={
          children.length
            ? classes.root
            : [classes.root, classes.empty].join(' ')
        }
      >
        {children.length ? children : 'Page Content'}
      </div>
    ) : (
      <>{children}</>
    );
  })(),
  styles: () => () => {
    return {
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
      root: {
        display: 'flex',
        'flex-direction': 'column',
        height: '100%',
        backgroundColor: '#F0F1F5',
        fontFamily: 'Roboto, sans-serif',
        textRendering: 'optimizeLegibility',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: 12,
        color: '#666d85;',
        textTransform: 'uppercase',
        backgroundColor: '#f7f8fa;',
        border: '#AFB5C8 dashed 0.0625rem',
        boxSizing: 'border-box',
        padding: '0 2.8125rem',
        textAlign: 'center',
      },
    };
  },
}))();
