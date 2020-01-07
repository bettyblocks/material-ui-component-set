(() => ({
  name: 'PageContent',
  icon: 'ColumnIcon',
  category: 'LAYOUT',
  type: 'PAGE_CONTENT',
  allowedTypes: ['ROW', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (
    <div className={classes.pageContent}>
      {React.createElement(() => {
        const isEmpty = children.length === 0;

        const isPristine = isEmpty && B.env === 'dev';

        return children.length !== 0 ? (
          children
        ) : (
          <div
            className={[
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            {isPristine ? 'Page Content' : ''}
          </div>
        );
      })}
    </div>
  ),
  styles: B => () => ({
    pageContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexGrow: 1,
      overflowY: 'auto',
      boxSizing: 'border-box',
      [`@media ${B.mediaMaxWidth(768)}`]: {
        flex: '0 0 auto',
        width: B.env === 'prod' ? '100vw' : '100%',
      },
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
