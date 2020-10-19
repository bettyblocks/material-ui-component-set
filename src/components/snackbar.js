(() => ({
  name: 'Snackbar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Snackbar, IconButton } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      visible,
      anchorOriginHorizontal,
      anchorOriginVertical,
      autoHide,
      autoHideDuration,
    } = options;
    const { env } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const CloseIcon = Icons.Close;

    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    B.defineFunction('Show', showMessage => {
      if (typeof showMessage === 'string') setText(showMessage);
      setOpen(true);
    });

    B.defineFunction('Hide', () => {
      setOpen(false);
    });

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    const emptyMessage = 'Drag a component in the snackbar or use interactions';
    const duration = autoHide ? autoHideDuration : null;

    let snackbarOptions = {
      open,
      autoHideDuration: isDev ? null : duration,
      onClose: handleClose,
      anchorOrigin: {
        horizontal: anchorOriginHorizontal,
        vertical: anchorOriginVertical,
      },
      key: text,
      action: (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
      classes: { root: classes.root },
    };

    if (isEmpty) {
      snackbarOptions = {
        ...snackbarOptions,
        message: isDev ? emptyMessage : text,
      };
    }

    const SnackbarCmp = (
      <Snackbar {...snackbarOptions}>
        {isEmpty ? null : <div>{children}</div>}
      </Snackbar>
    );

    return isDev ? (
      <div className={classes.wrapper}>
        <div className={classes.pristine}>Snackbar</div>
        {SnackbarCmp}
      </div>
    ) : (
      SnackbarCmp
    );
  })(),
  styles: B => () => {
    const isDev = B.env === 'dev';
    return {
      root: {
        position: () => isDev && 'absolute !important',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '2rem',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        textAlign: 'center',
      },
    };
  },
}))();
