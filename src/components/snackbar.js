(() => ({
  name: 'Snackbar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Snackbar } = window.MaterialUI.Core;
    const {
      isOpen,
      anchorOriginHorizontal,
      anchorOriginVertical,
      autoHide,
    } = options;
    const { env } = B;
    const isEmpty = children.length === 0;
    const isDev = env === 'dev';

    const [open, setOpen] = useState(false);
    const anchorOrigin = {
      horizontal: anchorOriginHorizontal,
      vertical: anchorOriginVertical,
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    useEffect(() => {
      B.defineFunction('Show', () => {
        setOpen(true);
      });

      B.defineFunction('Hide', () => {
        setOpen(false);
      });
    }, []);

    const snackbar = (
      <div>
        {isDev && (
          <div className={classes.pristine}>Snackbar (Drop Components)</div>
        )}
        <Snackbar
          open={isDev ? isOpen : open}
          autoHideDuration={autoHide}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
        >
          <div>{!isEmpty ? children : ''}</div>
        </Snackbar>
      </div>
    );

    return isDev ? <div>{snackbar}</div> : snackbar;
  })(),
  styles: () => () => ({
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
