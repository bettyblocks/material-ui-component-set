(() => ({
  name: 'RadioGroup',
  type: 'CONTENT_COMPONENT',
  category: 'FORM',
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
    } = options;
    const isDev = B.env === 'dev';
    const { GetAll, getProperty, useText, getActionInput } = B;

    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const actionInput = getActionInput(actionInputId);

    let legend = label.map(l => (l.name ? l.name : l)).join(' ');
    let componentValue = defaultValue.map(v => (v.name ? v.name : v)).join(' ');
    let componentHelperText = helperText
      .map(h => (h.name ? h.name : h))
      .join(' ');

    if (!isDev) {
      legend = useText(label);
      componentValue = useText(defaultValue);
      componentHelperText = useText(helperText);
    }

    const [value, setValue] = useState(componentValue);

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
          <GetAll modelId={model} skip={0} take={50}>
            {({ loading, error, data }) => {
              if (loading) return <span>Loading...</span>;

              if (error) {
                return <span>Something went wrong: {error.message} :(</span>;
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

    const FormControl = (
      <MUIFormControl required={required} component="fieldset">
        <FormLabel component="legend">{legend}</FormLabel>
        <RadioGroup
          row={row}
          value={value}
          name={actionInput && actionInput.name}
          onChange={event => setValue(event.target.value)}
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
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
  }),
}))();
