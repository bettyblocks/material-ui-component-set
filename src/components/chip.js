(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip, Avatar } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText } = B;
    const {
      label,
      disabled,
      variant,
      startIcon,
      avatar,
      avatartype,
      size,
    } = options;
    const isDev = env === 'dev';

    const AvatarImage = <Avatar alt="" src={avatar} />;
    const AvatarText = <Avatar>{avatar}</Avatar>;
    const AvatarComponent = avatartype === 'text' ? AvatarText : AvatarImage;

    const ChipComponent = (
      <Chip
        className={[
          classes.root,
          variant === 'default' ? classes.chip : classes.outlined,
        ].join(' ')}
        label={useText(label)}
        disabled={disabled}
        variant={variant}
        icon={
          startIcon !== 'None'
            ? React.createElement(Icons[startIcon])
            : undefined
        }
        avatar={avatar && AvatarComponent}
        size={size}
      />
    );
    return isDev ? (
      <div className={classes.wrapper}>{ChipComponent}</div>
    ) : (
      ChipComponent
    );
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        '& .MuiChip-icon': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
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
