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
      allowTextServerResponse,
    } = options;
    const { defineFunction = () => {}, env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const [open, setOpen] = useState(false);
    const text = useText(content);
    const [textFromServer, setTextFromServer] = useState('');

    const CloseIcon = Icons.Close;

    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const formatError = err => {
      const errorMessage =
        (err.graphQLErrors &&
          err.graphQLErrors[0] &&
          err.graphQLErrors[0].extensions.error) ||
        err.message;
      return errorMessage;
    };

    const cleanUpMessage = message =>
      message &&
      JSON.stringify(message)
        .replace(/[{}[\]_"]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .replace(/ :/g, ':')
        .replace(/ ,/g, ',')
        .trim();

    defineFunction('Show', showMessage => {
      if (typeof showMessage === 'string') setTextFromServer(showMessage);
      if (typeof showMessage === 'object' && showMessage !== null) {
        const errorMessage = formatError(showMessage);
        setTextFromServer(cleanUpMessage(errorMessage));
      }
      setOpen(true);
    });

    defineFunction('Hide', () => setOpen(false));
    defineFunction('Show/Hide', () => setOpen(s => !s));

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    const duration = autoHide ? autoHideDuration : null;

    const textContent =
      textFromServer && allowTextServerResponse ? textFromServer : text;

    let snackbarOptions = {
      open,
      autoHideDuration: isDev ? null : duration,
      onClose: handleClose,
      anchorOrigin: {
        horizontal: anchorOriginHorizontal,
        vertical: anchorOriginVertical,
      },
      key: textContent,
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
        message: textContent,
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
