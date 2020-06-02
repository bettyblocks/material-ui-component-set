(() => ({
  name: 'drawerNav',
  type: 'ROW',
  allowedTypes: [
    'BODY_COMPONENT',
    'LAYOUT_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => (
    <div className={classes.root}>
      {children} {children.length ? '' : 'nav bar'}
    </div>
  ))(),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      root: {
        height: ({ options: { height } }) => height,
        width: '100%',
        backgroundColor: ({ options: { bgColor } }) => style.getColor(bgColor),
      },
    };
  },
}))();
