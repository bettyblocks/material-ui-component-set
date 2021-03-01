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
    const { testing } = options;
    const { Card } = window.MaterialUI.Core;
    const { variant, elevation, square } = options;
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

    function testingTag() {
      if (testing && testing.length > 0) {
        return useText(testing);
      }
      return 'card';
    }

    const CardComponent = (
      <Card
        variant={variant}
        square={square}
        elevation={elevation}
        data-component={testingTag()}
      >
        {isEmpty ? PlaceHolder : children}
      </Card>
    );

    return isDev ? <div>{CardComponent}</div> : CardComponent;
  })(),
  styles: () => () => ({
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
  }),
}))();
