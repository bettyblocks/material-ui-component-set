(() => ({
  name: 'AllOptions',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useText } = B;
    const { content } = options;
    return <div className={classes.root}>{useText(content)}</div>;
  })(),
  styles: () => () => ({
    root: {},
  }),
}))();
