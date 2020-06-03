(() => ({
  name: 'Avatar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Avatar } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText } = B;
    const { type, imgUrl, imgAlt, letter, icon, variant } = options;

    const isDev = env === 'dev';
    const imgSrc = useText(imgUrl);

    const IconComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const AvatarComponent = (
      <Avatar
        variant={variant}
        alt={type === 'img' && imgAlt}
        src={type === 'img' && imgSrc}
        className={classes.avatar}
      >
        {type === 'letter' ? useText(letter) : null}
        {type === 'icon' ? IconComponent : null}
      </Avatar>
    );

    return isDev ? (
      <span className={classes.wrapper}>{AvatarComponent}</span>
    ) : (
      AvatarComponent
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      wrapper: {
        display: 'inline-block',
      },
      avatar: {
        backgroundColor: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
        width: ({ options: { width } }) => `${width} !important` || 'auto',
        height: ({ options: { height } }) => `${height} !important` || 'auto',
      },
    };
  },
}))();
