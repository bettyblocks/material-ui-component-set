(() => ({
  name: 'CardHeader',
  type: 'CARD_HEADER',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { CardHeader, Avatar } = window.MaterialUI.Core;
    const { avatar, avatarType, title, subHeader, dataComponentAttribute } =
      options;

    const avatarSource = useText(avatar);
    const avatarTitle = useText(title);
    const avatarSubheader = useText(subHeader);
    const AvatarImage = <Avatar alt="" src={avatarSource} />;
    const AvatarText = <Avatar>{avatarSource}</Avatar>;
    const AvatarComponent = avatarType === 'text' ? AvatarText : AvatarImage;

    const isEmpty = !avatar && !title.length && !subHeader.length;
    const isPristine = isEmpty && isDev;

    const CardHeaderComponent = (
      <CardHeader
        avatar={avatarSource && AvatarComponent}
        title={avatarTitle}
        subheader={avatarSubheader}
        className={includeStyling(
          [
            isEmpty ? classes.empty : '',
            isPristine ? classes.pristine : '',
          ].join(' '),
        )}
        data-component={useText(dataComponentAttribute) || 'CardHeader'}
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
