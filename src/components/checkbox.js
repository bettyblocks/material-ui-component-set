(() => ({
  name: 'Checkbox',
  type: 'CHECKBOX',
  category: 'FORM',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      // formComponentName,
      // color,
      disabled,
      checked,
      // size,
      error,
      required,
      position,
      name,
      // margin,
    } = options;
    const { useText } = B;
    const isDev = B.env === 'dev';
    const componentValue = isDev
      ? checked.map(v => (v.name ? v.name : v)).join(' ')
      : useText(checked);
    // hacky
    const [value, setValue] = useState(!!componentValue);

    const {
      Checkbox,
      FormControlLabel,
      FormControl,
      // FormGroup,
    } = window.MaterialUI.Core;

    // const handleChange = event => {
    //   setValue(event.target.checked);
    //   if (options.handleValueChange) {
    //     options.handleValueChange({
    //       name: formComponentName,
    //       value: event.target.checked,
    //     });
    //   }
    // };
    const componentLabel = isDev
      ? label.map(l => (l.name ? l.name : l)).join(' ')
      : useText(label);
    const componentName = isDev
      ? name.map(n => (n.name ? n.name : n)).join(' ')
      : useText(name);

    const checkbox = (
      <Checkbox
        checked={value}
        color={error ? 'secondary' : 'primary'} // this will change
        // size={size}
        // onChange={handleChange}
        name={componentName}
        disabled={disabled}
      />
    );

    const control = (
      <FormControl
        // margin={margin}
        required={required}
        error={error}
        // className={classes.checkbox}
      >
        <FormControlLabel
          control={checkbox}
          label={componentLabel}
          labelPlacement={position}
        />
      </FormControl>
    );
    return isDev ? <div>{control}</div> : control;
  })(),
  styles: B => ({
    checkbox: {
      display: 'block',
    },
  }),
}))();
