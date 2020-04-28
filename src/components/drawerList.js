(() => ({
  name: 'DrawerList',
  icon: 'PanelIcon',
  type: 'DRAWER_LIST_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT', "DRAWER_LIST_ITEM_COMPONENT"],
  orientation: 'HORIZONTAL',
  jsx: (<div>
    {(() => {
      return <div><p style={{marginLeft: '10px'}}> Drawer list component</p>{children}</div>
    })()} 
  </div>
  ),
  styles: B => theme => {
    return {
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: () => 'center',
        minHeight: '4rem',
        height: '100%',
        margin: '1rem',
        fontSize: '0.75rem',
      },
      pristine: {
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        border: '0.0625rem dashed #AFB5C8',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
