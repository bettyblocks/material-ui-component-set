(() => ({
  name: 'TextField',
  icon: 'TextInputIcon',
  category: 'FORM',
  type: 'FORM_COMPONENT',
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
    } = options;

    const { TextField } = window.MaterialUI.Core;
    const { getActionInput, useText } = B;
    const isDev = B.env === 'dev';
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;

    const changeHandler = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
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
        type={type}
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
