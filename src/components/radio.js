(() => ({
  name: 'RadioGroup',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      required,
      disabled,
      defaultValue,
      row,
      helperText,
      radioOptions,
      model,
      optionType,
      labelProp,
      valueProp,
      actionInputId,
      size,
      position,
      margin,
      error,
      filter,
    } = options;
    const isDev = B.env === 'dev';
    const { GetAll, getProperty, useText, getActionInput } = B;

    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const actionInput = getActionInput(actionInputId);

    let componentValue = defaultValue.map(v => (v.name ? v.name : v)).join(' ');
    let componentHelperText = helperText
      .map(h => (h.name ? h.name : h))
      .join(' ');

    if (!isDev) {
      componentValue = useText(defaultValue);
      componentHelperText = useText(helperText);
    }

    componentValue = isNaN(Number(componentValue))
      ? componentValue
      : Number(componentValue);

    // maintain the type of the value
    const getValue = val => (isNaN(Number(val)) ? val : Number(val));
    const [value, setValue] = useState(getValue(componentValue));

    useEffect(() => {
      setValue(getValue(componentValue));
    }, [componentValue]);

    const {
      FormControl: MUIFormControl,
      RadioGroup,
      FormControlLabel: MUIFormControlLabel,
      FormHelperText,
      FormLabel,
      Radio,
    } = window.MaterialUI.Core;

    // renders the radio component
    const renderRadio = (optionValue, optionLabel) => (
      <MUIFormControlLabel
        disabled={disabled}
        value={optionValue}
        control={<Radio size={size} />}
        label={optionLabel}
        labelPlacement={position}
      />
    );

    const radioData = (radioOptions || '').split('\n');
    let Radios = radioData.map(option => renderRadio(option, option));

    if (optionType === 'data') {
      Radios = renderRadio('value', 'Placeholder');
      if (!isDev) {
        Radios = (
          <GetAll modelId={model} filter={filter} skip={0} take={50}>
            {({ loading, error: err, data }) => {
              if (loading) return <span>Loading...</span>;

              if (err) {
                return <span>Something went wrong: {err.message} :(</span>;
              }

              const { results } = data;
              return results.map(item =>
                renderRadio(item[valueProperty.name], item[labelProperty.name]),
              );
            }}
          </GetAll>
        );
      }
    }

    const handleChange = evt => {
      setValue(getValue(evt.target.value));
    };

    const FormControl = (
      <MUIFormControl
        className={classes.formControl}
        required={required}
        margin={margin}
        component="fieldset"
        error={error}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          row={row}
          value={value}
          name={actionInput && actionInput.name}
          onChange={handleChange}
          aria-label={label}
        >
          {Radios}
        </RadioGroup>
        <FormHelperText>{componentHelperText}</FormHelperText>
      </MUIFormControl>
    );

    return isDev ? (
      <div className={classes.root}>{FormControl}</div>
    ) : (
      FormControl
    );
  })(),
  styles: () => () => ({
    formControl: {
      display: 'block',
    },
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
  }),
}))();
