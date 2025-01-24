(() => ({
  name: 'PriceInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'autoNumeric',
      package: 'npm:autonumeric@4.5.4',
      imports: ['AutoNumeric'],
    },
  ],
  jsx: (() => {
    const {
      autoNumeric: { default: AutoNumeric },
    } = dependencies;

    const {
      actionVariableId: name,
      autoComplete,
      autoFocus,
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
      floatLabel,
      margin,
      helperText = [''],
      adornment,
      adornmentIcon,
      adornmentPosition,
      minLength,
      maxLength,
      minvalue,
      maxvalue,
      validationTypeMismatch = [''],
      validationValueMissing = [''],
      validationTooLong = [''],
      validationTooShort = [''],
      validationBelowMinimum = [''],
      validationAboveMaximum = [''],
      value,
      hideLabel,
      debounceDelay,
      dataComponentAttribute = ['TextField'],
      required,
      separator,
      showGroupSeparator,
      decimalScale,
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

    const { env, useText, Icon, generateUUID } = B;
    const isDev = env === 'dev';
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const optionValue = useText(value);
    const [currentValue, setCurrentValue] = useState(optionValue);
    const [rawValue, setRawValue] = useState(optionValue);
    const parsedLabel = useText(label);
    const labelText = parsedLabel;
    const debouncedOnChangeRef = useRef(null);
    const inputRef = useRef();

    const { current: labelControlRef } = useRef(generateUUID());

    const validMinlength = minLength || null;
    const validMaxlength = maxLength || null;
    const validMinvalue = minvalue || null;
    const validMaxvalue = maxvalue || null;

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
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && typeMismatchMessage) {
        return typeMismatchMessage;
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

    useEffect(() => {
      const getSeparator = () => {
        if (separator === ',') {
          return '.';
        }
        return ',';
      };
      const autoNumericInstance = new AutoNumeric(inputRef.current, {
        decimalPlaces: decimalScale,
        decimalCharacter: separator,
        digitGroupSeparator: showGroupSeparator ? getSeparator() : '',
        watchExternalChanges: true, // Enable real-time updates
        formatOnPageLoad: true, // Format initial value
      });

      // Add event listener for AutoNumeric's internal changes
      inputRef.current.addEventListener('autoNumeric:rawValueModified', (e) => {
        const newValue = instance.getNumericString();
        setCurrentValue(newValue);
        debouncedOnChangeRef.current(newValue);
      });

      return () => {
        autoNumericInstance.remove();
      };
    }, []);

    const debounce =
      (func, delay) =>
      (...args) => {
        clearTimeout(debounce.timeoutId);
        debounce.timeoutId = setTimeout(() => func(...args), delay);
      };
    debounce.timeoutId = null;

    if (!debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current = debounce((newValue) => {
        const formattedValue =
          AutoNumeric.getAutoNumericElement(newValue).getNumericString();
        B.triggerEvent('onChange', formattedValue);
      }, debounceDelay);
    }

    const changeHandler = (event) => {
      const { target } = event;
      let { validity: validation } = target;
      const { value: eventValue } = target;

      if (afterFirstInvalidation) {
        handleValidation(validation);
      }

      setCurrentValue(eventValue);
      debouncedOnChangeRef.current(eventValue);
    };

    const blurHandler = (event) => {
      const { target } = event;
      let { validity: validation } = target;

      setAfterFirstInvalidation(!validation.valid);
      handleValidation(validation);
      const formattedValue =
        AutoNumeric.getAutoNumericElement(target).getNumericString();
      setCurrentValue(formattedValue);
      B.triggerEvent('onBlur', formattedValue);
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

    const focusHandler = () =>
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);

    B.defineFunction('Clear', () => setCurrentValue(''));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));
    B.defineFunction('Reset', () => setCurrentValue(useText(value)));
    B.defineFunction('Focus', () => focusHandler());

    let InputCmp = Input;
    if (variant === 'outlined') {
      InputCmp = OutlinedInput;
    } else if (variant === 'filled') {
      InputCmp = FilledInput;
    }

    const inputIcon = adornmentIcon;
    const hasIcon = inputIcon && inputIcon !== 'None';
    const hasAdornment = hasIcon || adornment;

    const IconCmp = hasIcon && <Icon name={inputIcon} fontSize={size} />;

    const iconButtonOptions = {
      edge: adornmentPosition,
      tabIndex: isDev ? -1 : undefined,
    };

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

    const PriceFieldCmp = (
      <FormControl
        classes={{
          root: `${classes.formControl} ${
            floatLabel && classes.formControlFloatLabel
          }`,
        }}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={isDisabled}
        margin={margin}
        error={errorState}
      >
        {labelText && !hideLabel && (
          <InputLabel
            htmlFor={labelControlRef}
            classes={{
              root: `${classes.label} ${floatLabel && classes.floatLabel}`,
            }}
            {...(floatLabel && { 'data-shrink': true })}
          >
            {labelText}
          </InputLabel>
        )}
        <InputCmp
          id={labelControlRef}
          inputRef={inputRef}
          name={name}
          value={currentValue}
          type={inputType}
          multiline={multiline}
          autoComplete={autoComplete ? 'on' : 'off'}
          autoFocus={!isDev && autoFocus}
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
            minLength: validMinlength,
            maxLength: validMaxlength,
            min: validMinvalue,
            max: validMaxvalue,
            tabIndex: isDev ? -1 : undefined,
            className: includeStyling(),
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
      <div className={classes.root}>{PriceFieldCmp}</div>
    ) : (
      PriceFieldCmp
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
          opacity: '0.7',
        },
      },
      floatLabel: {
        position: 'static !important',
        transform: 'none !important',
        marginBottom: '8px !important',
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
      formControlFloatLabel: {
        '& .MuiInputBase-root': {
          '& > fieldset': {
            '& > legend': {
              maxWidth: '0px !important',
            },
          },
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
                borderColor: ({
                  options: { borderHoverColor, borderColor, disabled },
                }) => [
                  disabled
                    ? style.getColor(borderColor)
                    : style.getColor(borderHoverColor),
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
          '& input, & textarea': {
            '&::placeholder': {
              color: ({ options: { placeholderColor } }) => [
                style.getColor(placeholderColor),
                '!important',
              ],
            },
          },
          '&.Mui-disabled': {
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
