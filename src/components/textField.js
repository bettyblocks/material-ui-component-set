(() => ({
  name: 'TextField',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      defaultValue,
      required,
      disabled,
      error,
      multiline,
      rows,
      placeholder,
      variant,
      type,
      size,
      fullWidth,
      margin,
      helperText,
      actionInputId,
      adornment,
      adornmentIcon,
      adornmentPosition,
      property,
      propertyLabelOverride,
      pattern,
      minlength,
      maxlength,
      validationTypeMismatch,
      validationPatternMismatch,
      validationValueMissing,
      validationTooLong,
      validationTooShort,
    } = options;

    const {
      FormControl,
      Input,
      OutlinedInput,
      FilledInput,
      InputLabel,
      FormHelperText,
      InputAdornment,
      IconButton,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;

    const { getActionInput, useText, env, getProperty } = B;
    const isDev = env === 'dev';
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [showPassword, togglePassword] = useState(false);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));

    const validPattern = pattern || null;
    const validMinlength = minlength || null;
    const validMaxlength = maxlength || null;

    const validationMessage = validityObject => {
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && validationTypeMismatch) {
        return useText(validationTypeMismatch);
      }
      if (validityObject.patternMismatch && validationPatternMismatch) {
        return useText(validationPatternMismatch);
      }
      if (validityObject.valueMissing && validationValueMissing) {
        return useText(validationValueMissing);
      }
      if (validityObject.tooLong && validationTooLong) {
        return useText(validationTooLong);
      }
      if (validityObject.tooShort && validationTooShort) {
        return useText(validationTooShort);
      }
      return '';
    };

    const placeholderText = useText(placeholder);

    const { label: propertyLabelText, name: propertyName } =
      getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

    const actionInput = getActionInput(actionInputId);
    const formComponentName = propertyName || (actionInput && actionInput.name);

    const handleValidation = validation => {
      setErrorState(!validation.valid);
      setHelper(validationMessage(validation));
    };

    const changeHandler = event => {
      const {
        target: { value: eventValue, validity },
      } = event;

      if (afterFirstInvalidation) {
        handleValidation(validity);
      }

      setCurrentValue(eventValue);
    };

    const blurHandler = event => {
      const {
        target: {
          validity,
          validity: { valid: isValid },
        },
      } = event;
      setAfterFirstInvalidation(!isValid);
      handleValidation(validity);
    };

    const invalidHandler = event => {
      event.preventDefault();
      const {
        target: {
          validity,
          validity: { valid: isValid },
        },
      } = event;
      setAfterFirstInvalidation(!isValid);
      handleValidation(validity);
    };

    useEffect(() => {
      B.defineFunction('Clear', () => setCurrentValue(''));
      B.defineFunction('Disable', () => setIsDisabled(true));
    }, []);

    const handleClickShowPassword = () => {
      togglePassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

    let InputCmp = Input;
    if (variant === 'outlined') {
      InputCmp = OutlinedInput;
    } else if (variant === 'filled') {
      InputCmp = FilledInput;
    }

    const passwordIcon = showPassword ? 'Visibility' : 'VisibilityOff';
    const inputIcon = type === 'password' ? passwordIcon : adornmentIcon;
    const hasIcon = inputIcon && inputIcon !== 'none';
    const hasAdornment = adornment || hasIcon;

    const IconCmp =
      hasIcon &&
      React.createElement(Icons[inputIcon], {
        fontSize: size,
      });

    const iconButtonOptions = {
      edge: adornmentPosition,
      tabIndex: isDev && -1,
    };
    if (type === 'password') {
      iconButtonOptions.ariaLabel = 'toggle password visibility';
      iconButtonOptions.onClick = handleClickShowPassword;
      iconButtonOptions.onMouseDown = handleMouseDownPassword;
    }

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
        setHelper(useText(helperText));
      }
    }, [isDev, defaultValue, helperText]);

    const TextFieldCmp = (
      <FormControl
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={isDisabled}
        margin={margin}
        error={errorState}
      >
        {labelText && <InputLabel>{labelText}</InputLabel>}
        <InputCmp
          name={formComponentName}
          value={currentValue}
          type={(isDev && type === 'number') || showPassword ? 'text' : type}
          multiline={multiline}
          rows={rows}
          label={labelText}
          placeholder={placeholderText}
          onChange={changeHandler}
          onBlur={blurHandler}
          onInvalid={invalidHandler}
          startAdornment={
            hasAdornment &&
            adornmentPosition === 'start' && (
              <InputAdornment position={adornmentPosition}>
                {hasIcon ? (
                  <IconButton {...iconButtonOptions}>{IconCmp}</IconButton>
                ) : (
                  adornment
                )}
              </InputAdornment>
            )
          }
          endAdornment={
            hasAdornment &&
            adornmentPosition === 'end' && (
              <InputAdornment position={adornmentPosition}>
                {hasIcon ? (
                  <IconButton {...iconButtonOptions}>{IconCmp}</IconButton>
                ) : (
                  adornment
                )}
              </InputAdornment>
            )
          }
          inputProps={{
            pattern: validPattern,
            minlength: validMinlength,
            maxlength: validMaxlength,
            tabIndex: isDev && -1,
          }}
        />
        {helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    );

    return isDev ? (
      <div className={classes.root}>{TextFieldCmp}</div>
    ) : (
      TextFieldCmp
    );
  })(),
  styles: () => () => ({
    root: {
      display: ({ options: { fullWidth } }) =>
        fullWidth ? 'block' : 'inline-block',
      '& > *': {
        pointerEvents: 'none',
      },
    },
  }),
}))();
