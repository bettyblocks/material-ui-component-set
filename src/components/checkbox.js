(() => ({
  name: 'Checkbox',
  type: 'CONTENT_COMPONENT',
  category: 'FORM',
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
    } = options;
    const { useText, getActionInput } = B;
    const isDev = B.env === 'dev';
    let componentLabel = label.map(l => (l.name ? l.name : l)).join(' ');
    let componentValue = defaultValue.map(v => (v.name ? v.name : v)).join(' ');
    const actionInput = getActionInput(actionInputId);
    if (!isDev) {
      componentLabel = useText(label);
      componentValue = useText(defaultValue);
    }
    const [value, setValue] = useState({ value: componentValue });

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
    } = window.MaterialUI.Core;

    const handleChange = evt => {
      setValue({ value: evt.target.value });
    };

    const Checkbox = (
      <MUICheckbox
        value={value}
        onChange={handleChange}
        name={actionInput && actionInput.name}
        disabled={disabled}
        size={size}
      />
    );

    const Control = (
      <FormControl required={required} error={error}>
        <FormControlLabel
          control={Checkbox}
          label={componentLabel}
          labelPlacement={position}
        />
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
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
