(() => ({
  name: 'Checkbox',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      defaultValue,
      required,
      position,
      size,
      helperText,
      customModelAttribute: customModelAttributeObj,
      property,
      propertyLabelOverride,
      validationValueMissing,
    } = options;
    const { useText, getCustomModelAttribute, getProperty } = B;
    const isDev = B.env === 'dev';

    const componentChecked = useText(defaultValue);
    const [checked, setChecked] = useState(componentChecked === 'true');
    const [errorState, setErrorState] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));

    const { id: customModelAttributeId, label } = customModelAttributeObj;
    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
    } = window.MaterialUI.Core;

    const handleValidation = isChecked => {
      const valid = (isChecked && required) || !required;
      setErrorState(!valid);
      const message = !valid
        ? useText(validationValueMissing)
        : useText(helperText);
      setHelper(message);
    };

    const handleChange = evt => {
      handleValidation(evt.target.checked);
      setChecked(evt.target.checked);
    };

    useEffect(() => {
      if (isDev) {
        setChecked(useText(defaultValue) === 'true');
      }
    }, [isDev, defaultValue]);

    const Checkbox = (
      <MUICheckbox
        checked={checked}
        onChange={handleChange}
        name={customModelAttribute && customModelAttribute.name}
        disabled={disabled}
        size={size}
        tabIndex={isDev && -1}
        value="on"
      />
    );

    const Control = (
      <FormControl required={required} error={errorState}>
        <FormControlLabel
          control={Checkbox}
          label={labelText}
          labelPlacement={position}
        />
        {!!helper && <FormHelperText>{helper}</FormHelperText>}
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
  }),
}))();
