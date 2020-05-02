(() => ({
  name: 'List',
  icon: 'PanelIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT', "LIST_ITEM_COMPONENT"],
  orientation: 'HORIZONTAL',
  jsx: (<div>
    {(() => {
      const { env } = B;
      const isDev = env === "dev";

      const { List, ListSubheader } = window.MaterialUI.Core;

      const list =  (
        <div className={classes.root}>
          <List subheader={<ListSubheader>Main</ListSubheader>} component="nav" aria-label="main mailbox folders">
            {children}
          </List>
        </div>
      );

      return isDev ? <div>List {children}</div> : list
    })()}
  </div>
  ),
  styles: B => theme => {
    return {
      root: {
        width: '100%',
        backgroundColor: "white"
      },
    }
  },
}))();
