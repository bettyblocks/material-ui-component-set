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
    const [open, setOpen] = useState(options.visible);

    useEffect(() => {
      setOpen(options.visible);
    }, [options.visible]);

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
          options.collapsable && (
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          )
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
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
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
