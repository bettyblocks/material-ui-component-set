(() => ({
  name: 'Switch',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      name,
      value,
      size,
      isDisabled,
      isRequired,
      isChecked,
      color,
      hasLabel,
      label,
      labelPlacement,
    } = options;

    const { FormControlLabel, Switch } = window.MaterialUI.Core;

    const { env } = B;
    const isDev = env === 'dev';

    const [state, setState] = useState({ [name]: isChecked });

    const handleChange = event => {
      setState({ [event.target.name]: event.target.checked });
    };

    const SwitchCmp = (
      <Switch
        checked={state[name]}
        onChange={handleChange}
        name={name}
        size={size}
        color={color}
        value={value}
        required={isRequired}
        disabled={isDisabled}
      />
    );

    const SwitchCmpWithLabel = (
      <FormControlLabel
        value={labelPlacement}
        control={SwitchCmp}
        label={label}
        labelPlacement={labelPlacement}
        disabled={isDisabled}
      />
    );

    const Cmp = hasLabel ? SwitchCmpWithLabel : SwitchCmp;

    return isDev ? <div>{Cmp}</div> : Cmp;
  })(),
  styles: () => () => ({}),
}))();
