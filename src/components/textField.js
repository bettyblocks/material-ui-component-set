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
      passwordPattern,
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
    const [showPassword, togglePassword] = useState(false);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstInvalidion, setAfterFirstInvalidion] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));

    const validationMessage = validityObject => {
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && type === 'email') {
        return 'No valid e-mail address provided';
      }
      if (validityObject.patternMismatch && type === 'password') {
        return 'Invalid password';
      }
      if (validityObject.valueMissing) {
        return 'This field is required';
      }
    };

    const placeholderText = useText(placeholder);

    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : label;

    const actionInput = getActionInput(actionInputId);

    const changeHandler = event => {
      const {
        target: { value: eventValue },
      } = event;

      if (afterFirstInvalidion) {
        setErrorState(!event.target.validity.valid);
        setHelper(validationMessage(event.target.validity));
      }

      setCurrentValue(eventValue);
    };

    useEffect(() => {
      B.defineFunction('Clear', () => setCurrentValue(''));
    }, []);
    const blurHandler = event => {
      setErrorState(!event.target.validity.valid);
      // eslint-disable-next-line no-unused-expressions
      !event.target.validity.valid && setAfterFirstInvalidion(true);
      setHelper(validationMessage(event.target.validity));
    };

    const invalidHandler = event => {
      event.preventDefault();
      setErrorState(!event.target.validity.valid);
      // eslint-disable-next-line no-unused-expressions
      !event.target.validity.valid && setAfterFirstInvalidion(true);
      setHelper(validationMessage(event.target.validity));
    };

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
      }
    }, [isDev, defaultValue]);

    const TextFieldCmp = (
      <FormControl
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        margin={margin}
        error={errorState}
      >
        {labelText && <InputLabel>{labelText}</InputLabel>}
        <InputCmp
          name={actionInput && actionInput.name}
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
            pattern: passwordPattern,
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
