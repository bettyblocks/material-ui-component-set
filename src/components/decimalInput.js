(() => ({
  name: 'DecimalInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'autoNumeric',
      package: 'npm:autonumeric@4.10.6',
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
      adornment = [''],
      adornmentIcon,
      adornmentPosition,
      minValue,
      maxValue,
      validationValueMissing = [''],
      validationTooLow = [''],
      validationTooHigh = [''],
      value,
      hideLabel,
      debounceDelay,
      dataComponentAttribute = ['DecimalField'],
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

    const SEPARATOR_COMMA = ',';
    const SEPARATOR_DOT = '.';

    const { env, useText, Icon, generateUUID } = B;
    const isDev = env === 'dev';
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [errorState, setErrorState] = useState(error);
    const [helper, setHelper] = useState(useText(helperText));
    const optionValue = useText(value);
    const [currentValue, setCurrentValue] = useState(optionValue);
    const [rawValue, setRawValue] = useState(optionValue);
    const labelText = useText(label);
    const debouncedOnChangeRef = useRef(null);
    const inputRef = useRef();
    const autoNumericRef = useRef(null);

    const { current: labelControlRef } = useRef(generateUUID());

    const validMinvalue = minValue || null;
    const validMaxvalue = maxValue || null;

    const valueMissingMessage = useText(validationValueMissing);
    const belowMinimumMessage = useText(validationTooLow);
    const aboveMaximumMessage = useText(validationTooHigh);
    const placeholderText = useText(placeholder);
    const helperTextResolved = useText(helperText);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const adornmentValue = useText(adornment);

    const validationMessage = () => {
      let errorMessage = null;

      if (required && rawValue === '') {
        errorMessage = valueMissingMessage;
      } else if (validMinvalue && rawValue < validMinvalue) {
        errorMessage = belowMinimumMessage;
      } else if (validMaxvalue && rawValue > validMaxvalue) {
        errorMessage = aboveMaximumMessage;
      }

      setErrorState(!!errorMessage);
      return errorMessage || helperTextResolved;
    };

    const handleValidation = () => {
      const message = validationMessage();
      setHelper(message);
    };

    const getSeparator = () => {
      if (separator === SEPARATOR_COMMA) {
        return SEPARATOR_DOT;
      }
      return SEPARATOR_COMMA;
    };

    const scaleToFraction = (scale) => {
      return 1 / 10 ** scale;
    };

    useEffect(() => {
      const autoNumericInstance = new AutoNumeric(inputRef.current, {
        decimalPlaces: decimalScale,
        decimalCharacter: separator,
        digitGroupSeparator: showGroupSeparator ? getSeparator() : '',
        formatOnPageLoad: true,
        overrideMinMaxLimits: 'ignore',
      });

      autoNumericRef.current = autoNumericInstance;
      autoNumericInstance.set(optionValue);
      setRawValue(autoNumericInstance.getNumericString());
      setCurrentValue(autoNumericInstance.getFormatted());

      inputRef.current.addEventListener('autoNumeric:rawValueModified', () => {
        setRawValue(autoNumericInstance.getNumericString());
        setCurrentValue(autoNumericInstance.getFormatted());
        debouncedOnChangeRef.current(rawValue);
      });

      return () => {
        autoNumericInstance.remove();
      };
    }, [optionValue]);

    const debounce =
      (func, delay) =>
      (...args) => {
        clearTimeout(debounce.timeoutId);
        debounce.timeoutId = setTimeout(() => func(...args), delay);
      };
    debounce.timeoutId = null;

    if (!debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current = debounce(() => {
        if (inputRef.current) {
          const unformattedValue = autoNumericRef.current.getNumericString();
          B.triggerEvent('onChange', unformattedValue);
        }
      }, debounceDelay);
    }

    const handleInputEvent = (event, isBlur = false) => {
      handleValidation();

      if (autoNumericRef.current) {
        const unformattedValue = autoNumericRef.current.getNumericString();
        const formattedValue = autoNumericRef.current.getFormatted();

        setRawValue(unformattedValue);
        setCurrentValue(formattedValue);

        if (isBlur) {
          B.triggerEvent('onBlur', unformattedValue);
        } else {
          debouncedOnChangeRef.current(unformattedValue);
        }
      }
    };

    const changeHandler = (event) => handleInputEvent(event, false);
    const blurHandler = (event) => handleInputEvent(event, true);

    const invalidHandler = (event) => {
      event.preventDefault();
      handleValidation();
    };

    const focusHandler = () =>
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);

    B.defineFunction('Clear', () => {
      if (autoNumericRef.current) {
        autoNumericRef.current.set('');
      }
      setCurrentValue('');
      setRawValue('');
    });
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));
    B.defineFunction('Reset', () => {
      if (autoNumericRef.current) {
        autoNumericRef.current.set(optionValue);
      }
      setCurrentValue(optionValue);
      setRawValue(optionValue);
    });
    B.defineFunction('Focus', () => focusHandler());

    let InputComponent = Input;
    if (variant === 'outlined') {
      InputComponent = OutlinedInput;
    } else if (variant === 'filled') {
      InputComponent = FilledInput;
    }

    const inputIcon = adornmentIcon;
    const hasIcon = inputIcon && inputIcon !== 'None';
    const hasAdornment = hasIcon || adornment;

    const IconComponent = hasIcon && <Icon name={inputIcon} fontSize={size} />;

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

    const DecimalFieldComponent = (
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
        <InputComponent
          id={labelControlRef}
          inputRef={inputRef}
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
                  <IconButton {...iconButtonOptions}>
                    {IconComponent}
                  </IconButton>
                ) : (
                  adornmentValue
                )}
              </InputAdornment>
            )
          }
          endAdornment={
            hasAdornment &&
            adornmentPosition === 'end' && (
              <InputAdornment position={adornmentPosition}>
                {hasIcon ? (
                  <IconButton {...iconButtonOptions}>
                    {IconComponent}
                  </IconButton>
                ) : (
                  adornmentValue
                )}
              </InputAdornment>
            )
          }
          inputProps={{
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

    if (isDev) {
      return <div className={classes.root}>{DecimalFieldComponent}</div>;
    }

    return (
      <div>
        <input
          type="number"
          name={name}
          value={rawValue}
          min={validMinvalue}
          max={validMaxvalue}
          required={required}
          style={{ display: 'none' }}
          step={scaleToFraction(decimalScale)}
        />
        {DecimalFieldComponent}
      </div>
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
