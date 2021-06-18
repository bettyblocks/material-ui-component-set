(() => ({
  name: 'CarouselImage',
  type: 'STEP_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const { label, icon, imageSource } = options || {};
    const {
      stepLabelData,
      setStepLabelData,
      active,
      isFirstRender,
      parentHeight,
    } = parent;
    const imageSourceText = useText(imageSource);

    const ImgPlaceholder = () => (
      <svg className={classes.placeholder} width={86} height={48}>
        <title>placeholder</title>
        <rect x="19.5" y="8.5" rx="2" />
        <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
      </svg>
    );

    const StepContent =
      isEmpty && isDev ? (
        <div className={classes.empty} style={{ height: parentHeight }}>
          <div className={classes.placeholderWrapper}>
            <ImgPlaceholder />
          </div>
        </div>
      ) : (
        <div className={classes.root} style={{ height: parentHeight }}>
          <img src={imageSourceText} alt="carousel" />
        </div>
      );

    const StepCmp = <>{active ? StepContent : null}</>;

    useEffect(() => {
      if (active && !isFirstRender) {
        B.triggerEvent('OnStepActive');
      } else if (!active && !isFirstRender) {
        B.triggerEvent('OnStepInactive');
      }
    }, [active, isFirstRender]);

    useEffect(() => {
      if (setStepLabelData) {
        setStepLabelData({
          ...stepLabelData,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
        });
      }
    }, [setStepLabelData, index, label, icon]);

    return isDev ? <div className={classes.wrapper}>{StepCmp}</div> : StepCmp;
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    empty: {
      position: 'relative',
      backgroundColor: '#F0F1F5',
      border: '0.0625rem dashed #AFB5C8',
      height: 300,
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
  }),
}))();
