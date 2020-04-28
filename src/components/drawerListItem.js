(() => ({
  name: 'DrawerListItem',
  icon: 'PanelIcon',
  type: 'DRAWER_LIST_ITEM_COMPONENT',
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