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
      runTimeVisibility,
      anchorOriginHorizontal,
      anchorOriginVertical,
      autoHide,
      autoHideDuration,
      content,
      allowTextServerResponse,
      dataComponentAttribute,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    // Because custom boolean option returns false as a string, do an additonal check
    const componentVisibility = isDev ? visible : runTimeVisibility !== 'false';
    const [open, setOpen] = useState(componentVisibility);
    const text = useText(content);
    const [textFromServer, setTextFromServer] = useState('');

    const CloseIcon = Icons.Close;

    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const formatError = (err) => {
      const errorMessage =
        (err.graphQLErrors &&
          err.graphQLErrors[0] &&
          err.graphQLErrors[0].extensions.error) ||
        err.message;
      return errorMessage;
    };

    const cleanUpMessage = (message) =>
      message &&
      JSON.stringify(message)
        .replace(/[{}[\]_"]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .replace(/ :/g, ':')
        .replace(/ ,/g, ',')
        .trim();

    B.defineFunction('Show', (showMessage) => {
      if (typeof showMessage === 'string') setTextFromServer(showMessage);
      if (typeof showMessage === 'object' && showMessage !== null) {
        const errorMessage = formatError(showMessage);
        setTextFromServer(cleanUpMessage(errorMessage));
      }
      setOpen(true);
    });

    B.defineFunction('Hide', () => setOpen(false));
    B.defineFunction('Show/Hide', () => setOpen((s) => !s));

    useEffect(() => {
      setOpen(componentVisibility);
    }, [componentVisibility]);

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
      'data-component': useText(dataComponentAttribute) || 'Snackbar',
    };

    if (isEmpty) {
      snackbarOptions = {
        ...snackbarOptions,
        message: textContent,
      };
    }

    const SnackbarCmp = (
      <Snackbar className={classes.snackBar} {...snackbarOptions}>
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
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    return {
      snackBar: {
        '& .MuiSnackbarContent-root': {
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),

          fontSize: ({ options: { font } }) => style.getFontSize(font),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Desktop'),
          },
          transition: () => [
            'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            '!important',
          ],
        },
      },
      root: {
        '& .MuiSnackbarContent-root': {
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),

          fontSize: ({ options: { font } }) => style.getFontSize(font),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Desktop'),
          },
          transition: () => [
            'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            '!important',
          ],
        },

        zIndex: [9, '!important'],
        left: ({ options: { anchorOriginHorizontal } }) => {
          const isRight = anchorOriginHorizontal === 'right';
          const isLeft = anchorOriginHorizontal === 'left';
          const recalculatedPosition = isLeft
            ? 'calc(8px + 328px)'
            : 'calc(50% + 328px / 2)';
          return !isRight && [recalculatedPosition, '!important'];
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
    };
  },
}))();
