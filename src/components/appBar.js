(() => ({
  name: 'AppBar',
  type: 'BODY_COMPONENT',
  allowedTypes: ['TOOLBAR', 'TABS'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { AppBar } = window.MaterialUI.Core;
    const { position } = options;
    const isDev = B.env === 'dev';

    const appBar = (
      <AppBar position={isDev ? 'static' : position} className={classes.root}>
        {children}
      </AppBar>
    );
    return isDev ? <div>{appBar}</div> : appBar;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
      },
    };
  },
}))();
