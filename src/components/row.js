(() => ({
  name: 'Row',
  type: 'BODY_COMPONENT',
  allowedTypes: ['LAYOUT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.container}>
      {(() => {
        const { env } = B;
        const isDev = env === 'dev';
        const isEmpty = children.length === 0;
        const isPristine = isEmpty && isDev;

        return (
          <section
            className={[
              classes.row,
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            {isPristine ? 'Row' : children}
          </section>
        );
      })()}
    </div>
  ),
  styles: B => theme => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const width = {
      Full: '100%',
      XL: '1200px',
      L: '960px',
      M: '720px',
      S: '540px',
    };
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      container: {
        width: '100%',
        height: ({ options: { rowHeight } }) => rowHeight || 'auto',
        maxWidth: ({ options: { maxRowWidth } }) => width[maxRowWidth],
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor === 'transparent'
            ? 'transparent'
            : style.getColor(backgroundColor),
        backgroundImage: 'none',
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderWidth: 0,
        borderColor: 'transparent',
        borderStyle: 'none',
        borderRadius: 0,
        boxSizing: 'border-box',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing, maxRowWidth } }) =>
          maxRowWidth !== 'Full' ? 'auto' : getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing, maxRowWidth } }) =>
          maxRowWidth !== 'Full' ? 'auto' : getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing, maxRowWidth } }) =>
            maxRowWidth !== 'Full'
              ? 'auto'
              : getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
      row: {
        display: 'flex',
        height: '100%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
      },
      empty: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: ({ options: { rowHeight } }) => (rowHeight ? 0 : '4rem'),
        height: '100%',
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
    };
  },
}))();
