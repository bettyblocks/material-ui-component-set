(() => ({
  name: 'TextInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      autoComplete,
      disabled,
      error,
      label,
      multiline,
      rows,
      placeholder = [''],
      variant,
      type,
      size,
      fullWidth,
      margin,
      helperText = [''],
      adornment,
      adornmentIcon,
      adornmentPosition,
      pattern,
      minLength,
      maxLength,
      minvalue,
      maxvalue,
      validationTypeMismatch = [''],
      validationPatternMismatch = [''],
      validationValueMissing = [''],
      validationTooLong = [''],
      validationTooShort = [''],
      validationBelowMinimum = [''],
      validationAboveMaximum = [''],
      value,
      hideLabel,
      dataComponentAttribute = ['TextField'],
      required,
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

    const { env, useText, Icon } = B;
    const isDev = env === 'dev';
    const isNumberType = type === 'number';
    const isPasswordType = type === 'password';
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [showPassword, togglePassword] = useState(false);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [currentValue, setCurrentValue] = useState(useText(value));
    const parsedLabel = useText(label);
    const labelText = parsedLabel || name;

    const validPattern = pattern || null;
    const validMinlength = minLength || null;
    const validMaxlength = maxLength || null;
    const validMinvalue = minvalue || null;
    const validMaxvalue = maxvalue || null;

    const patternMismatchMessage = useText(validationPatternMismatch);
    const typeMismatchMessage = useText(validationTypeMismatch);
    const valueMissingMessage = useText(validationValueMissing);
    const tooLongMessage = useText(validationTooLong);
    const tooShortMessage = useText(validationTooShort);
    const belowMinimumMessage = useText(validationBelowMinimum);
    const aboveMaximumMessage = useText(validationAboveMaximum);
    const placeholderText = useText(placeholder);
    const helperTextResolved = useText(helperText);
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const validationMessage = (validityObject) => {
      if (validityObject.customError && patternMismatchMessage) {
        return patternMismatchMessage;
      }
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && typeMismatchMessage) {
        return typeMismatchMessage;
      }
      if (validityObject.patternMismatch && patternMismatchMessage) {
        return patternMismatchMessage;
      }
      if (validityObject.valueMissing && valueMissingMessage) {
        return valueMissingMessage;
      }
      if (validityObject.tooLong && tooLongMessage) {
        return tooLongMessage;
      }
      if (validityObject.tooShort && tooShortMessage) {
        return tooShortMessage;
      }
      if (validityObject.rangeUnderflow && belowMinimumMessage) {
        return belowMinimumMessage;
      }
      if (validityObject.rangeOverflow && aboveMaximumMessage) {
        return aboveMaximumMessage;
      }
      return '';
    };

    const handleValidation = (validation) => {
      setErrorState(!validation.valid);
      const message = validationMessage(validation) || helperTextResolved;
      setHelper(message);
    };

    const onKeyDown = (event) => {
      if (isNumberType && (event.key === '.' || event.key === ',')) {
        event.preventDefault();
      }
    };

    const customPatternValidation = (target) => {
      const { value: eventValue, validity } = target;
      if (!pattern) {
        return validity;
      }
      const patternRegex = RegExp(`^${pattern}$`);
      const isValid = patternRegex.test(eventValue);
      target.setCustomValidity(isValid ? '' : 'Invalid field.');
      return {
        ...validity,
        valid: isValid,
        patternMismatch: !isValid,
      };
    };

    const changeHandler = (event) => {
      const { target } = event;
      let { validity: validation } = target;
      const { value: eventValue } = target;

      if (isNumberType || multiline) {
        validation = customPatternValidation(target);
      }
      const numberValue =
        isNumberType && eventValue && parseInt(eventValue, 10);

      if (afterFirstInvalidation) {
        handleValidation(validation);
      }
      const newValue = isNumberType ? numberValue : eventValue;
      setCurrentValue(newValue);
      B.triggerEvent('onChange', newValue);
    };

    const blurHandler = (event) => {
      const { target } = event;
      let { validity: validation } = target;

      if (isNumberType || multiline) {
        validation = customPatternValidation(target);
      }

      setAfterFirstInvalidation(!validation.valid);
      handleValidation(validation);
    };

    const invalidHandler = (event) => {
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

    B.defineFunction('Clear', () => setCurrentValue(''));
    B.defineFunction('setValue', (data) => setCurrentValue(data));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));
    B.defineFunction('Reset', () => setCurrentValue(useText(value)));

    const handleClickShowPassword = () => {
      togglePassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    let InputCmp = Input;
    if (variant === 'outlined') {
      InputCmp = OutlinedInput;
    } else if (variant === 'filled') {
      InputCmp = FilledInput;
    }

    const passwordIcon = showPassword ? 'Visibility' : 'VisibilityOff';
    const inputIcon = isPasswordType ? passwordIcon : adornmentIcon;
    const hasIcon = inputIcon && inputIcon !== 'None';
    const hasAdornment = hasIcon || adornment;

    const IconCmp = hasIcon && <Icon name={inputIcon} fontSize={size} />;

    const iconButtonOptions = {
      edge: adornmentPosition,
      tabIndex: isDev ? -1 : undefined,
    };
    if (isPasswordType) {
      iconButtonOptions.ariaLabel = 'toggle password visibility';
      iconButtonOptions.onClick = handleClickShowPassword;
      iconButtonOptions.onMouseDown = handleMouseDownPassword;
    }

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(value));
        setHelper(helperTextResolved);
      }
    }, [isDev, helperTextResolved, value]);

    let inputType = type;
    if (type === 'number' && isDev) {
      inputType = 'text';
    }

    const TextFieldCmp = (
      <FormControl
        classes={{ root: classes.formControl }}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={isDisabled}
        margin={margin}
        error={errorState}
      >
        {labelText && !hideLabel && (
          <InputLabel classes={{ root: classes.label }}>{labelText}</InputLabel>
        )}
        <InputCmp
          name={name}
          value={currentValue}
          type={showPassword ? 'text' : inputType}
          multiline={multiline}
          autoComplete={autoComplete ? 'on' : 'off'}
          rows={rows}
          label={labelText}
          placeholder={placeholderText}
          onKeyDown={onKeyDown}
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
            minLength: validMinlength,
            maxLength: validMaxlength,
            min: validMinvalue,
            max: validMaxvalue,
            tabIndex: isDev ? -1 : undefined,
          }}
          data-component={dataComponentAttributeValue}
        />
        {helper && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );

    return isDev ? (
      <div className={classes.root}>{TextFieldCmp}</div>
    ) : (
      TextFieldCmp
    );
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      label: {
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        '&.Mui-focused': {
          color: ({ options: { borderFocusColor } }) => [
            style.getColor(borderFocusColor),
            '!important',
          ],
        },
        '&.Mui-error, &.Mui-error .Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
        },
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
      formControl: {
        '& .MuiInputBase-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          backgroundColor: ({ options: { backgroundColor, variant } }) =>
            variant !== 'standard' && [
              style.getColor(backgroundColor),
              '!important',
            ],
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { borderHoverColor } }) => [
                  style.getColor(borderHoverColor),
                  '!important',
                ],
              },
          },
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { borderFocusColor } }) => [
                  style.getColor(borderFocusColor),
                  '!important',
                ],
              },
          },
          '& fieldset': {
            top: ({ options: { hideLabel } }) => (hideLabel ? 0 : null),
          },
          '& legend': {
            display: ({ options: { hideLabel } }) =>
              hideLabel ? ['none', '!important'] : null,
            overflow: 'hidden',
          },
          '& input': {
            '&::placeholder': {
              color: ({ options: { placeholderColor } }) => [
                style.getColor(placeholderColor),
                '!important',
              ],
            },
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
          {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
        '& .MuiInput-underline, & .MuiFilledInput-underline': {
          '&::before, &::after': {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
          '&:hover': {
            '&::before, &::after': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
            {
              borderColor: ({ options: { borderFocusColor } }) => [
                style.getColor(borderFocusColor),
                '!important',
              ],
            },
        },
        '& .MuiInputBase-root.Mui-error, & .MuiInputBase-root.Mui-error:hover, & .MuiInputBase-root.Mui-error.Mui-focused, & .MuiInputBase-root.Mui-error.Mui-focused:hover':
          {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
            '&.MuiInput-underline, &.MuiFilledInput-underline': {
              '&::before, &::after': {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
              '&:hover': {
                '&::before, &::after': {
                  borderColor: ({ options: { errorColor } }) => [
                    style.getColor(errorColor),
                    '!important',
                  ],
                },
              },
              '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
                {
                  borderColor: ({ options: { errorColor } }) => [
                    style.getColor(errorColor),
                    '!important',
                  ],
                },
            },
          },
      },
    };
  },
}))();
