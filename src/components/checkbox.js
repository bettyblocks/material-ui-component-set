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
    } = options;

    const { useText, getActionInput, getProperty, GetAll } = B;
    const isDev = B.env === 'dev';
    const actionInput = getActionInput(actionInputId);

    const componentLabel = useText(label);
    const componentHelperText = useText(helperText);
    const propLabelOverride = useText(propertyLabelOverride);
    const { label: propertyLabelText, name: propertyName } =
      getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);

    const returnArray = () => {
      let value = useText(defaultValue);
      if (!Array.isArray(value)) {
        value = [value];
      }
      return value;
    };

    const [values, setValues] = useState(returnArray());

    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : componentLabel;
    const formComponentName = propertyName || (actionInput && actionInput.name);

    useEffect(() => {
      if (isDev) {
        setValues(returnArray());
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
        name={formComponentName}
        disabled={disabled}
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
              if (loading) return <span>Loading...</span>;

              if (err) {
                return <span>Something went wrong: {err.message} :(</span>;
              }

              const { results } = data;
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
