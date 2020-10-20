(() => ({
  name: 'Checkbox',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      position,
      size,
      helperText,
      customModelAttribute: customModelAttributeObj,
      validationValueMissing,
      nameAttribute,
    } = options;
    const { useText, getCustomModelAttribute } = B;
    const isDev = B.env === 'dev';

    const [errorState, setErrorState] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
    } = customModelAttributeObj;
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};
    const labelText = useText(label);
    const componentChecked = useText(defaultValue);
    const [checked, setChecked] = useState(componentChecked === 'true');
    const nameAttributeValue = useText(nameAttribute);

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
        name={nameAttributeValue || customModelAttributeName}
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
