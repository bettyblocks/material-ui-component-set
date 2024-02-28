(() => ({
  name: 'Card',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [
    'BODY_COMPONENT',
    'CONTAINER_COMPONENT',
    'CONTENT_COMPONENT',
    'CARD_HEADER',
    'CARD_MEDIA',
    'CARD_ACTIONS',
    'CARD_CONTENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { Card } = window.MaterialUI.Core;
    const { variant, elevation, square, dataComponentAttribute } = options;
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

    const CardComponent = (
      <Card
        variant={variant}
        square={square}
        elevation={elevation}
        classes={{ root: includeStyling(classes.root) }}
        data-component={useText(dataComponentAttribute) || 'Card'}
      >
        {isEmpty ? PlaceHolder : children}
      </Card>
    );

    return isDev ? <div>{CardComponent}</div> : CardComponent;
  })(),
  styles: (B) => (theme) => {
    const { Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
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
          content: '"Card"',
        },
      },
    };
  },
}))();
