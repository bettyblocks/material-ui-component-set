(() => ({
  name: 'Media',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const {
      type,
      imageSource,
      videoSource,
      iframeSource,
      imgAlt,
      title,
      width,
      height,
    } = options;

    const titleText = useText(title);
    const imgUrl = useText(imageSource);
    const videoUrl = useText(videoSource);
    const iframeUrl = useText(iframeSource);

    const isImage = type === 'img' && imgUrl;
    const isVideo = type === 'video' && videoUrl;
    const isIframe = type === 'iframe' && iframeUrl;
    const isEmpty = !titleText && !isImage && !isVideo && !isIframe;

    const variable = imageSource && imageSource.findIndex(v => v.name) !== -1;
    const variableDev = env === 'dev' && (variable || !imgUrl);

    const ImgPlaceholder = () => (
      <svg className={classes.placeholder} viewBox="0 0 86 48">
        <title>{titleText}</title>
        <rect x="19.5" y="8.5" rx="2" />
        <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
      </svg>
    );
    const VideoPlaceholder = () => <div>Temp video placeholder</div>;

    const IframePlaceholder = () => <div>Temp iframe placeholder</div>;

    const Placeholder = () => {
      switch (type) {
        case 'img':
          return <ImgPlaceholder />;
        case 'video':
          return <VideoPlaceholder />;
        default:
          return <IframePlaceholder />;
      }
    };

    let MediaComponent = () => (
      <div className={[(isEmpty || variableDev) && classes.empty]}>
        <div className={classes.placeholderWrapper}>
          <Placeholder />
          {variable && <span>{imgUrl}</span>}
        </div>
      </div>
    );

    if (isImage && !variableDev) {
      MediaComponent = () => (
        <img
          width={width}
          height={height}
          className={classes.media}
          src={imgUrl}
          title={titleText}
          alt={imgAlt}
        />
      );
    } else if (isVideo) {
      MediaComponent = () => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          width={width}
          height={height}
          className={classes.media}
          src={videoUrl}
          title={titleText}
          controls
        />
      );
    } else if (isIframe) {
      MediaComponent = () => (
        <iframe
          width={width}
          height={height}
          className={classes.media}
          title={titleText}
          src={iframeUrl}
        />
      );
    }

    return (
      <div
        className={[classes.outerSpacing, isDev ? classes.devWrapper : ''].join(
          ' ',
        )}
      >
        <MediaComponent />
      </div>
    );
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      devWrapper: {
        display: 'flex',
      },
      empty: {
        position: 'relative',
        width: ({ options: { width } }) => width || '100%',
        height: ({ options: { height } }) => height || 'inherit',
        backgroundColor: '#F0F1F5',
        border: '0.0625rem dashed #AFB5C8',
        paddingBottom: ({ options: { height } }) =>
          (!height || height === '100%') && '62.5%',
      },
      placeholderWrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
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

      outerSpacing: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${B.mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
