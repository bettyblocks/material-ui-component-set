(() => ({
  name: 'CardActions',
  type: 'CARD_ACTIONS',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { CardActions } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const isPristine = children.length === 0 && isDev;
    const PlaceHolder = <div className={classes.empty}>Card Content</div>;

    const CardActionsComponent = (
      <CardActions>{isPristine ? PlaceHolder : children}</CardActions>
    );

    return isDev ? <div>{CardActionsComponent}</div> : CardActionsComponent;
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
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
