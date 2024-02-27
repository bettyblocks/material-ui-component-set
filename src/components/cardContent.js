(() => ({
  name: 'CardContent',
  type: 'CARD_CONTENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { dataComponentAttribute } = options;
    const { CardContent } = window.MaterialUI.Core;
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

    const CardContentComponent = (
      <CardContent
        data-component={useText(dataComponentAttribute) || 'CardContent'}
        className={includeStyling()}
      >
        {isEmpty ? PlaceHolder : children}
      </CardContent>
    );

    return isDev ? <div>{CardContentComponent}</div> : CardContentComponent;
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
        content: '"Card Content"',
      },
    },
  }),
}))();
