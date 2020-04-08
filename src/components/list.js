(() => ({
  name: 'List',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['LIST_ITEM'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { List } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const isPristine = children.length === 0 && isDev;
    const PlaceHolder = <div className={classes.empty}>List</div>;

    const ListComponent = <List>{isPristine ? PlaceHolder : children}</List>;
    return isDev ? <div>{ListComponent}</div> : ListComponent;
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
