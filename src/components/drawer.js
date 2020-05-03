(() => ({
  name: 'Drawer',
  icon: 'PanelIcon',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT', "LIST_COMPONENT"],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.panel}>
      {(() => {

        const { env } = B
        const { Drawer, 
                Button, 
                List, 
                Divider, 
                ListItem, 
                ListItemIcon, 
                ListItemText 
              } = window.MaterialUI.Core;

              
        const { Inbox, Mail } = window.MaterialUI.Icons

        const isDev = env === 'dev';

        const { anchor, isOpenOnStart, isVisibleInDev } = options;
        
        const initialState = {
          ...{
            top: false,
            left: false,
            bottom: false,
            right: false,
          },
          ...{[anchor]: isOpenOnStart}
        }
        
        const [state, setState] = useState(initialState);

        useEffect(() => {
          B.defineFunction("handleOpenDrawer", e => {
            e.preventDefault();
        
            setState({ ...state, [anchor]: true });
          });
        }, []);

        const toggleDrawer = (anchor, open) => (event) => {
          if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
      
          setState({ ...state, [anchor]: open });
        };

        const list = (anchor) => (
          <div
            className={clsx(classes.list, {
              [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        );

        const drawerComponent = (
          <div>
            {
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            }
          </div>
        );

        const drawerComponentWithList = (
          <div>
            {
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  <div
                    className={clsx(classes.list, {
                      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                    })}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    {children}
                  </div>
                </Drawer>
              </React.Fragment>
            }
          </div>
        )

        return (
          <>
            { isDev ? <div><p>Drawer</p>{isVisibleInDev && children}</div> : drawerComponentWithList}
          </>
        );
      })()}
    </div>
  ),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
      panel: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: 'auto',
        minHeight: 1,
        backgroundColor: 'transparent',
        borderWidth: '0.125rem',
        borderColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderStyle: 'solid',
        borderRadius: '0.125rem',
        overflow: 'auto',
        boxSizing: 'border-box',
      },
      title: {
        margin: '0',
        display: 'block',
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.4375rem',
        paddingBottom: '0.5625rem',
        fontFamily: style.getFontFamily('Body1'),
        fontSize: '1rem',
        fontWeight: style.getFontWeight('Body1'),
        textTransform: style.getTextTransform('Body1'),
        letterSpacing: style.getLetterSpacing('Body1'),
        color: ({ options: { color } }) =>
          style.getColor(color) || style.getColor('White'),
        backgroundColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomWidth: '0.125rem',
        borderBottomColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomStyle: 'solid',
      },
      content: {
        flexGrow: 1,
        flexBasis: '100%',
        paddingTop: getSpacing('M'),
        paddingRight: getSpacing('M'),
        paddingBottom: getSpacing('M'),
        paddingLeft: getSpacing('M'),
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        title: {
          paddingRight: getSpacing('M', 'Portrait'),
          paddingLeft: getSpacing('M', 'Portrait'),
          fontSize: style.getFontSize('Body1', 'Portrait'),
        },
        content: {
          paddingTop: getSpacing('M', 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        title: {
          paddingRight: getSpacing('M', 'Landscape'),
          paddingLeft: getSpacing('M', 'Landscape'),
          fontSize: style.getFontSize('Body1', 'Landscape'),
        },
        content: {
          padding: getSpacing('M', 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
        title: {
          paddingRight: getSpacing('M', 'Desktop'),
          paddingLeft: getSpacing('M', 'Desktop'),
          fontSize: style.getFontSize('Body1', 'Desktop'),
        },
        content: {
          padding: getSpacing('M', 'Desktop'),
        },
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
