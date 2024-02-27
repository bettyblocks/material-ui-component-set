(() => ({
  name: 'List',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT', 'LIST_SUBHEADER', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { List } = window.MaterialUI.Core;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = children.length === 0 && isDev;
    const {
      disablePadding,
      dense,
      dataComponentAttribute = ['List'],
    } = options;

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
        disablePadding={disablePadding}
        dense={dense}
        className={includeStyling()}
        data-component={dataComponentAttributeValue}
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
          content: '"List"',
        },
      },
    };
  },
}))();
