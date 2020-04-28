(() => ({
  name: 'List',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['LIST_ITEM', 'LIST_SUBHEADER'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { List, ListItem, ListItemText } = window.MaterialUI.Core;
    const { env, GetAll, GetOneProvider } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = children.length === 0 && isDev;
    const { filter, model } = options;

    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    const DataPlaceHolder = ({ text }) => (
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary={text} />
        </ListItem>
      </List>
    );

    const DataContainer = (
      <GetAll modelId={model} filter={filter}>
        {({ loading, error, data }) => {
          if (loading) return <DataPlaceHolder text="loading..." />;
          if (error) return <DataPlaceHolder text="failed" />;

          const { results } = data;

          if (results.length === 0) {
            return <DataPlaceHolder text="No results" />;
          }

          return (
            <List className={classes.root}>
              {results.map(value => (
                <GetOneProvider value={value}>{children}</GetOneProvider>
              ))}
            </List>
          );
        }}
      </GetAll>
    );

    const ListComponent = (
      <List className={classes.root}>{isEmpty ? PlaceHolder : children}</List>
    );

    const ListOrDataComponent = model ? DataContainer : ListComponent;

    return isDev ? <div>{ListComponent}</div> : ListOrDataComponent;
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
