(() => ({
  name: 'CardContent',
  type: 'CARD_CONTENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { CardContent } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const isPristine = children.length === 0 && isDev;
    const PlaceHolder = <div className={classes.empty}>Card Content</div>;

    const CardContentComponent = (
      <CardContent>{isPristine ? PlaceHolder : children}</CardContent>
    );

    return isDev ? <div>{CardContentComponent}</div> : CardContentComponent;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
      height: '100%',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
