(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip, Avatar } = window.MaterialUI.Core;
    const { env, useText, Icon } = B;
    const {
      label,
      disabled,
      variant,
      startIcon,
      avatar,
      imgUrl,
      avatarType,
      size,
      dataComponentAttribute,
    } = options;
    const isDev = env === 'dev';

    const imgSrc = imgUrl && useText(imgUrl);
    const AvatarImage = <Avatar alt="" src={imgSrc} />;
    const AvatarText = <Avatar>{avatar}</Avatar>;
    let AvatarComponent;
    if (avatarType === 'text') {
      AvatarComponent = AvatarText;
    } else if (avatarType === 'image') {
      AvatarComponent = AvatarImage;
    }

    const ChipComponent = (
      <Chip
        className={includeStyling(
          [
            classes.root,
            variant === 'default' ? classes.chip : classes.outlined,
          ].join(' '),
        )}
        label={useText(label)}
        disabled={disabled}
        variant={variant}
        icon={
          avatarType === 'icon' && startIcon !== 'None' ? (
            <Icon name={startIcon} />
          ) : undefined
        }
        avatar={AvatarComponent}
        size={size}
        data-component={useText(dataComponentAttribute) || 'Chip'}
      />
    );
    return isDev ? (
      <div className={classes.wrapper}>{ChipComponent}</div>
    ) : (
      ChipComponent
    );
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const convertSizes = (sizes) =>
      sizes.map((size) => style.getSpacing(size)).join(' ');
    return {
      wrapper: {
        display: 'inline-block',
        '& $root': {
          '& .MuiChip-label': {
            fontSize: ({ options: { font } }) => style.getFontSize(font),
            fontFamily: ({ options: { font } }) => style.getFontFamily(font),

            [`@media ${mediaMinWidth(600)}`]: {
              fontSize: ({ options: { font } }) =>
                style.getFontSize(font, 'Portrait'),

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
          height: ({ options: { size } }) => size === 'small' && '0.75em',
        },
        '& .MuiChip-label': {
          fontSize: ({ options: { font } }) => style.getFontSize(font),
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),

          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),

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
