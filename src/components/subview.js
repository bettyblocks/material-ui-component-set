(() => ({
  name: 'Subview',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['SUBVIEWITEM_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { dense, dataComponentAttribute = ['Subview'] } = options;
    const { List } = window.MaterialUI.Core;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = isDev && children.length === 0;
    const isPristine = isEmpty;

    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const renderData = () =>
      isEmpty ? (
        <div
          className={[
            isEmpty ? classes.empty : '',
            isPristine ? classes.pristine : '',
          ].join(' ')}
        />
      ) : (
        children
      );

    return (
      <List
        classes={{ root: classes.root }}
        disablePadding
        dense={dense}
        data-component={dataComponentAttributeValue}
        className={includeStyling(
          !isPristine && children.length > 0 ? classes.border : '',
        )}
      >
        {renderData()}
      </List>
    );
  })(),
  styles: (B) => (theme) => {
    const { Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0rem' ? '0rem' : style.getSpacing(idx, device);
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        borderColor: 'black',
        '&.MuiList-root': {
          margin: ({ options: { outerSpacing } }) =>
            [
              getSpacing(outerSpacing[0]),
              getSpacing(outerSpacing[1]),
              getSpacing(outerSpacing[2]),
              getSpacing(outerSpacing[3]),
            ].join(' '),
        },
      },
      border: {
        borderWidth: ({ options: { borderWidth, borderStyle, borderColor } }) =>
          borderWidth && borderStyle && borderColor ? borderWidth : 0,
        borderStyle: ({ options: { borderStyle } }) => borderStyle,
        borderColor: ({ options: { borderColor } }) =>
          style.getColor(borderColor),
        borderRadius: ({ options: { borderRadius } }) => borderRadius,
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
          content: '"Subview"',
        },
      },
    };
  },
}))();
