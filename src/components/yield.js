(() => ({
  name: 'Content area',
  type: 'YIELD_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    return (
      <div
        className={includeStyling(
          children.length
            ? classes.root
            : [classes.root, classes.empty].join(' '),
        )}
      >
        {children.length ? children : 'CONTENT AREA'}
      </div>
    );
  })(),
  styles: () => () => {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        fontFamily: 'Roboto, sans-serif',
        textRendering: 'optimizeLegibility',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
      empty: {
        alignItems: 'center',
        justifyContent: 'center',
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
