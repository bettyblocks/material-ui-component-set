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
      <AppBar position={isDev ? 'static' : position}>{children}</AppBar>
    );
    return isDev ? <div>{appBar}</div> : appBar;
  })(),
  styles: () => () => ({
    root: {
      flexGrow: 1,
    },
  }),
}))();
