(() => ({
  name: 'SubmitButton',
  type: 'SUBMIT_BUTTON',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Button } = window.MaterialUI.Core;
    const { variant, disabled, fullWidth, size } = options;
    const isDev = B.env === 'dev';
    const SubmitButton = (
      <Button
        fullWidth={fullWidth}
        disabled={disabled}
        variant={variant}
        size={size}
        classes={{
          root: classes.root,
          contained: classes.contained,
          outlined: classes.outlined,
        }}
        type="submit"
      >
        {options.buttonText}
      </Button>
    );
    return isDev ? (
      <div className={classes.wrapper}>{SubmitButton}</div>
    ) : (
      SubmitButton
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      root: {
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        '&.MuiButton-root': {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0]),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1]),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2]),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3]),

          [`@media ${B.mediaMinWidth(768)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Portrait'),
          },
          [`@media ${B.mediaMinWidth(1024)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Landscape'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Landscape'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Landscape'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Landscape'),
          },
          [`@media ${B.mediaMinWidth(1200)}`]: {
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Desktop'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Desktop'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Desktop'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Desktop'),
          },
        },
      },
      contained: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      outlined: {
        borderColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
    };
  },
}))();
