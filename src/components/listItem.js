(() => ({
  name: 'ListItem',
  icon: 'PanelIcon',
  type: 'LIST_ITEM_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (<div>
    {(() => {

      const { text } = options

      const { env } = B
      const isDev = env === 'dev';

      const { ListItem, 
              ListItemText 
            } = window.MaterialUI.Core;


      // const { Inbox: InboxIcon, 
      //   Drafts: DraftsIcon } = window.MaterialUI.Icons;

      // const ListItemLink =  props => <ListItem button component="a" {...props} />;

          //   <ListItem button>
          //     <ListItemIcon>
          //       <InboxIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Inbox" />
          //   </ListItem>
          //   <ListItem button>
          //     <ListItemIcon>
          //       <DraftsIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Drafts" />
          //   </ListItem>
          // </List>
          // <Divider />
          // <List component="nav" aria-label="secondary mailbox folders">
          //   <ListItem button>
          //     <ListItemText primary="Trash" />
          //   </ListItem>
          //   <ListItemLink href="#simple-list">
          //     <ListItemText primary="Spam" />
          //   </ListItemLink>

      const listItemComponent = (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>)
        
      return <div>{isDev ? <p style={{marginLeft: '20px'}}> {text}</p> : listItemComponent }</div>
    })()}
    </div>
  ),
  styles: B => theme => {
  },
}))();