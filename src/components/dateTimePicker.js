(() => ({
  name: 'DateTimePicker',
  icon: 'DateTimePickerIcon',
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
      placeholder,
      variant,
      inputvariant,
      type,
      dateFormat,
      timeFormat,
      dateTimeFormat,
      size,
      fullWidth,
      margin,
      helperText,
      actionInputId,
      disableToolbar,
      property,
      propertyLabelOverride,
    } = options;

    const {
      MuiPickersUtilsProvider,
      KeyboardTimePicker,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;
    const { DateFnsUtils } = window.MaterialUI;
    const { getActionInput, useText, getProperty, env } = B;
    const isDev = env === 'dev';
    const actionInput = getActionInput(actionInputId);
    const strDefaultValue = defaultValue.join(' ');
    const [selectedDate, setSelectedDate] = isDev
      ? useState(strDefaultValue)
      : useState(useText(defaultValue));
    const helper = isDev
      ? helperText.map(h => (h.name ? h.name : h)).join(' ')
      : useText(helperText);
    const placeholderText = isDev
      ? placeholder.join(' ')
      : useText(placeholder);
    const propLabel =
      property && getProperty(property) && getProperty(property).label;
    const propLabelOverride = isDev
      ? propertyLabelOverride.map(l => (l.name ? l.name : l)).join(' ')
      : useText(propertyLabelOverride);
    const propertyLabelText = isDev ? '{{ property label }}' : propLabel;
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : label;

    const isValidDate = date => date instanceof Date && !isNaN(date);

    const changeHandler = date => {
      setSelectedDate(date);
    };

    const pad = value => {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    };

    let DateTimeComponent = KeyboardDatePicker;
    let format = dateFormat || 'MM/dd/yyyy';
    let devValue = isValidDate(new Date(strDefaultValue))
      ? new Date(strDefaultValue)
      : new Date();
    let prodValue = isValidDate(new Date(selectedDate))
      ? new Date(selectedDate)
      : new Date();

    if (type === 'datetime') {
      DateTimeComponent = KeyboardDateTimePicker;
      format = dateTimeFormat || 'MM/dd/yyyy HH:mm:ss';
    }
    if (type === 'time') {
      DateTimeComponent = KeyboardTimePicker;
      format = timeFormat || 'HH:mm:ss';
      const today = new Date();
      const year = today.getFullYear();
      const month = pad(today.getMonth() + 1);
      const day = pad(today.getDate());
      const dateString = `${year}-${month}-${day}T`;

      const selectedDateInDateFormat = isValidDate(selectedDate)
        ? selectedDate
        : new Date(`${dateString}${selectedDate}`);

      devValue =
        defaultValue.length > 0
          ? new Date(`${dateString}${strDefaultValue}`)
          : new Date(`${dateString}00:00:00`);
      prodValue = !isDev ? selectedDateInDateFormat : devValue;
    }

    const DateTimeCmp = (
      <DateTimeComponent
        name={actionInput && actionInput.name}
        value={isDev ? devValue : prodValue}
        size={size}
        variant={variant}
        placeholder={placeholderText}
        fullWidth={fullWidth}
        onChange={changeHandler}
        inputVariant={inputvariant}
        inputProps={{
          name: actionInput && actionInput.name,
        }}
        required={required}
        disabled={disabled}
        label={labelText}
        error={error}
        margin={margin}
        helperText={helper}
        disableToolbar={disableToolbar}
        format={format}
      />
    );

    return isDev ? (
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {DateTimeCmp}
        </MuiPickersUtilsProvider>
      </div>
    ) : (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {DateTimeCmp}
      </MuiPickersUtilsProvider>
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
