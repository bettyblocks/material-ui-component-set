(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip } = window.MaterialUI.Core;
    const { label, disabled, variant } = options;
    const isDev = B.env === 'dev';
    const ChipComponent = (
      <Chip
        className={[
          classes.root,
          variant === 'default' ? classes.chip : classes.outlined,
        ].join(' ')}
        label={label}
        disabled={disabled}
        variant={variant}
      />
    );
    return isDev ? <span>{ChipComponent}</span> : ChipComponent;
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      root: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
      },
      chip: {
        backgroundColor: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
      outlined: {
        backgroundColor: 'transparent !important',
        '&.MuiChip-outlined': {
          borderColor: ({ options: { color } }) => [
            style.getColor(color),
            '!important',
          ],
        },
      },
    };
  },
}))();
