(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip, Avatar } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText, useEndpoint, useAction } = B;
    const {
      label,
      disabled,
      variant,
      startIcon,
      avatar,
      imgUrl,
      avatartype,
      size,
      linkType,
      linkTo,
      linkToExternal,
      actionId,
    } = options;
    const isDev = env === 'dev';
    const isAction = linkType === 'action';
    const href = linkType === 'external' ? linkToExternal : useEndpoint(linkTo);

    const [actionCallback, { loading }] = (isAction &&
      useAction(actionId, {
        onCompleted(data) {
          B.triggerEvent('onActionSuccess', data.actionb5);
        },
        onError(error) {
          B.triggerEvent('onActionError', error.message);
        },
      })) || [() => {}, { loading: false }];

    useEffect(() => {
      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    const imgSrc = imgUrl && useText(imgUrl);
    const AvatarImage = <Avatar alt="" src={imgSrc} />;
    const AvatarText = <Avatar>{avatar}</Avatar>;
    let AvatarComponent;
    if (avatartype === 'text') {
      AvatarComponent = AvatarText;
    } else if (avatartype === 'image') {
      AvatarComponent = AvatarImage;
    }

    const doRedirect = () => {
      const history = useHistory();
      history.push(href);
    };

    const handleClick = () => (isAction ? actionCallback() : doRedirect());

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
          avatartype === 'icon' && startIcon !== 'None'
            ? React.createElement(Icons[startIcon])
            : undefined
        }
        avatar={AvatarComponent}
        size={size}
        onClick={linkType !== 'none' && handleClick}
      />
    );

    return isDev ? <div>{ChipComponent}</div> : ChipComponent;
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
