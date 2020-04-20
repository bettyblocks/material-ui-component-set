(() => ({
  name: 'CardHeader',
  type: 'CARD_HEADER',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { CardHeader, Avatar } = window.MaterialUI.Core;
    const { avatar, avatarType, title, subheader } = options;

    const AvatarImage = <Avatar alt="" src={avatar} />;
    const AvatarText = <Avatar>{avatar}</Avatar>;
    const AvatarComponent = avatarType === 'text' ? AvatarText : AvatarImage;

    const isEmpty = !avatar && !title.length && !subheader.length;
    const isPristine = isEmpty && isDev;

    const CardHeaderComponent = (
      <CardHeader
        avatar={avatar && AvatarComponent}
        title={
          isDev
            ? title.map(t => (t.name ? t.name : t)).join(' ')
            : useText(title)
        }
        subheader={
          isDev
            ? subheader.map(s => (s.name ? s.name : s)).join(' ')
            : useText(subheader)
        }
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    return isDev ? <div>{CardHeaderComponent}</div> : CardHeaderComponent;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
      height: '100%',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      '& > div': {
        display: 'none',
      },
      '&::after': {
        content: '"Card Header"',
      },
    },
  }),
}))();
