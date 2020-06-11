(() => ({
  name: 'Dialog',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { isVisible, isFullscreen } = options;
    const { Dialog } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const [isOpen, setIsOpen] = useState(isDev);

    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true);

    useEffect(() => {
      B.defineFunction('OpenDialog', openDialog);
      B.defineFunction('CloseDialog', closeDialog);
    }, []);

    const isEmpty = !children.length;

    const EmptyCmp = () => (
      <div
        className={[
          classes.dialog,
          isEmpty ? classes.empty : classes.dirty,
          isFullscreen ? classes.fullScreen : classes.windowed,
        ].join(' ')}
      >
        {!isEmpty ? children : 'Dialog Content'}
      </div>
    );

    const DialogCmp = (
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        fullScreen={isFullscreen}
        aria-labelledby="modal-dialog"
      >
        {children}
      </Dialog>
    );

    return isDev ? (
      <div className={isVisible ? classes.overlay : classes.root}>
        {isVisible ? <EmptyCmp /> : 'Dialog'}
      </div>
    ) : (
      DialogCmp
    );
  })(),
  styles: () => () => ({
    root: {
      display: 'block',
    },
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      top: '0.25rem',
      left: '0.25rem',
      bottom: '0.25rem',
      right: '0.25rem',
      zIndex: 2,
      boxSizing: 'border-box',
    },
    empty: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
    dirty: {
      backgroundColor: '#fff',
    },
    dialog: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    fullScreen: {
      width: '100%',
      height: '100%',
    },
    windowed: {
      borderRadius: '0.25rem',
      maxWidth: '37.5rem',
      margin: '2rem',
      maxHeight: 'calc(100% - 4rem);',
    },
  }),
}))();
