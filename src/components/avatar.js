(() => ({
  name: 'Avatar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Avatar } = window.MaterialUI.Core;
    const { env, useText, Icon } = B;
    const {
      type,
      imgUrl,
      imgAlt,
      letter,
      icon,
      variant,
      width,
      height,
      dataComponentAttribute,
    } = options;

    const isDev = env === 'dev';
    const isIcon = type === 'icon';
    const isLetter = type === 'letter';
    const isImage = type === 'img';

    const imgSrc = useText(imgUrl);
    const altText = useText(imgAlt);

    const IconComponent = <Icon name={icon} />;

    const styleOptions = {
      width,
      height,
    };

    const AvatarComponent = (
      <Avatar
        variant={variant}
        alt={isImage && altText}
        src={isImage && imgSrc}
        className={includeStyling(classes.avatar)}
        style={styleOptions}
        data-component={useText(dataComponentAttribute) || 'Avatar'}
      >
        {isLetter && useText(letter)}
        {isIcon && IconComponent}
      </Avatar>
    );

    return isDev ? <div>{AvatarComponent}</div> : AvatarComponent;
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    const convertSizes = (sizes) =>
      sizes.map((size) => style.getSpacing(size)).join(' ');
    return {
      avatar: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        fontWeight: ({ options: { fontWeight } }) => fontWeight,
        '&.MuiAvatar-root': {
          fontSize: ({ options: { fontSize } }) => fontSize,
          '& .MuiSvgIcon-root': {
            fontSize: ({ options: { fontSize } }) => fontSize,
          },
        },
      },
    };
  },
}))();
