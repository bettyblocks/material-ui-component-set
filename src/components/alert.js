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
    const { env, useText } = B;
    const { visible, icon, collapsable, titleText, bodyText } = options;
    const title = useText(titleText);
    const body = useText(bodyText);
    const isDev = env === 'dev';
    const [open, setOpen] = useState(visible);

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

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
        icon={icon !== 'None' ? React.createElement(Icons[icon]) : null}
        action={
          collapsable ? (
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
        {title && <AlertTitle>{title}</AlertTitle>}
        {body}
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
        border: ({ options: { borderColor } }) =>
          borderColor !== 'Transparent'
            ? `0.0625rem solid ${style.getColor(borderColor)}`
            : 'none',
        justifyContent: ({ options: { horizontalAlignment } }) =>
          horizontalAlignment,
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
