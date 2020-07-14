(() => ({
  name: 'Checkbox',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      disabled,
      defaultValue,
      error,
      required,
      position,
      size,
      helperText,
      actionInputId,
      property,
      propertyLabelOverride,
      row,
      checkboxOptions,
      model,
      optionType,
      labelProp,
      valueProp,
      margin,
      filter,
      fullWidth,
      showError,
    } = options;

    const { useText, getActionInput, getProperty, GetAll } = B;
    const displayError = showError === 'built-in';
    const isDev = B.env === 'dev';
    const actionInput = getActionInput(actionInputId);

    const componentLabel = useText(label);
    const componentHelperText = useText(helperText);
    const propLabelOverride = useText(propertyLabelOverride);
    const { label: propertyLabelText } = getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);

    const getValues = () => {
      const value = useText(defaultValue);
      // split the string and trim spaces
      return !Array.isArray(value)
        ? value.split(',').map(str => str.trim())
        : value;
    };

    const [values, setValues] = useState(getValues());

    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : componentLabel;

    useEffect(() => {
      if (isDev) {
        setValues(getValues());
      }
    }, [isDev, defaultValue]);

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
      FormGroup,
      FormLabel,
    } = window.MaterialUI.Core;

    const handleChange = evt => {
      const { checked, value } = evt.target;
      setValues(state => {
        if (checked) return state.concat(value);
        return state.filter(v => v !== value);
      });
    };

    const renderCheckbox = (checkboxLabel, checkboxValue) => (
      <FormControlLabel
        control={<MUICheckbox tabIndex={isDev && -1} size={size} />}
        label={checkboxLabel}
        labelPlacement={position}
        checked={values.includes(checkboxValue)}
        onChange={handleChange}
        disabled={disabled}
        name={actionInput && actionInput.name}
        value={checkboxValue}
      />
    );

    const checkboxData = (checkboxOptions || '').split('\n');
    let Checkboxes = checkboxData.map(opt => renderCheckbox(opt, opt));

    if (optionType === 'data') {
      Checkboxes = renderCheckbox('Placeholder', false);
      if (!isDev) {
        Checkboxes = (
          <GetAll modelId={model} filter={filter} skip={0} take={50}>
            {({ loading, error: err, data }) => {
              if (loading) {
                B.triggerEvent('onLoad', loading);
                return <span>Loading...</span>;
              }

              if (err && !displayError) {
                B.triggerEvent('onError', err.message);
              }
              if (err && displayError) {
                return <span>{err.message}</span>;
              }

              const { results = [] } = data || {};
              if (results.length > 0) {
                B.triggerEvent('onSuccess', results);
              } else {
                B.triggerEvent('onNoResults', results);
              }

              return results.map(item =>
                renderCheckbox(
                  item[labelProperty.name],
                  `${item[valueProperty.name]}`, // this is dirty
                ),
              );
            }}
          </GetAll>
        );
      }
    }

    const Control = (
      <FormControl
        margin={margin}
        component="fieldset"
        required={required}
        error={error}
        fullWidth={fullWidth}
      >
        {!!labelText && <FormLabel component="legend">{labelText}</FormLabel>}
        <FormGroup row={row}>{Checkboxes}</FormGroup>
        {!!componentHelperText && (
          <FormHelperText>{componentHelperText}</FormHelperText>
        )}
      </FormControl>
    );
    return isDev ? <div className={classes.root}>{Control}</div> : Control;
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
