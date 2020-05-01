(() => ({
  name: 'List',
  icon: 'PanelIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT', "DRAWER_LIST_ITEM_COMPONENT"],
  orientation: 'HORIZONTAL',
  jsx: (<div>
    {(() => {
      const { env } = B;
      const isDev = env === "dev";

      const { List,
              ListItem,
              Divider,
              ListItemText,
              ListItemIcon } = window.MaterialUI.Core;

      const { Inbox: InboxIcon, 
              Drafts: DraftsIcon } = window.MaterialUI.Icons;

      const ListItemLink =  props => <ListItem button component="a" {...props} />;

      const list =  (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemLink>
          </List>
        </div>
      );

      return isDev ? 'List' : list
    })()} 
  </div>
  ),
  styles: B => theme => {
    return {
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "white"
      },
    }
  },
}))();
