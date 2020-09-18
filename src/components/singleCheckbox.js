(() => ({
  name: 'SingleCheckbox',
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
    } = options;
    const { useText, getActionInput, getProperty } = B;
    const isDev = B.env === 'dev';
    const actionInput = getActionInput(actionInputId);

    const componentLabel = useText(label);
    const componentChecked = useText(defaultValue);
    const componentHelperText = useText(helperText);
    const propLabelOverride = useText(propertyLabelOverride);
    const { label: propertyLabelText } = getProperty(property) || {};
    const [checked, setChecked] = useState(componentChecked === 'true');

    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : componentLabel;

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
    } = window.MaterialUI.Core;

    const handleChange = evt => {
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
        name={actionInput && actionInput.name}
        disabled={disabled}
        size={size}
        tabIndex={isDev && -1}
        value="on"
      />
    );

    const Control = (
      <FormControl required={required} error={error}>
        <FormControlLabel
          control={Checkbox}
          label={labelText}
          labelPlacement={position}
        />
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
  }),
}))();
