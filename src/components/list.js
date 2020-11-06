(() => ({
  name: 'List',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['LIST_ITEM', 'LIST_SUBHEADER'],
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

    const orderByArray = [orderBy].flat();
    const sort =
      !isDev && orderBy
        ? orderByArray.reduceRight((acc, property, index) => {
            const prop = getProperty(property);
            return index === orderByArray.length - 1
              ? { [prop.name]: order.toUpperCase() }
              : { [prop.name]: acc };
          }, {})
        : {};

    const { loading, error, data } =
      model &&
      useAllQuery(model, {
        filter,
        variables: {
          ...(orderBy ? { sort: { relation: sort } } : {}),
        },
      });

    if (loading) return <DataPlaceHolder text="loading..." />;
    if (error) return <DataPlaceHolder text="failed" />;

    const { results } = data || {};

    if (!isDev && results && results.length === 0) {
      return <DataPlaceHolder text="No results" />;
    }

    const renderData = () => {
      if (!model || isDev) {
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
      }
      return (results || []).map(value => (
        <ModelProvider value={value} id={model}>
          <B.InteractionScope>{children}</B.InteractionScope>
        </ModelProvider>
      ));
    };

    const ListComponent = <List {...listArgs}>{renderData()}</List>;

    return isDev ? <div>{ListComponent}</div> : ListComponent;
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
