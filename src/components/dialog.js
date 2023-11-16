(() => ({
  name: 'Dialog',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, useText } = B;
    const {
      isVisible,
      isFullscreen,
      invisible,
      runTimeVisibility,
      width,
      disableClick: disableBackdropClick,
      preLoadChildren,
      dataComponentAttribute,
    } = options;
    const { Dialog } = window.MaterialUI.Core;
    const isDev = env === 'dev';

    // Because custom boolean option returns false as a string, do an additonal check
    const componentVisibility = isDev
      ? isVisible
      : runTimeVisibility !== 'false';
    const [isOpen, setIsOpen] = useState(componentVisibility);
    const [keepMounted, setKeepMounted] = useState(preLoadChildren);

    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true);

    useEffect(() => {
      setIsOpen(componentVisibility);
    }, [componentVisibility]);

    useEffect(() => {
      if (isOpen) setKeepMounted(true);
    }, [isOpen]);

    useEffect(() => {
      B.defineFunction('Show', openDialog);
      B.defineFunction('Hide', closeDialog);
      B.defineFunction('Show/Hide', () => setIsOpen((s) => !s));
    }, []);
    const isEmpty = !children.length;

    function EmptyCmp() {
      return (
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
    }

    const DialogCmp = (
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        fullScreen={isFullscreen}
        fullWidth
        maxWidth={width}
        aria-labelledby="modal-dialog"
        keepMounted={keepMounted}
        disableBackdropClick={disableBackdropClick}
        data-component={useText(dataComponentAttribute) || 'Dialog'}
      >
        {children}
      </Dialog>
    );

    // eslint-disable-next-line no-nested-ternary
    return isDev ? (
      !invisible ? (
        <div className={isOpen ? classes.overlay : classes.root}>
          {isOpen ? <EmptyCmp /> : 'Dialog'}
        </div>
      ) : (
        <div className={isOpen ? classes.overlay : ''}>
          {isOpen ? <EmptyCmp /> : ''}
        </div>
      )
    ) : (
      DialogCmp
    );
  })(),
  styles: () => () => {
    const { useTheme } = window.MaterialUI.Core;
    const theme = useTheme();
    return {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
        minHeight: '2rem',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
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
        width: ({ options: { width } }) =>
          Math.max(theme.breakpoints.values[width], 444),
        margin: '2rem',
        maxHeight: 'calc(100% - 4rem);',
      },
    };
  },
}))();
