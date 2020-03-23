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
      name,
      fullWidth,
    } = options;
    const { useText } = B;
    const isDev = B.env === 'dev';
    let componentLabel = label.map(l => (l.name ? l.name : l)).join(' ');
    let componentName = name.map(n => (n.name ? n.name : n)).join(' ');
    let componentValue = value.map(v => (v.name ? v.name : v)).join(' ');
    if (!isDev) {
      componentLabel = useText(label);
      componentName = useText(name);
      componentValue = useText(value);
    }
    const [setChecked] = useState({
      name: componentName,
      value: componentValue,
    });

    const { Checkbox, FormControlLabel, FormControl } = window.MaterialUI.Core;

    const handleChange = evt => {
      const { name: evtName, value: evtValue } = evt.target;
      setChecked({ name: evtName, value: evtValue });
    };

    const checkbox = (
      <Checkbox
        value={componentValue}
        onChange={handleChange}
        name={componentName}
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
