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
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const helper = useText(helperText);

    const { label: propertyLabelText, name: propertyName } =
      getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : label;

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;
    const formComponentName = propertyName || (actionInput && actionInput.name);

    const { name: labelName } = getProperty(labelProp) || {};
    const { name: propName } = getProperty(valueProp) || {};

    const handleChange = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    const SelectCmp =
      optionType === 'static' ? (
        <TextField
          select
          value={value}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          onChange={handleChange}
          inputProps={{
            name: formComponentName,
            tabIndex: isDev ? -1 : 0,
          }}
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
                inputProps={{
                  name: formComponentName,
                  tabIndex: isDev ? -1 : 0,
                }}
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
