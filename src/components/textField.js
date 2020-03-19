(() => ({
  name: 'TextField',
  icon: 'TextInputIcon',
  category: 'FORM',
  type: 'TEXT_INPUT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      required,
      disabled,
      multiline,
      rowsMax,
      placeholder,
      text,
      variant,
      type,
      size,
      fullWidth,
      error,
      margin,
      helperText,
      actionInputId,
    } = options;

    const isDev = B.env === 'dev';
    const { getActionInput, useText } = B;
    const actionInput = getActionInput(actionInputId);
    const [currentValue, setCurrentValue] =
      B.env === 'dev' ? useState(text.join(' ')) : useState(useText(text));
    const value = currentValue;

    const { TextField } = window.MaterialUI.Core;
    const handleChange = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
    };

    const TextFieldCmp = (
      <TextField
        name={actionInput && actionInput.name}
        value={
          B.env === 'dev'
            ? text
                .map(textitem => (textitem.name ? textitem.name : textitem))
                .join(' ')
            : value
        }
        size={size}
        variant={variant}
        placeholder={placeholder}
        fullWidth={fullWidth}
        type={type}
        onChange={handleChange}
        inputProps={{ name: actionInput && actionInput.name }}
        required={required}
        disabled={disabled}
        multiline={multiline}
        rowsMax={rowsMax}
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
