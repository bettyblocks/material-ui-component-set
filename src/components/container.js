(() => ({
  name: 'Container',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { Container } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isDev && isEmpty;
    const { maxWidth, disableGutters } = options;
    const hasMaxWidth = maxWidth !== 'false';
    const ContainerCmp = (
      <Container
        disableGutters={disableGutters}
        maxWidth={hasMaxWidth && maxWidth}
        className={[
          classes.root,
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      >
        {isPristine ? 'Container' : children}
      </Container>
    );

    return isDev ? (
      <div className={classes.wrapper}>{ContainerCmp}</div>
    ) : (
      ContainerCmp
    );
  })(),
  styles: B => theme => {
    const { env, Styling } = B;
    const isDev = env === 'dev';
    const style = new Styling(theme);
    return {
      wrapper: {
        height: ({ options: { height } }) => height,
      },
      root: {
        flexBasis: 'auto',
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        height: ({ options: { height } }) => (isDev ? '100%' : height),
      },
      empty: {
        display: ['flex', '!important'],
        justifyContent: 'center',
        alignItems: 'center',
        height: '2.5rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor === 'Transparent'
            ? '#F0F1F5'
            : style.getColor(backgroundColor),
      },
    };
  },
}))();
