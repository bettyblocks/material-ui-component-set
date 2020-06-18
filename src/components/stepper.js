(() => ({
  name: 'Stepper',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['STEP_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Stepper,
      Step,
      StepLabel,
      StepButton,
      StepContent,
      MobileStepper,
      Button,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText } = B;
    const {
      activeStep: devStep,
      variant,
      type,
      alternativeLabel,
      allSteps,
      buttonNext,
      buttonPrev,
      isCircularFrameLabel,
    } = options;

    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const [activeStep, setActiveStep] = useState(0);
    const devActiveStep = parseInt(devStep - 1, 10) || 0;
    const showAllSteps = isDev && allSteps;
    const buttonNextText = useText(buttonNext);
    const buttonPrevText = useText(buttonPrev);
    const currentStep = isDev ? devActiveStep : activeStep;
    const isLinear = variant === 'linear';
    const numRendersRef = useRef(1);

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

    const handleStep = step => () => {
      if (step < children.length && step > -1) {
        setActiveStep(step);
      }
    };

    const StepperCmp = (
      <>
        <Stepper
          nonLinear={!isLinear}
          alternativeLabel={alternativeLabel}
          activeStep={currentStep}
          orientation={type}
          className={classes.container}
        >
          {React.Children.map(children, (child, index) => {
            const { options = {} } = child.props || {};
            const { label = ['Step'], icon = 'None' } = isDev ? {} : options;
            const labelText = useText(label);
            const isActive = index === currentStep;
            const hasIcon = icon !== 'None';
            let stepProps = {};
            let labelProps = {};
            if (showAllSteps) {
              stepProps = {
                ...stepProps,
                active: true,
              };
            }
            const IconCmp = () =>
              hasIcon &&
              React.createElement(Icons[icon], {
                className: [
                  classes.stepIcon,
                  isActive ? classes.stepIconActive : '',
                ].join(' '),
              });

            if (hasIcon) {
              labelProps = {
                ...labelProps,
                StepIconComponent: IconCmp,
              };
            }
            options.active = isActive;
            options.isFirstRender = numRendersRef.current === 1;

            const stepLabelComponent = labelText => (
              <StepLabel
                classes={{root: classes.stepLabel,}}
                className={[
                  labelText.length > 0 ? '' : 'Step-noLabels',
                  isCircularFrameLabel && classes.circularFrame
                ]}
                {...labelProps}
              >
                {labelText}
              </StepLabel>
            );

            const StepComponent = (
              <Step key={labelText} {...stepProps}>
                {isLinear ? (
                  stepLabelComponent(labelText)
                ) : (
                  <StepButton
                    classes={{ root: classes.stepButton }}
                    onClick={handleStep(index)}
                  >
                    {stepLabelComponent(labelText)}
                  </StepButton>
                )}

                <StepContent>
                  {React.cloneElement(child, { ...options })}
                </StepContent>
              </Step>
            );

            numRendersRef.current += 1;
            return StepComponent;
          })}
        </Stepper>
      </>
    );

    const { KeyboardArrowLeft, KeyboardArrowRight } = Icons;

    const maxSteps = children.length;

    const MobileStepperCmp = (
      <>
        {React.Children.map(
          children,
          (child, index) =>
            (index === activeStep || showAllSteps) && React.cloneElement(child),
        )}
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          classes={{ root: classes.mobileRoot }}
          className={ classes.container }
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
      </>
    );

    const StepperComponent = type === 'mobile' ? MobileStepperCmp : StepperCmp;

    useEffect(() => {
      B.defineFunction('NextStep', () => handleNext());
      B.defineFunction('PreviousStep', () => handleBack());
    }, []);

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
    const style = new B.Styling(t);
    const { color: colorFunc } = B;
    const getLighterColor = (col, val) => colorFunc.lighten(col, val);
    const isDev = B.env === 'dev';
    return {
      container: {
        '&.MuiStepper-root': {
          '& .MuiStepContent-root': {
            marginTop: 0,
          },
          backgroundColor: ({ options: { backgroundColor }}) => style.getColor(backgroundColor),
      },
      stepLabel: {
        '& .MuiStepIcon-root': {
          color: ({ options: { inactiveColor } }) =>
          style.getColor(inactiveColor),
          '&.MuiStepIcon-active': {
            color: ({ options: { activeColor } }) =>
            style.getColor(activeColor),
          },
        },
        '&.MuiStepLabel-root': {
          justifyContent: 'center',
        },

        '&.Step-noLabels': {
          '& .MuiStepLabel-labelContainer': {
            display: 'none',
          },
  
          '& .MuiStepLabel-iconContainer': {
            padding: 0,
          },
        },
      },
      stepButton: {
        pointerEvents: isDev && 'none',
      },
      mobileRoot: {
        backgroundColor: ({ options: { inactiveColor } }) => [
          getLighterColor(style.getColor(inactiveColor), 0.7),
          '!important',
        ],
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
      stepIcon: {
        fill: ({ options: { inactiveColor } }) => [
          style.getColor(inactiveColor),
          '!important',
        ],
      },
      stepIconActive: {
        fill: ({ options: { activeColor } }) => [
          style.getColor(activeColor),
          '!important',
        ],
      },
      circularFrame: {
        '& .MuiStepLabel-iconContainer': {
          backgroundColor: ({ options: { isCircularFrameLabel, circularFrameColor } }) => isCircularFrameLabel && style.getColor(circularFrameColor),
          width: '40px',
          height: '40px',
          flexShrink: 0,
          borderRadius: '30px',
          boxSizing: 'border-box',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        }
      },

      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.5rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();