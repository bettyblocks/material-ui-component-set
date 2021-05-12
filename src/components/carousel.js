(() => ({
  name: 'Carousel',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['STEP_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { MobileStepper, Button } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText, Children } = B;
    const {
      activeStep: stepIndex,
      allImages,
      buttonNext,
      buttonPrev,
      variant,
      autoplay,
      duration,
    } = options;

    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const activeStepIndex = parseInt(stepIndex - 1, 10) || 0;
    const [activeStep, setActiveStep] = useState(activeStepIndex);
    const buttonNextText = useText(buttonNext);
    const buttonPrevText = useText(buttonPrev);
    const numRendersRef = useRef(1);
    const [stepLabelData, setStepLabelData] = useState({});

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
          return prevActiveStep;
        }
        return nextStep;
      });
    };

    const handleBack = () => {
      setActiveStep(prevActiveStep => {
        const nextStep = prevActiveStep - 1;
        if (nextStep < 0) {
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

    const { KeyboardArrowLeft, KeyboardArrowRight } = Icons;

    const maxSteps = children.length;

    const overlay = (
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        classes={{ root: classes.overlay, dots: classes.dots }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            classes={{ root: classes.arrowRight, label: classes.buttonLabel }}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            classes={{ root: classes.arrowLeft, label: classes.buttonLabel }}
          >
            <KeyboardArrowLeft />
          </Button>
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
            disabled={activeStep === maxSteps - 1}
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
            disabled={activeStep === 0}
            classes={{ root: classes.stepButtonMobile }}
          >
            <KeyboardArrowLeft />
            {buttonPrevText}
          </Button>
        }
      />
    );

    const carouselVariant = variant === 'mobile' ? bottom : overlay;

    const MobileStepperCmp = (
      <div className={classes.container}>
        {React.Children.map(children, (child, index) => (
          <Children
            stepLabelData={stepLabelData}
            setStepLabelData={setStepLabelData}
            active={index === activeStep || (isDev && allImages)}
            isFirstRender={numRendersRef.current === 1}
          >
            {React.cloneElement(child)}
          </Children>
        ))}
        {carouselVariant}
      </div>
    );

    const StepperComponent = MobileStepperCmp;

    B.defineFunction('NextStep', () => handleNext());
    B.defineFunction('PreviousStep', () => handleBack());

    numRendersRef.current += 1;

    return isDev ? (
      <div
        className={[classes.wrapper, isEmpty ? classes.empty : ''].join(' ')}
      >
        {isEmpty ? 'Stepper' : StepperComponent}
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
      root: {},
      container: {
        position: 'relative',
        '& .MuiMobileStepper-root': {
          background: 'transparent',
        },
        '& .MuiButton-label': {
          width: 'auto',
          padding: '5px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: '25px',
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
        marginTop: '-40px',
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
        position: 'absolute !important',
        top: '50%',
        left: '8px',
        transform: 'translate(0, -50%)',
        '& svg': {
          fontSize: '40px',
        },
        '&:disabled': {
          opacity: '0.3',
        },
      },
      arrowRight: {
        position: 'absolute !important',
        top: '50%',
        right: '8px',
        transform: 'translate(0, -50%)',
        '& svg': {
          fontSize: '40px',
        },
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
      },
      dots: {
        zIndex: '1',
      },
    };
  },
}))();
