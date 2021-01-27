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
    } = options;

    const titleText = useText(title);
    const videoUrl = useText(videoSource);
    const iframeUrl = useText(iframeSource);
    const imageSourceText = useText(imageSource);
    const [imgUrl, setImgUrl] = useState(imageSourceText);

    useEffect(() => {
      setImgUrl(imageSourceText);
    }, [imageSourceText]);

    B.defineFunction('SetCustomImage', url => {
      setImgUrl(url);
    });

    B.defineFunction('RemoveCustomImage', () => {
      setImgUrl(imageSourceText);
    });

    const isImage = type === 'img' && imgUrl;
    const isVideo = type === 'video' && videoUrl;
    const isIframe = type === 'iframe' && iframeUrl;
    const isEmpty = !isImage && !isVideo && !isIframe;

    const variable = imageSource && imageSource.findIndex(v => v.name) !== -1;
    const variableDev = env === 'dev' && (variable || !imgUrl);

    const ImgPlaceholder = () => (
      <svg className={classes.placeholder} width={86} height={48}>
        <title>{titleText}</title>
        <rect x="19.5" y="8.5" rx="2" />
        <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
      </svg>
    );
    const VideoPlaceholder = () => (
      <svg className={classes.placeholder} width={48} height={31}>
        <g fill="none">
          <rect x=".5" y=".5" rx="2" />
          <g fill="#666D85">
            <path d="M26.575 8.526h-10.95C14.183 8.526 13 9.674 13 11.078v8.603c0 1.404 1.182 2.553 2.626 2.553h10.949c1.444 0 2.625-1.15 2.625-2.553v-8.603c0-1.43-1.181-2.552-2.625-2.552zM34.342 9.93a1.359 1.359 0 00-.446.178L29.8 12.406v5.922l4.122 2.297a1.585 1.585 0 002.153-.561c.132-.23.21-.485.21-.766V11.41c0-.944-.919-1.71-1.943-1.48z" />
          </g>
        </g>
      </svg>
    );

    const IframePlaceholder = () => (
      <svg className={classes.placeholder} width={48} height={31}>
        <g fill="none">
          <rect x=".5" y=".5" rx="2" />
          <path
            d="M17.875 20.413v-1.78a.708.708 0 00-.1-.37.809.809 0 00-.328-.289l-3.609-1.892a3.258 3.258 0 00-.482-.208 6.559 6.559 0 00-.542-.156c.192-.048.373-.1.542-.157.169-.058.33-.127.482-.208l3.61-1.882a.809.809 0 00.328-.289.708.708 0 00.099-.369v-1.781L10 15.212v1.012l7.875 4.19zm3.132 3.087c.126 0 .255-.02.388-.06.132-.041.258-.1.378-.178.119-.077.225-.174.318-.288.093-.115.169-.25.229-.405L28.077 7.5h-1.044a1.28 1.28 0 00-.766.228c-.212.152-.374.37-.487.652L19.973 23.5h1.034zm9.118-3.087L38 16.223v-1.011l-7.875-4.18v1.781c0 .135.033.258.1.37a.809.809 0 00.328.288l3.609 1.882c.152.081.313.15.482.208.17.057.35.11.542.157a4.682 4.682 0 00-1.024.364l-3.61 1.892a.809.809 0 00-.328.289.708.708 0 00-.099.37v1.78z"
            fill="#666D85"
          />
        </g>
      </svg>
    );

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

    let MediaComponent = () => {
      if (!isDev) return null;
      return (
        <div className={[(isEmpty || variableDev) && classes.empty]}>
          <div className={classes.placeholderWrapper}>
            <Placeholder />
            {variable && <span>{imgUrl}</span>}
          </div>
        </div>
      );
    };

    if (isImage && !variableDev) {
      MediaComponent = () => (
        <img
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
          className={classes.media}
          src={videoUrl}
          title={titleText}
          controls
        />
      );
    } else if (isIframe) {
      MediaComponent = () => (
        <iframe className={classes.media} title={titleText} src={iframeUrl} />
      );
    }

    return (
      <div
        className={[
          classes.outerSpacing,
          isDev ? classes.devWrapper : '',
          !isEmpty && !variable ? classes.hasContent : '',
        ].join(' ')}
      >
        <MediaComponent />
      </div>
    );
  })(),
  styles: B => theme => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      devWrapper: {
        display: 'flex',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      hasContent: {
        width: 'fit-content',
        height: 'fit-content',
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

        '& rect': {
          stroke: '#AFB5C8',
          fill: '#F7F8FA',
          width: 47,
          height: 30,
        },

        '& > path': {
          fill: '#666D85',
        },
      },
      media: {
        width: ({ options: { width } }) => width,
        height: ({ options: { height } }) => height,
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
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
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
