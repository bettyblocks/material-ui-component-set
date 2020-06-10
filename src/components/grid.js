(() => ({
  name: 'Grid',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Grid } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const {
      alignItems,
      alignContent,
      type,
      justify,
      direction,
      spacing,
      wrap,
      zeroMinWidth,
      reverse,
      xsWidth,
      smWidth,
      mdWidth,
      lgWidth,
      xlWidth,
    } = options;
    const isEmpty = children.length === 0;
    const isContainer = type === 'container';
    const isItem = type === 'item';
    const gridDirection = reverse ? `${direction}-reverse` : direction;

    const sizeNames = ['xs', 'sm', 'md', 'lg', 'xl'];
    const sizes = [xsWidth, smWidth, mdWidth, lgWidth, xlWidth].reduce(
      (acc, w, index) => {
        const name = sizeNames[index];
        let value = '';
        if (w === 'true') {
          value = true;
        } else if (w === 'false') {
          value = false;
        } else if (w === 'auto') {
          value = w;
        } else {
          value = parseInt(w, 10);
        }
        acc[name] = value;
        return acc;
      },
      {},
    );

    const GridComp = (
      <Grid
        alignContent={alignContent}
        alignItems={alignItems}
        classes={{ root: classes.root }}
        container={isContainer}
        direction={gridDirection}
        item={isItem}
        justify={justify}
        spacing={spacing}
        wrap={wrap}
        zeroMinWidth={zeroMinWidth}
        xs={sizes.xs}
        sm={sizes.sm}
        md={sizes.md}
        lg={sizes.lg}
        xl={sizes.xl}
      >
        {children}
      </Grid>
    );

    return isDev ? (
      <div
        className={[classes.wrapper, isEmpty ? classes.empty : ''].join(' ')}
        data-type={`grid-${type}`}
      >
        {GridComp}
      </div>
    ) : (
      GridComp
    );
  })(),
  styles: B => theme => {
    const isDev = B.env === 'dev';
    const style = new B.Styling(theme);
    const getWidth = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return '100%';
      }
      if (value === 'auto') {
        return 'none';
      }
      return `${Math.round((parseInt(value, 10) / 12) * 10e7) / 10e5}%`;
    };
    const getFlexBasis = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return 0;
      }
      if (value === 'auto') {
        return 'auto';
      }
      return `${Math.round((parseInt(value, 10) / 12) * 10e7) / 10e5}%`;
    };
    const getFlexGrow = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return 1;
      }
      return 0;
    };

    return {
      wrapper: {
        width: ({ options: { type } }) => type === 'container' && '100%',
        flexGrow: ({ options: { xsWidth } }) => getFlexGrow(xsWidth),
        maxWidth: ({ options: { xsWidth } }) => getWidth(xsWidth),
        flexBasis: ({ options: { xsWidth } }) => getFlexBasis(xsWidth),
        '& > div': {
          flexGrow: ['initial', '!important'],
          maxWidth: ['none', '!important'],
        },
        [`@media ${B.mediaMinWidth(600)}`]: {
          flexGrow: ({ options: { smWidth } }) => getFlexGrow(smWidth),
          maxWidth: ({ options: { smWidth } }) => getWidth(smWidth),
          flexBasis: ({ options: { smWidth } }) => getFlexBasis(smWidth),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          flexGrow: ({ options: { mdWidth } }) => getFlexGrow(mdWidth),
          maxWidth: ({ options: { mdWidth } }) => getWidth(mdWidth),
          flexBasis: ({ options: { mdWidth } }) => getFlexBasis(mdWidth),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          flexGrow: ({ options: { lgWidth } }) => getFlexGrow(lgWidth),
          maxWidth: ({ options: { lgWidth } }) => getWidth(lgWidth),
          flexBasis: ({ options: { lgWidth } }) => getFlexBasis(lgWidth),
        },
        [`@media ${B.mediaMinWidth(1920)}`]: {
          flexGrow: ({ options: { xlWidth } }) => getFlexGrow(xlWidth),
          maxWidth: ({ options: { xlWidth } }) => getWidth(xlWidth),
          flexBasis: ({ options: { xlWidth } }) => getFlexBasis(xlWidth),
        },
      },
      root: {
        height: ({ options: { height } }) => height,
        minHeight: ({ children }) => children.length === 0 && '2.5rem',
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        '& > div[data-type="grid-item"]': {
          padding: ({ options: { spacing } }) =>
            isDev && `${parseInt(spacing, 10) * 4}px`,
        },
      },
      empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '2.5rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor === 'Transparent'
            ? '#F0F1F5'
            : style.getColor(backgroundColor),
        '& > div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& > div::after': {
          content: '"Grid"',
        },
      },
    };
  },
}))();
