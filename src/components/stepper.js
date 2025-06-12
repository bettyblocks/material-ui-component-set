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
    const { env, useText, Children, Icon } = B;
    const {
      activeStep: stepIndex,
      selectedDesignStepIndex,
      variant,
      type,
      alternativeLabel,
      allSteps,
      buttonNext,
      buttonPrev,
      dataComponentAttribute,
    } = options;

    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const currentStep = isDev ? selectedDesignStepIndex : stepIndex;
    const activeStepIndex = parseInt(currentStep - 1, 10) || 0;
    const [activeStep, setActiveStep] = useState(activeStepIndex);
    const buttonNextText = useText(buttonNext);
    const buttonPrevText = useText(buttonPrev);
    const isLinear = variant === 'linear';
    const numRendersRef = useRef(1);
    const [stepLabelData, setStepLabelData] = useState({});

    const handleNext = () => {
      setActiveStep((prevActiveStep) => {
        const nextStep = prevActiveStep + 1;
        if (nextStep > children.length - 1) {
          return prevActiveStep;
        }
        return nextStep;
      });
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => {
        const nextStep = prevActiveStep - 1;
        if (nextStep < 0) {
          return prevActiveStep;
        }
        return nextStep;
      });
    };

    const handleStep = (step) => () => {
      if (step < children.length && step > -1) {
        setActiveStep(step);
      }
    };

    useEffect(() => {
      if (isDev) {
        setActiveStep(parseInt(currentStep - 1, 10));
      }
    }, [isDev, currentStep]);

    const StepperCmp = (
      <>
        <Stepper
          nonLinear={!isLinear}
          alternativeLabel={alternativeLabel}
          activeStep={activeStep}
          orientation={type}
          classes={{ root: classes.root }}
          data-component={useText(dataComponentAttribute) || 'Stepper'}
          className={includeStyling()}
        >
          {React.Children.map(children, (child, index) => {
            const { options: childOptions = {} } = child.props || {};

            const {
              label = stepLabelData[`label${index}`] || [`Step ${index + 1}`],
              icon = stepLabelData[`icon${index}`] || 'None',
              disabled = stepLabelData[`disabled${index}`] || 'None',
            } = childOptions;
            const isActive = index === activeStep || allSteps;
            const labelText = useText(label);
            const hasIcon = icon !== 'None';
            let stepProps = {};
            let labelProps = {};
            if (allSteps) {
              stepProps = {
                ...stepProps,
                active: true,
              };
            }

            function IconCmp() {
              return (
                hasIcon && (
                  <Icon
                    name={icon}
                    className={[
                      classes.stepIcon,
                      isActive ? classes.stepIconActive : '',
                    ].join(' ')}
                  />
                )
              );
            }

            if (hasIcon) {
              labelProps = {
                ...labelProps,
                StepIconComponent: IconCmp,
              };
            }

            const StepComponent = (
              <Step key={labelText} {...stepProps}>
                {isLinear ? (
                  <StepLabel
                    classes={{ root: classes.stepLabel }}
                    {...labelProps}
                  >
                    {labelText}
                  </StepLabel>
                ) : (
                  <StepButton
                    classes={{ root: classes.stepButton }}
                    onClick={handleStep(index)}
                    disabled={disabled}
                  >
                    <StepLabel
                      classes={{ root: classes.stepLabel }}
                      {...labelProps}
                    >
                      {labelText}
                    </StepLabel>
                  </StepButton>
                )}
                {type === 'vertical' && (
                  <StepContent>
                    <Children
                      setStepLabelData={setStepLabelData}
                      active={isActive}
                      isFirstRender={numRendersRef.current === 1}
                    >
                      {React.cloneElement(child, { ...childOptions })}
                    </Children>
                  </StepContent>
                )}
              </Step>
            );

            return StepComponent;
          })}
        </Stepper>
        {type === 'horizontal' && (
          <>
            {React.Children.map(children, (child, index) => {
              const { options: childOptions = {} } = child.props || {};
              const isActive = index === activeStep || allSteps;

              return (
                <Children
                  stepLabelData={stepLabelData}
                  setStepLabelData={setStepLabelData}
                  active={isActive}
                  isFirstRender={numRendersRef.current === 1}
                >
                  {React.cloneElement(child, { ...childOptions })}
                </Children>
              );
            })}
          </>
        )}
      </>
    );

    const maxSteps = children.length;

    const MobileStepperCmp = (
      <>
        {React.Children.map(children, (child, index) => (
          <Children
            stepLabelData={stepLabelData}
            setStepLabelData={setStepLabelData}
            active={index === activeStep || allSteps}
            isFirstRender={numRendersRef.current === 1}
          >
            {React.cloneElement(child)}
          </Children>
        ))}
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          className={includeStyling()}
          classes={{ root: classes.mobileRoot }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              classes={{ root: classes.stepButtonMobile }}
            >
              {buttonNextText}
              <Icon name="KeyboardArrowRight" />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              classes={{ root: classes.stepButtonMobile }}
            >
              <Icon name="KeyboardArrowLeft" />
              {buttonPrevText}
            </Button>
          }
          data-component={useText(dataComponentAttribute) || 'Stepper'}
        />
      </>
    );

    const StepperComponent = type === 'mobile' ? MobileStepperCmp : StepperCmp;

    useEffect(() => {
      B.defineFunction('NextStep', () => handleNext());
      B.defineFunction('PreviousStep', () => handleBack());
    }, []);

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
  styles: (B) => (t) => {
    const { mediaMinWidth, env, Styling } = B;
    const style = new Styling(t);
    const isDev = env === 'dev';
    return {
      root: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        '& .MuiStepConnector-line': {
          borderColor: ({ options: { connectorColor } }) =>
            style.getColor(connectorColor),
        },
        '& .MuiStepContent-root': {
          borderColor: ({ options: { connectorColor } }) =>
            style.getColor(connectorColor),
        },
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
        '& .MuiStepLabel-label': {
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),
          fontSize: ({ options: { font } }) => style.getFontSize(font),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Desktop'),
          },
          color: ({ options: { inactiveLabelColor } }) =>
            style.getColor(inactiveLabelColor),
          '&.MuiStepLabel-active': {
            color: ({ options: { activeLabelColor } }) =>
              style.getColor(activeLabelColor),
          },
        },
      },
      stepButton: {
        pointerEvents: isDev && 'none',
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
