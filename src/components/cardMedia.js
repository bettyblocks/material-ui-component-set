(() => ({
  name: 'CardMedia',
  type: 'CARD_MEDIA',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { CardMedia } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const { type, imageSource, videoSource, iframeSource, title } = options;

    const titleText = isDev
      ? title.map(t => (t.name ? t.name : t)).join(' ')
      : useText(title);

    const isImage = type === 'img' && imageSource !== '';
    const isVideo = type === 'video' && videoSource !== '';
    const isIframe = type === 'iframe' && iframeSource !== '';
    const isEmpty = !titleText && !isImage && !isVideo && !isIframe;

    let MediaComponent = () => (
      <div className={isEmpty && classes.empty}>
        <div className={classes.placeholderWrapper}>
          <svg className={classes.placeholder} viewBox="0 0 86 48">
            <title>{titleText}</title>
            <rect x="19.5" y="8.5" rx="2" />
            <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
          </svg>
        </div>
      </div>
    );
    if (isImage) {
      MediaComponent = () => (
        <img
          className={classes.media}
          src={imageSource}
          title={titleText}
          alt={titleText}
        />
      );
    } else if (isVideo) {
      MediaComponent = () => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className={classes.media}
          src={videoSource}
          title={titleText}
          controls
        />
      );
    } else if (isIframe) {
      MediaComponent = () => (
        <iframe
          className={classes.media}
          title={titleText}
          src={iframeSource}
        />
      );
    }

    const CardMediaComponent = (
      <CardMedia title={titleText} component={MediaComponent} />
    );

    return isDev ? (
      <div className={classes.root}>{CardMediaComponent}</div>
    ) : (
      CardMediaComponent
    );
  })(),
  styles: () => () => ({
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      backgroundColor: '#F0F1F5',
      border: '0.0625rem dashed #AFB5C8',
    },
    placeholderWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholder: {
      maxHeight: '100%',
      width: 86,
      height: 48,

      '& > rect': {
        stroke: '#AFB5C8',
        fill: '#F7F8FA',
        width: 47,
        height: 31,
      },

      '& > path': {
        fill: '#666D85',
      },
    },
    media: {
      width: '100%',
    },
  }),
}))();
