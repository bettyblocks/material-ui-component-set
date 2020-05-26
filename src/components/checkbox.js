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
    } = options;

    const { useText, getActionInput, getProperty, GetAll } = B;
    const isDev = B.env === 'dev';
    const actionInput = getActionInput(actionInputId);

    const componentLabel = useText(label);
    const componentChecked = useText(defaultValue);
    const componentHelperText = useText(helperText);
    const propLabelOverride = useText(propertyLabelOverride);
    const { label: propertyLabelText } = getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const [checked, setChecked] = useState(componentChecked === 'true');

    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : componentLabel;

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
      FormGroup,
      FormLabel,
    } = window.MaterialUI.Core;

    const handleChange = evt => {
      setChecked(evt.target.checked);
    };

    useEffect(() => {
      if (isDev) {
        setChecked(useText(defaultValue) === 'true');
      }
    }, [isDev, defaultValue]);

    const renderCheckbox = (checkboxLabel, checkboxValue) => (
      <FormControlLabel
        control={<MUICheckbox tabIndex={isDev && -1} size={size} />}
        label={checkboxLabel}
        labelPlacement={position}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={actionInput && actionInput.name}
        value={checkboxValue}
        // value="on"
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
              if (loading) return <span>Loading...</span>;

              if (err) {
                return <span>Something went wrong: {err.message} :(</span>;
              }

              const { results } = data;
              return results.map(item =>
                renderCheckbox(
                  item[labelProperty.name],
                  item[valueProperty.name],
                ),
              );
            }}
          </GetAll>
        );
      }
    }

    const Control = (
      <FormControl
        className={classes.formControl}
        margin={margin}
        component="fieldset"
        required={required}
        error={error}
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
      '& > *': {
        pointerEvents: 'none',
      },
    },
    formControl: {
      display: 'block',
    },
  }),
}))();
