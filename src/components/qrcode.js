(() => ({
  name: 'QRCode',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'QRCode',
      package: 'npm:react-qr-code@2.0.11',
      imports: ['*'],
    },
  ],
  jsx: (() => {
    const { useText } = B;
    const { QRCode } = dependencies;
    const { value, bgColor, fgColor, level, size } = options;
    const { default: QRCodeReact } = QRCode;

    const qrvalue = useText(value);

    return (
      <div className={classes.root}>
        <QRCodeReact
          size={size}
          value={qrvalue}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
        />
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    return {
      root: {
        height: 'auto',
        margin: '0 auto',
        width: 'auto',
      },
    };
  },
}))();
