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
      selectOptions = '',
      model,
      filter,
      optionType,
      labelProperty: labelProp,
      valueProperty: valueProp,
      actionInputId,
      property,
      propertyLabelOverride,
      showError,
    } = options;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const displayError = showError === 'built-in';
    const isDev = B.env === 'dev';
    const { GetAll, getProperty, getActionInput, useText } = B;
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const helper = useText(helperText);

    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;

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

    const TextComp = ({ children }) => (
      <TextField
        select
        defaultValue={value}
        value={value}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        onChange={handleChange}
        inputProps={{
          name: actionInput && actionInput.name,
          tabIndex: isDev ? -1 : 0,
        }}
        required={required}
        disabled={disabled}
        label={labelText}
        error={hasError}
        margin={margin}
        helperText={helper}
      >
        {children}
      </TextField>
    );

    let SelectCmp = (
      <TextComp>
        {selectOptions.split('\n').map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextComp>
    );
    if (optionType !== 'static') {
      SelectCmp = (
        <GetAll modelId={model} filter={filter} skip={0} take={50}>
          {({ loading, error, data }) => {
            if (loading) {
              B.triggerEvent('onLoad', loading);
              return <span>Loading...</span>;
            }

            if (error && !displayError) {
              B.triggerEvent('onError', error.message);
            }
            if (error && displayError) {
              return <span>{error.message}</span>;
            }

            const { results = [] } = data || {};

            if (results.length > 0) {
              B.triggerEvent('onSuccess', results);
            } else {
              B.triggerEvent('onNoResults', results);
            }

            return (
              <TextComp>
                {results.map(
                  item =>
                    propName &&
                    labelName && (
                      <MenuItem key={item.id} value={item[propName]}>
                        {item[labelName]}
                      </MenuItem>
                    ),
                )}
              </TextComp>
            );
          }}
        </GetAll>
      );
    }

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
