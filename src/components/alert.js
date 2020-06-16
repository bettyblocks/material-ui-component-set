(() => ({
  name: 'Alert',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Alert, AlertTitle } = window.MaterialUI.Lab;
    const { Close } = window.MaterialUI.Icons;
    const { Icons } = window.MaterialUI;
    const { IconButton } = window.MaterialUI.Core;

    const isDev = B.env === 'dev';
    const [open, setOpen] = useState(true);

    useEffect(() => {
      setOpen(options.visible);
    }, [options.visible]);

    useEffect(() => {
      B.defineFunction('Show', () => {
        setOpen(true);
      });

      B.defineFunction('Hide', () => {
        setOpen(false);
      });
    }, []);

    const AlertPanel = (
      <Alert
        classes={{
          root: classes.root,
        }}
        className={open || isDev ? '' : classes.hide}
        icon={
          options.icon !== 'None'
            ? React.createElement(Icons[options.icon])
            : null
        }
        action={
          options.collapsable ? (
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          ) : null
        }
      >
        {options.titleText.length > 0 && (
          <AlertTitle>
            <B.Text value={options.titleText} />
          </AlertTitle>
        )}
        <B.Text value={options.bodyText} />
      </Alert>
    );
    return isDev ? (
      <div className={classes.wrapper}>{AlertPanel}</div>
    ) : (
      AlertPanel
    );
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        '&.MuiAlert-standardSuccess': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          backgroundColor: ({ options: { background } }) => [
            style.getColor(background),
            '!important',
          ],
        },
        '& .MuiAlert-icon': {
          color: ({ options: { iconColor } }) => [
            style.getColor(iconColor),
            '!important',
          ],
        },
        '& .MuiAlert-action': {
          marginBottom: "auto",
        },
        '& .MuiAlert-message': {
          padding: "8px 0 9px",
        },
        border: ({ options: { borderColor }}) => borderColor !== 'Transparent' ? `1px solid ${style.getColor(borderColor)}` : 'none',
        justifyContent: ({ options: { horizontalAlignment } }) => horizontalAlignment,
        alignItems: ({ options: { verticalAlignment } }) => verticalAlignment,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
      },
      hide: {
        display: 'none !important',
      },
    };
  },
}))();
