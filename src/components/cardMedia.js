(() => ({
  name: 'CardMedia',
  type: 'CARD_MEDIA',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, usePublicFile } = B;
    const { CardMedia } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const {
      type,
      imageFileSource,
      propertyFileSource,
      videoFileSource,
      urlFileSource,
      iframeSource,
      urlSourceType,
      title,
      dataComponentAttribute,
    } = options;

    const titleText = useText(title);
    const iframeUrl = useText(iframeSource);
    const propValue = !isDev && propertyFileSource;
    const { url: imgSource = '', name: imgName = 'image' } =
      usePublicFile(imageFileSource) || {};
    const { url: videoSource = '#', name: videoName = 'video' } =
      usePublicFile(videoFileSource) || {};

    const isUrlImg = type === 'url' && urlSourceType === 'image';
    const isURLVideo = type === 'url' && urlSourceType === 'video';
    const isDataUrl = type === 'data' && propertyFileSource && propValue;
    const isImage = type === 'img' || isUrlImg || isDataUrl;
    const isVideo = type === 'video' || isURLVideo;
    const isIframe = type === 'iframe' && iframeUrl;
    const isData = type === 'data' || isDataUrl;
    const isEmpty = !isImage && !isVideo && !isIframe && !isData;
    const urlFileSourceText = useText(urlFileSource);
    const videoUrl = isURLVideo ? urlFileSourceText : videoSource;

    function getImgUrl() {
      switch (true) {
        case isDataUrl && propValue !== {}:
          return propValue[propertyFileSource.useKey];
        case isUrlImg:
          return urlFileSourceText;
        case type === 'img':
          return imgSource;
        default:
          return '';
      }
    }

    const [imgUrl, setImgUrl] = useState(getImgUrl());

    useEffect(() => {
      setImgUrl(getImgUrl());
    }, [imgSource, propValue, urlFileSourceText, type]);

    const variable =
      urlFileSource && urlFileSource.findIndex((v) => v.name) !== -1;
    const variableDev = env === 'dev' && (variable || imgUrl === '');

    useEffect(() => {
      if (isDataUrl && propValue) {
        setImgUrl(propValue[propertyFileSource.useKey]);
      }
    }, [propValue]);

    function ImgPlaceholder() {
      return (
        <svg className={classes.placeholder} width={86} height={48}>
          <title>{titleText}</title>
          <rect x="19.5" y="8.5" rx="2" />
          <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
        </svg>
      );
    }

    function VideoPlaceholder() {
      return (
        <svg className={classes.placeholder} width={48} height={31}>
          <g fill="none">
            <rect x=".5" y=".5" rx="2" />
            <g fill="#666D85">
              <path d="M26.575 8.526h-10.95C14.183 8.526 13 9.674 13 11.078v8.603c0 1.404 1.182 2.553 2.626 2.553h10.949c1.444 0 2.625-1.15 2.625-2.553v-8.603c0-1.43-1.181-2.552-2.625-2.552zM34.342 9.93a1.359 1.359 0 00-.446.178L29.8 12.406v5.922l4.122 2.297a1.585 1.585 0 002.153-.561c.132-.23.21-.485.21-.766V11.41c0-.944-.919-1.71-1.943-1.48z" />
            </g>
          </g>
        </svg>
      );
    }

    function IframePlaceholder() {
      return (
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
    }

    function Placeholder() {
      switch (true) {
        case isImage || isData:
          return <ImgPlaceholder />;
        case isVideo:
          return <VideoPlaceholder />;
        default:
          return <IframePlaceholder />;
      }
    }

    function PlaceholderComponent() {
      return (
        <div
          className={(isEmpty || variableDev) && classes.empty}
          data-component={useText(dataComponentAttribute) || 'CardMedia'}
        >
          <div className={classes.placeholderWrapper}>
            <Placeholder />
            {variable && <span>{imgUrl}</span>}
          </div>
        </div>
      );
    }

    function ImageComponent() {
      return (
        <img
          className={classes.media}
          src={imgUrl}
          title={titleText || imgName}
          alt={titleText || imgName}
          data-component={useText(dataComponentAttribute) || 'Media'}
        />
      );
    }

    function VideoComponent() {
      return (
        <video
          className={classes.media}
          src={videoUrl}
          title={titleText || videoName}
          controls
          data-component={useText(dataComponentAttribute) || 'Media'}
        />
      );
    }

    function IframeComponent() {
      return (
        <iframe
          className={classes.media}
          title={titleText}
          src={iframeUrl}
          data-component={useText(dataComponentAttribute) || 'CardMedia'}
        />
      );
    }

    let MediaComponent = PlaceholderComponent;

    if (isImage && !variableDev) {
      MediaComponent = ImageComponent;
    } else if (isVideo) {
      MediaComponent = VideoComponent;
    } else if (isIframe) {
      MediaComponent = IframeComponent;
    }

    const CardMediaComponent = (
      <CardMedia
        className={includeStyling()}
        title={titleText}
        component={MediaComponent}
      />
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      minHeight: 48,
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
      width: '100%',
    },
  }),
}))();
