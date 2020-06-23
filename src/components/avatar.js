(() => ({
  name: 'Avatar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Avatar } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText } = B;
    const {
      type,
      imgUrl,
      imgAlt,
      letter,
      icon,
      variant,
      width,
      height,
    } = options;

    const isDev = env === 'dev';
    const isIcon = type === 'icon';
    const isLetter = type === 'letter';
    const isImage = type === 'img';

    const imgSrc = useText(imgUrl);
    const altText = useText(imgAlt);

    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const styleOptions = {
      width,
      height,
    };

    const AvatarComponent = (
      <Avatar
        variant={variant}
        alt={isImage && altText}
        src={isImage && imgSrc}
        classes={{ root: classes.avatar }}
        style={styleOptions}
      >
        {isLetter ? useText(letter) : null}
        {isIcon ? IconComponent : null}
      </Avatar>
    );

    return isDev ? <div>{AvatarComponent}</div> : AvatarComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
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
      },
    };
  },
}))();
