(() => ({
    name: 'Typography',
    type: 'CONTENT_COMPONENT',
    allowedTypes: ['SPAN'],
    orientation: 'VERTICAL',
    jsx: (() => {
      const { Typography } = window.MaterialUI.Core;
      const { variant, gutterBottom, display, align, color } = options;
      const isDev = B.env === 'dev';
      const isEmpty = children.length === 0;
      const isPristine = isEmpty && isDev;

      const typography = (
        <Typography
          align={align}
          variant={variant}
          gutterBottom={gutterBottom}
          display={display}
          color={color}
        >
          {isPristine ? "Textbox" : children}
        </Typography>
      );

      return isDev ? <span>{typography}</span> : typography;
    })(),
    styles: () => () => ({}),
  }))();
  