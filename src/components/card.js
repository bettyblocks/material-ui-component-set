(() => ({
  name: 'Card',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [
    'BODY_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
    'CARD_MEDIA',
    'CARD_ACTIONS',
    'CARD_CONTENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Card } = window.MaterialUI.Core;
    const { raised, variant } = options;
    const isDev = B.env === 'dev';
    const isPristine = children.length === 0 && isDev;
    const PlaceHolder = <div className={classes.empty}>Card</div>;

    const CardComponent = (
      <Card variant={variant} raised={raised}>
        {isPristine ? PlaceHolder : children}
      </Card>
    );

    return isDev ? <div>{CardComponent}</div> : CardComponent;
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
