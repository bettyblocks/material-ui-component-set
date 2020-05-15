(() => ({
  name: 'Avatar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Avatar } = window.MaterialUI.Core;
    const { env } = B;
    const isDev = env === 'dev';
    const { imgUrl, imgAlt } = options;

    const AvatarComponent = (
      <Avatar alt={imgAlt} src={imgUrl} className={classes.avatar}>
        {children}
      </Avatar>
    );

    return isDev ? <div>{AvatarComponent}</div> : AvatarComponent;
  })(),
  styles: () => () => ({
    avatar: {
      width: ({ options: { width } }) => width || 'auto',
      height: ({ options: { height } }) => height || 'auto',
    },
  }),
}))();
