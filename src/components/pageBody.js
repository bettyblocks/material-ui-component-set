(() => ({
  name: 'PageBody',
  icon: 'RowIcon',
  category: 'LAYOUT',
  type: 'PAGE_BODY',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.container}>
      {React.createElement(() => {
        const isEmpty = children.length === 0;

        const isPristine = isEmpty && B.env === 'dev';

        return (
          <section
            className={[
              classes.pageBody,
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            {isPristine ? 'Page Body' : children}
          </section>
        );
      })}
    </div>
  ),
  styles: B => () => ({
    container: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },
    pageBody: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-start',
      boxSizing: 'border-box',
      [`@media ${B.mediaMaxWidth(768)}`]: {
        overflowX: 'hidden',
      },
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
