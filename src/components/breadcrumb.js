(() => ({
  name: 'Breadcrumb',
  icon: 'BreadcrumbIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BREADCRUMB_ITEM'],
  orientation: 'HORIZONTAL',
  jsx: (
    <header>
      {(() => {
        const showPlaceholder = children.length === 0;
        const isPristine = showPlaceholder && B.env === 'dev';
        return (
          <nav className={classes.breadCrumb}>
            <ul
              className={[
                classes.breadCrumbList,
                showPlaceholder ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' ')}
            >
              {isPristine ? 'BreadCrumb' : children}
            </ul>
          </nav>
        );
      })()}
    </header>
  ),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      breadCrumb: {
        position: 'relative',
        backgroundColor: style.getColor('White'),
        width: '100%',
      },
      breadCrumbList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: style.getColor('White'),
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '2rem',
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
    };
  },
}))();
