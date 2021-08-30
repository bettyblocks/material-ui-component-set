(() => ({
  name: 'Carousel',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['STEP_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { MobileStepper, Button, IconButton } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText, Children, useAllQuery, useFilter, getProperty } = B;
    const {
      activeStep: stepIndex,
      allImages,
      buttonNext,
      buttonPrev,
      variant,
      autoplay,
      duration,
      select,
      model,
      filter,
      continousLoop,
      height,
      orderProperty,
      sortOrder,
      property,
      maxImages,
    } = options;
    const { KeyboardArrowLeft, KeyboardArrowRight } = Icons;

    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const activeStepIndex = parseInt(stepIndex - 1, 10) || 0;
    const [activeStep, setActiveStep] = useState(activeStepIndex);
    const buttonNextText = useText(buttonNext);
    const buttonPrevText = useText(buttonPrev);
    const numRendersRef = useRef(1);
    const [stepLabelData, setStepLabelData] = useState({});
    let orderPropertyPath = null;
    if (orderProperty && Array.isArray(orderProperty)) {
      orderPropertyPath = orderProperty;
    } else if (orderProperty && orderProperty) {
      orderPropertyPath = [orderProperty];
    }
    const { name: propertyName } = getProperty(property) || {};
    const [results, setResults] = useState([]);
    const createSortObject = (fields, order) => {
      const sort = fields.reduceRight((acc, propertyFilter, index) => {
        const prop = getProperty(propertyFilter);
        return index === fields.length - 1
          ? { [prop.name]: order.toUpperCase() }
          : { [prop.name]: acc };
      }, {});

      return sort;
    };

    const variables = orderPropertyPath
      ? {
          sort: {
            relation: !isDev && createSortObject(orderPropertyPath, sortOrder),
          },
        }
      : {};

    const ImgPlaceholder = () => (
      <div className={classes.empty}>
        <div className={classes.placeholderWrapper}>
          <svg className={classes.placeholder} width={86} height={48}>
            <title>placeholder</title>
            <rect x="19.5" y="8.5" rx="2" />
            <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
          </svg>
        </div>
      </div>
    );

    const MobileStepperCmp = () => {
      if (autoplay && !isDev) {
        useEffect(() => {
          const interval = setInterval(() => {
            setActiveStep(prevActiveStep => {
              const nextStep = prevActiveStep + 1;
              if (nextStep > children.length - 1) {
                return 0;
              }
              return nextStep;
            });
          }, duration);
          return () => clearInterval(interval);
        }, [activeStep]);
      }

      const handleNext = () => {
        setActiveStep(prevActiveStep => {
          const nextStep = prevActiveStep + 1;
          if (nextStep > children.length - 1) {
            if (continousLoop) {
              return 0;
            }
            return prevActiveStep;
          }
          return nextStep;
        });
      };

      const handleBack = () => {
        setActiveStep(prevActiveStep => {
          const nextStep = prevActiveStep - 1;
          if (nextStep < 0) {
            if (continousLoop) {
              return children.length - 1;
            }
            return prevActiveStep;
          }
          return nextStep;
        });
      };

      useEffect(() => {
        if (isDev) {
          setActiveStep(parseInt(stepIndex - 1, 10));
        }
      }, [isDev, stepIndex]);

      const maxSteps = children.length;

      const overlay = (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          classes={{ root: classes.overlay, dots: classes.dots }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={continousLoop ? false : activeStep === maxSteps - 1}
              classes={{ root: classes.arrowRight, label: classes.buttonLabel }}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={continousLoop ? false : activeStep === 0}
              classes={{ root: classes.arrowLeft, label: classes.buttonLabel }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      );

      const bottom = (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          classes={{ root: classes.mobileRoot }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={continousLoop ? false : activeStep === maxSteps - 1}
              classes={{ root: classes.stepButtonMobile }}
            >
              {buttonNextText}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={continousLoop ? false : activeStep === 0}
              classes={{ root: classes.stepButtonMobile }}
            >
              <KeyboardArrowLeft />
              {buttonPrevText}
            </Button>
          }
        />
      );

      B.defineFunction('NextStep', () => handleNext());
      B.defineFunction('PreviousStep', () => handleBack());

      const carouselVariant = variant === 'mobile' ? bottom : overlay;
      numRendersRef.current += 1;

      return (
        <div className={`${classes.container} ${classes.wrapper}`}>
          {React.Children.map(children, (child, index) => (
            <Children
              stepLabelData={stepLabelData}
              setStepLabelData={setStepLabelData}
              active={index === activeStep || (isDev && allImages)}
              isFirstRender={numRendersRef.current === 1}
              parentHeight={height}
            >
              {React.cloneElement(child)}
            </Children>
          ))}
          {carouselVariant}
        </div>
      );
    };

    const ModelStepperCmp = () => {
      let maxSteps = 0;
      const where = useFilter(filter);
      const { loading, error, data, refetch } = useAllQuery(model, {
        skip: !model,
        rawFilter: where,
        variables,
        take: maxImages,
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(err) {
          B.triggerEvent('onError', err);
        },
      });
      useEffect(() => {
        if (!isDev && data) {
          setResults(data.results);
        }
      }, [data]);

      const { totalCount } = data || {};
      if (totalCount) {
        maxSteps = totalCount;
      }

      if (autoplay && !isDev) {
        useEffect(() => {
          const interval = setInterval(() => {
            setActiveStep(prevActiveStep => {
              const nextStep = prevActiveStep + 1;
              if (nextStep > maxSteps - 1) {
                return 0;
              }
              return nextStep;
            });
          }, duration);
          return () => clearInterval(interval);
        });
      }

      if (loading) {
        return <div className={classes.skeleton} />;
      }

      if (error) {
        return <div>Something whent wrong.</div>;
      }

      B.defineFunction('Refetch', () => {
        refetch();
      });

      const handleNext = () => {
        setActiveStep(prevActiveStep => {
          const nextStep = prevActiveStep + 1;
          if (nextStep > maxSteps - 1) {
            if (continousLoop) {
              return 0;
            }
            return prevActiveStep;
          }
          return nextStep;
        });
      };

      const handleBack = () => {
        setActiveStep(prevActiveStep => {
          const nextStep = prevActiveStep - 1;
          if (nextStep < 0) {
            if (continousLoop) {
              return maxSteps - 1;
            }
            return prevActiveStep;
          }
          return nextStep;
        });
      };

      const Step = props => {
        const { active, item } = props;
        const StepContent = (
          <div className={classes.root}>
            <img
              src={
                item[propertyName].url
                  ? item[propertyName].url
                  : item[propertyName]
              }
              alt="carousel"
            />
          </div>
        );

        return <>{active ? StepContent : null}</>;
      };

      const overlay = (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          classes={{ root: classes.overlay, dots: classes.dots }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={continousLoop ? false : activeStep === maxSteps - 1}
              classes={{ root: classes.arrowRight, label: classes.buttonLabel }}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={continousLoop ? false : activeStep === 0}
              classes={{ root: classes.arrowLeft, label: classes.buttonLabel }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      );

      const bottom = (
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          classes={{ root: classes.mobileRoot }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={continousLoop ? false : activeStep === maxSteps - 1}
              classes={{ root: classes.stepButtonMobile }}
            >
              {buttonNextText}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={continousLoop ? false : activeStep === 0}
              classes={{ root: classes.stepButtonMobile }}
            >
              <KeyboardArrowLeft />
              {buttonPrevText}
            </Button>
          }
        />
      );

      const carouselVariant = variant === 'mobile' ? bottom : overlay;

      return (
        <div className={classes.container}>
          {results.length === 0 || isDev ? (
            <ImgPlaceholder />
          ) : (
            results.map((item, index) => (
              <Step
                item={item}
                active={index === activeStep}
                isFirstRender={numRendersRef.current === 1}
              />
            ))
          )}
          {carouselVariant}
        </div>
      );
    };
    const StepperComponent =
      select === 'custom' ? MobileStepperCmp() : ModelStepperCmp();

    return isDev ? (
      <div
        className={[isEmpty && select === 'custom' ? classes.empty : ''].join(
          ' ',
        )}
      >
        {isEmpty && select === 'custom' ? 'Carousel' : StepperComponent}
      </div>
    ) : (
      StepperComponent
    );
  })(),
  styles: B => t => {
    const { env, Styling } = B;
    const style = new Styling(t);
    const isDev = env === 'dev';
    return {
      wrapper: {
        width: ({ options: { width } }) => width,
      },
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
          width: '100%',
          height: ({ options: { height } }) =>
            height === '' ? 'auto' : height,
          objectFit: 'cover',
        },
      },
      container: {
        width: ({ options: { width } }) => (width === '' ? '100%' : width),
        position: 'relative',
        '& .MuiMobileStepper-root': {
          background: 'transparent',
        },
        '& .MuiButton-label': {
          width: 'auto',
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: '25px',
          padding: 8,
        },
        '& .MuiMobileStepper-dot': {
          backgroundColor: ({ options: { incativeDotColor } }) => [
            style.getColor(incativeDotColor),
            '!important',
          ],
          width: '12px',
          height: '12px',
        },
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: ({ options: { dotColor } }) => [
            style.getColor(dotColor),
            '!important',
          ],
        },
      },
      mobileRoot: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { stepProgressColor } }) => [
          style.getColor(stepProgressColor),
          '!important',
        ],
      },
      overlay: {
        justifyContent: 'center !important',
        padding: '0px !important',
      },
      stepButtonMobile: {
        pointerEvents: isDev && 'none',
        color: ({ options: { activeColor } }) => [
          style.getColor(activeColor),
          '!important',
        ],
        '&:disabled': {
          color: ({ options: { inactiveColor } }) => [
            style.getColor(inactiveColor),
            '!important',
          ],
        },
      },
      arrowLeft: {
        padding: '0px !important',
        position: 'absolute !important',
        top: '50%',
        left: 16,
        transform: 'translate(0, -50%)',
        '&:disabled': {
          opacity: '0.3',
        },
      },
      arrowRight: {
        padding: '0px !important',
        position: 'absolute !important',
        top: '50%',
        right: 16,
        transform: 'translate(0, -50%)',
        '&:disabled': {
          opacity: '0.3',
        },
      },
      buttonLabel: {
        backgroundColor: ({ options: { buttonBackgroundColor } }) => [
          style.getColor(buttonBackgroundColor),
          '!important',
        ],
        color: ({ options: { buttonColor } }) => [
          style.getColor(buttonColor),
          '!important',
        ],
        '&:hover': {
          boxShadow: 'inset 0 0 0 999px rgb(0 0 0 / 20%)',
        },
        borderRadius: 25,
        padding: 8,
      },
      dots: {
        position: 'absolute',
        bottom: 16,
        zIndex: '1',
      },
      empty: {
        position: 'relative',
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
      skeleton: {
        width: '100%',
        height: '200px',
        backgroundColor: '#eee',
        borderRadius: 8,
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: `calc(${style.getFont('Body2').Landscape} / 2)`,
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
    };
  },
}))();
