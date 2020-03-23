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
      value,
      error,
      required,
      position,
      fullWidth,
      actionInputId,
    } = options;
    const { useText, getActionInput } = B;
    const isDev = B.env === 'dev';
    let componentLabel = label.map(l => (l.name ? l.name : l)).join(' ');
    let componentValue = value.map(v => (v.name ? v.name : v)).join(' ');
    const actionInput = getActionInput(actionInputId);
    if (!isDev) {
      componentLabel = useText(label);
      componentValue = useText(value);
    }
    const [stateValue, setValue] = useState({ value: componentValue });

    const { Checkbox, FormControlLabel, FormControl } = window.MaterialUI.Core;

    const handleChange = evt => {
      setValue({ value: evt.target.value });
    };

    const checkbox = (
      <Checkbox
        value={stateValue}
        onChange={handleChange}
        name={actionInput && actionInput.name}
        disabled={disabled}
      />
    );

    const control = (
      <FormControl required={required} error={error} fullWidth={fullWidth}>
        <FormControlLabel
          control={checkbox}
          label={componentLabel}
          labelPlacement={position}
        />
      </FormControl>
    );
    return isDev ? <div className={classes.root}>{control}</div> : control;
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
