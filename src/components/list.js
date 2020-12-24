(() => ({
  name: 'List',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['LIST_ITEM', 'LIST_SUBHEADER', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { List, ListItem, ListItemText } = window.MaterialUI.Core;
    const { env, ModelProvider, useAllQuery, getProperty } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = children.length === 0 && isDev;
    const { filter, model, disablePadding, dense, orderBy, order } = options;

    const DataPlaceHolder = ({ text }) => (
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary={text} />
        </ListItem>
      </List>
    );

    const listArgs = { className: classes.root, disablePadding, dense };

    const renderData = () => {
      return isEmpty ? (
        <div
          className={[
            isEmpty ? classes.empty : '',
            isPristine ? classes.pristine : '',
          ].join(' ')}
        />
      ) : (
        children
      );
    };

    const ListComponent = <List {...listArgs}>{renderData()}</List>;

    return ListComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
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
