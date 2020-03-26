(() => ({
  name: 'TextField',
  icon: 'TextInputIcon',
  category: 'FORM',
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

    const { TextField, InputAdornment, IconButton } = window.MaterialUI.Core;
    const { Icons, Icons: { Visibility, VisibilityOff} } = window.MaterialUI;
    
    const { getActionInput, useText } = B;
    const isDev = B.env === 'dev';
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));
    const [showPassword, togglePassword] = useState(false);

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;

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
    
    const adornmentCmp = adornmentIcon && adornmentIcon !== 'none' 
      ? React.createElement(Icons[adornmentIcon], { fontSize: size }) 
      : adornment;
    let InputAdornmentCmp = adornmentCmp && {
      [`${adornmentPosition}Adornment`]: <InputAdornment position={adornmentPosition}>{adornmentCmp}</InputAdornment>
    };

    if (adornment && type === 'password') {
      InputAdornmentCmp = {
        [`${adornmentPosition}Adornment`]: (<InputAdornment position={adornmentPosition}><IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >{showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton></InputAdornment>)
      }
    };

    const TextFieldCmp = (
      <TextField
        name={actionInput && actionInput.name}
        value={
          isDev
            ? defaultValue
              .map(textitem => (textitem.name ? textitem.name : textitem))
              .join(' ')
            : value
        }
        size={size}
        variant={variant}
        placeholder={placeholder}
        fullWidth={fullWidth}
        type={(isDev && type === 'number') || showPassword ? 'text' : type}
        onChange={changeHandler}
        inputProps={{ name: actionInput && actionInput.name }}
        required={required}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        label={label}
        error={error}
        margin={margin}
        helperText={helperText}
        InputProps={InputAdornmentCmp}
      />
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
