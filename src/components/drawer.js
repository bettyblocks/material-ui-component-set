(() => ({
  name: 'Drawer',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Drawer,
      //   Divider,
      //   List,
      //   ListItem,
      //   ListItemText,
    } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { anchor } = options;
    // const isEmpty = children.length === 0;

    const [visible, setVisible] = useState(true);
    const closeDrawer = () => setVisible(false);
    const openDrawer = () => setVisible(true);
    const toggleDrawer = () => setVisible(s => !s);

    useEffect(() => {
      B.defineFunction('OpenDrawer', openDrawer);
      B.defineFunction('CloseDrawer', closeDrawer);
      B.defineFunction('ToggleDrawer', toggleDrawer);
    }, []);

    const handleButton = evt => {
      evt.preventDefault();
      evt.stopPropagation();
      toggleDrawer();
    };

    // const drawer = (
    //   <Drawer
    //     open={visible}
    //     anchor={anchor}
    //     onClose={closeDrawer}
    //     className={classes.drawer}
    //     ModalProps={{
    //       container: document.getElementById('drawer-container'),
    //     }}
    //     classes={{
    //       paper: [classes.drawer, classes.absolute].join(' '),
    //       modal: classes.absolute,
    //       backdrop: classes.absolute,
    //     }}
    //     variant="permanent"
    //   >
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
    //         <ListItem button key={text}>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text) => (
    //         <ListItem button key={text}>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Drawer>
    // );

    const Comp = (
      <div className={classes.root}>
        <nav>
          <Drawer
            open={visible}
            anchor={anchor}
            onClose={closeDrawer}
            className={classes.drawer}
            ModalProps={{
              container: document.getElementById('drawer-container'),
            }}
            classes={{
              paper: [classes.drawer, classes.absolute].join(' '),
              modal: classes.absolute,
              backdrop: classes.absolute,
            }}
            // variant="permanent"
          >
            {children}
          </Drawer>
        </nav>
        <main>
          <button type="button" onClick={handleButton}>
            toggle drawer
          </button>
          {children}
        </main>
      </div>
    );

    return isDev ? <div>{Comp}</div> : Comp;
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      height: '100%',
      position: 'relative',
    },
    nav: {},
    drawer: {
      width: '240px',
    },
    absolute: {
      position: 'absolute !important',
      top: '0px',
      bottom: '0px',
    },
  }),
}))();
