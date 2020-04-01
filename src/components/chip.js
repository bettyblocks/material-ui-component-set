(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip } = window.MaterialUI.Core;
    const { label, disabled, variant } = options;
    const isDev = B.env === 'dev';
    const chip = (
      <Chip
        className={classes.chip}
        label={label}
        disabled={disabled}
        variant={variant}
      />
    );
    return isDev ? <span>{chip}</span> : chip;
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      chip: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        backgroundColor: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
    };
  },
}))();
