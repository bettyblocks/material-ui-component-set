(() => ({
  name: 'Paper',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { Paper } = window.MaterialUI.Core;
    const { elevation, variant, square, dataComponentAttribute } = options;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    const PaperComponent = (
      <Paper
        classes={{ root: classes.root }}
        variant={variant}
        elevation={variant === 'flat' ? 0 : elevation}
        square={square}
        data-component={useText(dataComponentAttribute) || 'Paper'}
        className={includeStyling()}
      >
        {isEmpty ? PlaceHolder : children}
      </Paper>
    );
    return isDev ? <div>{PaperComponent}</div> : PaperComponent;
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      root: {
        margin: ({ options: { outerSpacing } }) =>
          [
            getSpacing(outerSpacing[0]),
            getSpacing(outerSpacing[1]),
            getSpacing(outerSpacing[2]),
            getSpacing(outerSpacing[3]),
          ].join(' '),
        [`@media ${mediaMinWidth(600)}`]: {
          margin: ({ options: { outerSpacing } }) =>
            [
              getSpacing(outerSpacing[0], 'Portrait'),
              getSpacing(outerSpacing[1], 'Portrait'),
              getSpacing(outerSpacing[2], 'Portrait'),
              getSpacing(outerSpacing[3], 'Portrait'),
            ].join(' '),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          margin: ({ options: { outerSpacing } }) =>
            [
              getSpacing(outerSpacing[0], 'Landscape'),
              getSpacing(outerSpacing[1], 'Landscape'),
              getSpacing(outerSpacing[2], 'Landscape'),
              getSpacing(outerSpacing[3], 'Landscape'),
            ].join(' '),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          margin: ({ options: { outerSpacing } }) =>
            [
              getSpacing(outerSpacing[0], 'Desktop'),
              getSpacing(outerSpacing[1], 'Desktop'),
              getSpacing(outerSpacing[2], 'Desktop'),
              getSpacing(outerSpacing[3], 'Desktop'),
            ].join(' '),
        },
      },
      empty: {
        display: 'flex',
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
        '&::after': {
          content: '"Paper"',
        },
      },
    };
  },
}))();
