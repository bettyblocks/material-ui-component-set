(() => ({
  name: 'sliderInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Slider,
      InputLabel,
      FormHelperText,
      FormControl,
    } = window.MaterialUI.Core;
    const { env, getCustomModelAttribute, useText } = B;
    const isDev = env === 'dev';
    const {
      startNumber,
      endNumber,
      stepNumber,
      customModelAttribute: customModelAttributeObj,
      marks,
      disable,
      styles,
      validationValueMissing,
      helperText,
      error,
      hideLabel,
    } = options;
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
    } = customModelAttributeObj;
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const [errorState, setErrorState] = useState(error);
    const [helper, setHelper] = useState(useText(helperText));
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const labelText = useText(label);
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};

    const handleValidation = () => {
      const hasError = required && !currentValue;
      setErrorState(hasError);
      const message = useText(hasError ? validationValueMissing : helperText);
      setHelper(message);
    };

    const validationHandler = () => {
      const hasError = required && !currentValue;
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    function setValue(_event, value) {
      setCurrentValue(value);
      if (afterFirstInvalidation) {
        handleValidation();
      }
    }

    useEffect(() => {
      if (isDev) {
        setCurrentValue(parseInt(defaultValue, 10) || 0);
      }
    }, [isDev, defaultValue]);
    useEffect(() => {
      if (isDev) {
        setHelper(useText(helperText));
      }
    }, [isDev, helperText]);

    const sliderInput = (
      <div className={classes.root}>
        <FormControl
          classes={{ root: classes.formControl }}
          required={required}
          component="fieldset"
          error={errorState}
        >
          {labelText && !hideLabel && (
            <InputLabel classes={{ root: classes.label }}>
              {labelText}
            </InputLabel>
          )}
          <div className={classes.content}>
            <Slider
              name={customModelAttributeName}
              value={currentValue}
              valueLabelDisplay={disable ? 'on' : 'auto'}
              step={stepNumber}
              min={startNumber}
              max={endNumber}
              marks={stepNumber ? marks : false}
              onChange={setValue}
              disabled={isDev || disable}
              classes={{
                root: classes.sliderRoot,
                colorPrimary: !disable || styles ? classes.slider : null,
                thumb: classes.thumb,
                focusVisible: classes.thumbFocusVisible,
              }}
            />
          </div>
          {helper && (
            <FormHelperText classes={{ root: classes.helper }}>
              {helper}
            </FormHelperText>
          )}
          <input
            className={classes.validationInput}
            onInvalid={validationHandler}
            type="text"
            tabIndex="-1"
            required={required}
            value={currentValue}
          />
        </FormControl>
      </div>
    );
    return !isDev ? (
      sliderInput
    ) : (
      <div className={classes.dev}>{sliderInput}</div>
    );
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      dev: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      root: {
        width: '100%',
        display: 'inline-block',
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
      disabled: {
        pointerEvents: 'none',
      },
      content: {
        padding: '0px 10px',
      },
      sliderRoot: {
        width: '100%',
        padding: '20px 0px !important',
      },
      slider: {
        color: ({ options: { sliderColor } }) => [
          style.getColor(sliderColor),
          '!important',
        ],
        '& .MuiSlider-thumb:hover': {
          boxShadow: '0px 0px 0px 8px rgb(128,128,128, 0.3)',
        },
      },
      thumbFocusVisible: {
        boxShadow: '0px 0px 0px 8px rgb(128,128,128, 0.3)',
      },
      label: {
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        transform: 'translate(0px, -14px) scale(0.75) !important',
      },
      helper: {
        color: ({ options: { helperColor } }) => [
          style.getColor(helperColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
      },
      validationInput: {
        height: 0,
        width: 0,
        fontSize: 0,
        padding: 0,
        border: 'none',
        pointerEvents: 'none',
      },
      formControl: {
        width: '100%',
        marginTop: ({ options: { hideLabel } }) => [
          hideLabel ? '' : '15px !important',
        ],
      },
    };
  },
}))();
