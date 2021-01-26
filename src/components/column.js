(() => ({
  name: 'Column',
  type: 'LAYOUT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (
    <div
      className={[
        classes.column,
        options.visible || B.env === 'dev' ? '' : classes.hide,
      ].join(' ')}
    >
      {(() => {
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
            {isPristine ? 'Column' : ''}
          </div>
        );
      })()}
    </div>
  ),
  styles: B => theme => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      column: {
        display: ({
          options: {
            columnWidthMobile,
            horizontalAlignment,
            verticalAlignment,
          },
        }) => {
          if (columnWidthMobile === 'hidden') {
            return 'none';
          }
          return horizontalAlignment === 'inherit' &&
            verticalAlignment === 'inherit'
            ? 'block'
            : 'flex';
        },
        flexDirection: 'column',
        justifyContent: ({ options: { verticalAlignment } }) =>
          verticalAlignment,
        alignItems: ({ options: { horizontalAlignment } }) =>
          horizontalAlignment,
        flexGrow: ({ options: { columnWidthMobile } }) =>
          columnWidthMobile === 'flexible' ? 1 : 0,
        flexShrink: ({ options: { columnWidthMobile } }) =>
          columnWidthMobile === 'flexible' || columnWidthMobile === 'fitContent'
            ? 1
            : 0,
        flexBasis: ({ options: { columnWidthMobile, outerSpacing } }) => {
          if (
            columnWidthMobile === 'flexible' ||
            columnWidthMobile === 'fitContent'
          ) {
            return 'auto';
          }
          const marginRight = getSpacing(outerSpacing[1]);
          const marginLeft = getSpacing(outerSpacing[3]);

          return `calc(${(columnWidthMobile / 12) *
            100}% - ${marginRight} - ${marginLeft})`;
        },
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        height: ({ options: { columnHeight } }) => columnHeight,
        minHeight: 1,
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
        overflow: ({ options: { overflow } }) =>
          overflow ? 'visible' : 'auto',
        boxSizing: 'border-box',
        [`@media ${mediaMinWidth(600)}`]: {
          display: ({
            options: {
              columnWidthTabletPortrait,
              horizontalAlignment,
              verticalAlignment,
            },
          }) => {
            if (columnWidthTabletPortrait === 'hidden') {
              return 'none';
            }
            return horizontalAlignment === 'inherit' &&
              verticalAlignment === 'inherit'
              ? 'block'
              : 'flex';
          },
          flexGrow: ({ options: { columnWidthTabletPortrait } }) =>
            columnWidthTabletPortrait === 'flexible' ? 1 : 0,
          flexShrink: ({ options: { columnWidthTabletPortrait } }) =>
            columnWidthTabletPortrait === 'flexible' ||
            columnWidthTabletPortrait === 'fitContent'
              ? 1
              : 0,
          flexBasis: ({
            options: { columnWidthTabletPortrait, outerSpacing },
          }) => {
            if (
              columnWidthTabletPortrait === 'flexible' ||
              columnWidthTabletPortrait === 'fitContent'
            ) {
              return 'auto';
            }
            const marginRight = getSpacing(outerSpacing[1], 'Portrait');
            const marginLeft = getSpacing(outerSpacing[3], 'Portrait');

            return `calc(${(columnWidthTabletPortrait / 12) *
              100}% - ${marginRight} - ${marginLeft})`;
          },
          maxWidth: '100%',
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          display: ({
            options: {
              columnWidthTabletLandscape,
              horizontalAlignment,
              verticalAlignment,
            },
          }) => {
            if (columnWidthTabletLandscape === 'hidden') {
              return 'none';
            }
            return horizontalAlignment === 'inherit' &&
              verticalAlignment === 'inherit'
              ? 'block'
              : 'flex';
          },
          flexGrow: ({ options: { columnWidthTabletLandscape } }) =>
            columnWidthTabletLandscape === 'flexible' ? 1 : 0,
          flexShrink: ({ options: { columnWidthTabletLandscape } }) =>
            columnWidthTabletLandscape === 'flexible' ||
            columnWidthTabletLandscape === 'fitContent'
              ? 1
              : 0,
          flexBasis: ({
            options: { columnWidthTabletLandscape, outerSpacing },
          }) => {
            if (
              columnWidthTabletLandscape === 'flexible' ||
              columnWidthTabletLandscape === 'fitContent'
            ) {
              return 'auto';
            }
            const marginRight = getSpacing(outerSpacing[1], 'Landscape');
            const marginLeft = getSpacing(outerSpacing[3], 'Landscape');

            return `calc(${(columnWidthTabletLandscape / 12) *
              100}% - ${marginRight} - ${marginLeft})`;
          },
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          display: ({
            options: { columnWidth, horizontalAlignment, verticalAlignment },
          }) => {
            if (columnWidth === 'hidden') {
              return 'none';
            }
            return horizontalAlignment === 'inherit' &&
              verticalAlignment === 'inherit'
              ? 'block'
              : 'flex';
          },
          flexGrow: ({ options: { columnWidth } }) =>
            columnWidth === 'flexible' ? 1 : 0,
          flexShrink: ({ options: { columnWidth } }) =>
            columnWidth === 'flexible' || columnWidth === 'fitContent' ? 1 : 0,
          flexBasis: ({ options: { columnWidth, outerSpacing } }) => {
            if (columnWidth === 'flexible' || columnWidth === 'fitContent') {
              return 'auto';
            }
            const marginRight = getSpacing(outerSpacing[1], 'Desktop');
            const marginLeft = getSpacing(outerSpacing[3], 'Desktop');

            return `calc(${(columnWidth / 12) *
              100}% - ${marginRight} - ${marginLeft})`;
          },
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: ({ options: { columnHeight } }) =>
          columnHeight ? 0 : '4rem',
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
      hide: {
        display: 'none !important',
      },
    };
  },
}))();
