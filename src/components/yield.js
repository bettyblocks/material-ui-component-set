(() => ({
  name: 'Yield',
  type: 'YIELD_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    return (
      <div
        className={
          children.length
            ? classes.root
            : [classes.root, classes.empty].join(' ')
        }
      >
        {children.length
          ? children
          : 'This is where the content of the page appears.'}
      </div>
    );
  })(),
  styles: () => () => {
    return {
      root: {
        display: 'flex',
        'flex-direction': 'column',
        height: '100%',
        backgroundColor: '#ffffff',
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
        color: '#666d85',
        textTransform: 'uppercase',
        backgroundColor: '#f7f8fa',
        border: '0.0625rem dashed #afb5c8',
        boxSizing: 'border-box',
        padding: '0 2.8125rem',
        textAlign: 'center',
      },
    };
  },
}))();
