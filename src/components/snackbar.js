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

    B.defineFunction('Hide', () => {
      setOpen(false);
    });

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
      classes: { root: classes.root },
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
      <div className={classes.wrapper}>{SnackbarCmp}</div>
    ) : (
      SnackbarCmp
    );
  })(),
  styles: B => () => {
    const isDev = B.env === 'dev';
    return {
      root: {
        zIndex: isDev && [900, '!important'],
        left: ({ options: { anchorOriginHorizontal } }) => {
          const isRight = anchorOriginHorizontal === 'right';
          const isLeft = anchorOriginHorizontal === 'left';
          const recalculatedPosition = isLeft
            ? 'calc(8px + 328px)'
            : 'calc(50% + 328px / 2)';
          return isDev && !isRight && [recalculatedPosition, '!important'];
        },
      },
    };
  },
}))();
