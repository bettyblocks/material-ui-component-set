(() => ({
  name: 'Alert',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Alert, AlertTitle } = window.MaterialUI.Lab;
    const { IconButton } = window.MaterialUI.Core;
    const { env, useText, Icon } = B;
    const {
      visible,
      icon,
      collapsable,
      titleText,
      bodyText,
      allowTextServerResponse,
      allowTitleServerResponse,
      dataComponentAttribute,
    } = options;
    const title = useText(titleText);
    const body = useText(bodyText);
    const isDev = env === 'dev';
    const [open, setOpen] = useState(visible);
    const [titleFromServer, setTitleFromServer] = useState('');
    const [textFromServer, setTextFromServer] = useState('');

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    const formatError = (err) => {
      const readMessages = (obj) => {
        if (Array.isArray(obj)) {
          return obj.flatMap((e) => readMessages(e));
        }

        if (obj.message) {
          return readMessages(obj.message);
        }

        if (obj.errors) {
          return readMessages(obj.errors);
        }

        return [obj];
      };

      if (err.errors || err.graphQLErrors) {
        const messages = readMessages(err.errors || err.graphQLErrors);

        const errorMessage =
          messages.length > 0
            ? messages
            : err.networkError && err.networkError.message;

        const error = err.errors ? err.errors[0] : err.graphQLErrors[0];
        const errorTitle =
          error.extensions.error || error.extensions.statusCode || err.message;
        return [errorTitle, errorMessage];
      }

      const errorMessage =
        (err.graphQLErrors &&
          err.graphQLErrors[0] &&
          err.graphQLErrors[0].extensions.error) ||
        err.message;
      const errorTitle =
        (err.graphQLErrors &&
          err.graphQLErrors[0] &&
          err.graphQLErrors[0].message) ||
        (err.networkError && err.networkError.message);
      return [errorTitle, errorMessage];
    };

    const cleanUpMessage = (message) =>
      message &&
      JSON.stringify(message)
        .replace(/[{}[\]_"]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .replace(/ :/g, ':')
        .replace(/ ,/g, ',')
        .trim();

    useEffect(() => {
      B.defineFunction('Show', (showMessage) => {
        if (typeof showMessage === 'string') setTextFromServer(showMessage);
        if (typeof showMessage === 'object' && showMessage !== null) {
          const [errorTitle, errorMessage] = formatError(showMessage);
          setTextFromServer(cleanUpMessage(errorMessage));
          setTitleFromServer(errorTitle);
        }
        setOpen(true);
      });

      B.defineFunction('Hide', () => setOpen(false));
      B.defineFunction('Show/Hide', () => setOpen((s) => !s));
    }, []);

    const AlertPanel = (
      <Alert
        classes={{
          root: classes.root,
        }}
        className={open || isDev ? '' : classes.hide}
        icon={icon !== 'None' ? <Icon name={icon} /> : null}
        action={
          collapsable ? (
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon name="Close" />
            </IconButton>
          ) : null
        }
        data-component={useText(dataComponentAttribute) || 'Alert'}
      >
        {(title || titleFromServer) && (
          <AlertTitle>
            {titleFromServer && allowTitleServerResponse
              ? titleFromServer
              : title}
          </AlertTitle>
        )}
        {textFromServer && allowTextServerResponse ? textFromServer : body}
      </Alert>
    );
    return isDev ? (
      <div className={classes.wrapper}>{AlertPanel}</div>
    ) : (
      AlertPanel
    );
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
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
        '& .MuiAlertTitle-root': {
          fontFamily: ({ options: { titleFont } }) =>
            style.getFontFamily(titleFont),
          fontSize: ({ options: { titleFont } }) =>
            style.getFontSize(titleFont),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { titleFont } }) =>
              style.getFontSize(titleFont, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { titleFont } }) =>
              style.getFontSize(titleFont, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { titleFont } }) =>
              style.getFontSize(titleFont, 'Desktop'),
          },
        },
        '& .MuiAlert-message': {
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
        },
      },
      hide: {
        display: 'none !important',
      },
    };
  },
}))();
