(() => ({
  name: 'Select',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      required,
      disabled,
      defaultValue,
      variant,
      size,
      fullWidth,
      hasError,
      margin,
      helperText,
      selectOptions,
      model,
      filter,
      optionType,
      labelProperty: labelProp,
      valueProperty: valueProp,
      actionInputId,
      property,
      propertyLabelOverride,
    } = options;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { GetAll, getProperty, getActionInput, useText } = B;
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));
    const helper = isDev
      ? helperText.map(h => (h.name ? h.name : h)).join(' ')
      : useText(helperText);

    const propLabel =
      property && getProperty(property) && getProperty(property).label;
    const propLabelOverride = isDev
      ? propertyLabelOverride.map(l => (l.name ? l.name : l)).join(' ')
      : useText(propertyLabelOverride);
    const propertyLabelText = isDev ? '{{ property label }}' : propLabel;
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : label;

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;

    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const { name: propName } = valueProperty || {};
    const { name: labelName } = labelProperty || {};

    const handleChange = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
    };

    const SelectCmp =
      optionType === 'static' ? (
        <TextField
          select
          value={
            isDev
              ? defaultValue
                  .map(textitem => (textitem.name ? textitem.name : textitem))
                  .join(' ')
              : value
          }
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          onChange={handleChange}
          inputProps={{ name: actionInput && actionInput.name }}
          required={required}
          disabled={disabled}
          label={labelText}
          error={hasError}
          margin={margin}
          helperText={helper}
        >
          {(selectOptions || '').split('\n').map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <GetAll modelId={model} filter={filter} skip={0} take={50}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>;
            }

            if (error) {
              return <span>Something went wrong: {error.message} :(</span>;
            }

            const { results } = data;
            return (
              <TextField
                select
                defaultValue={value}
                value={value}
                size={size}
                variant={variant}
                fullWidth={fullWidth}
                onChange={handleChange}
                inputProps={{ name: actionInput && actionInput.name }}
                required={required}
                disabled={disabled}
                label={labelText}
                error={hasError}
                margin={margin}
                helperText={helper}
              >
                {results.map(
                  item =>
                    propName &&
                    labelName && (
                      <MenuItem key={item.id} value={item[propName]}>
                        {item[labelName]}
                      </MenuItem>
                    ),
                )}
              </TextField>
            );
          }}
        </GetAll>
      );

    return isDev ? <div className={classes.root}>{SelectCmp}</div> : SelectCmp;
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
