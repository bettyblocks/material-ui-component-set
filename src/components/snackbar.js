(() => ({
  name: 'Snackbar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
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
      content,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(useText(content));

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

    B.defineFunction('Hide', () => setOpen(false));
    B.defineFunction('Show/Hide', () => setOpen(s => !s));

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    useEffect(() => {
      if (isDev) {
        setText(useText(content));
      }
    }, [isDev, content]);

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
      classes: { root: isDev && classes.root },
    };

    if (isEmpty) {
      snackbarOptions = {
        ...snackbarOptions,
        message: text,
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
  styles: () => () => ({
    root: {
      zIndex: [9, '!important'],
      left: ({ options: { anchorOriginHorizontal } }) => {
        const isRight = anchorOriginHorizontal === 'right';
        const isLeft = anchorOriginHorizontal === 'left';
        const recalculatedPosition = isLeft
          ? 'calc(8px + 328px)'
          : 'calc(50% + 328px / 2)';
        return !isRight && [recalculatedPosition, '!important'];
      },
      '& .MuiSnackbarContent-root': {
        transition: () => [
          'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '!important',
        ],
      },
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
  }),
}))();
