(() => ({
  name: 'Alert',
  icon: 'AlertIcon',
  category: 'CONTENT',
  type: 'ALERT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Alert } = window.MaterialUI.Lab;

    const isDev = B.env === 'dev';
    const AlertPanel = (
      <Alert
        classes={{
          root: classes.root,
        }}
      >
        {options.titleText}
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
        '&.MuiAlert-icon': {
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
        width: ({ options: { outerSpacing } }) =>
          `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
            outerSpacing[3],
          )})`,
      },
    };
  },
}))();
