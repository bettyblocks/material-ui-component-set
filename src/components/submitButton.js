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
    return {
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      contained: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
    };
  },
}))();
