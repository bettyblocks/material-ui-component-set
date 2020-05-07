(() => ({
  name: 'TextField',
  icon: 'TextInputIcon',
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

    const { getActionInput, useText, env } = B;
    const isDev = env === 'dev';
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));
    const [showPassword, togglePassword] = useState(false);
    const helper = isDev
      ? helperText.map(h => (h.name ? h.name : h)).join(' ')
      : useText(helperText);
    const placeholderText = isDev
      ? placeholder.map(p => (p.name ? p.name : p)).join(' ')
      : useText(placeholder);

    const actionInput = getActionInput(actionInputId);

    const changeHandler = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
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
    };
    if (type === 'password') {
      iconButtonOptions.ariaLabel = 'toggle password visibility';
      iconButtonOptions.onClick = handleClickShowPassword;
      iconButtonOptions.onMouseDown = handleMouseDownPassword;
    }

    const TextFieldCmp = (
      <FormControl
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        margin={margin}
        error={error}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <InputCmp
          name={actionInput && actionInput.name}
          value={
            isDev
              ? defaultValue
                  .map(textitem => (textitem.name ? textitem.name : textitem))
                  .join(' ')
              : currentValue
          }
          type={(isDev && type === 'number') || showPassword ? 'text' : type}
          multiline={multiline}
          rows={rows}
          label={label}
          placeholder={placeholderText}
          onChange={changeHandler}
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
