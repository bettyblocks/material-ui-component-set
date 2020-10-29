(() => ({
  name: 'Checkbox',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      error,
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

    const [errorState, setErrorState] = useState(error);
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
      <FormControl
        required={required}
        error={errorState}
        classes={{ root: classes.formControl }}
      >
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
  styles: B => t => {
    const style = new B.Styling(t);
    const { color: colorFunc } = B;
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      formControl: {
        '& > legend': {
          '&.Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& > p': {
          color: ({ options: { helperColor } }) => [
            style.getColor(helperColor),
            '!important',
          ],
          '&.Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
        },
        '& .MuiFormControlLabel-root': {
          '& .MuiCheckbox-root': {
            color: ({ options: { checkboxColor } }) => [
              style.getColor(checkboxColor),
              '!important',
            ],
            '&:hover': {
              backgroundColor: ({ options: { checkboxColor } }) => [
                getOpacColor(style.getColor(checkboxColor), 0.04),
                '!important',
              ],
            },
            '&.Mui-checked': {
              color: ({ options: { checkboxColorChecked } }) => [
                style.getColor(checkboxColorChecked),
                '!important',
              ],
              '&:hover': {
                backgroundColor: ({ options: { checkboxColorChecked } }) => [
                  getOpacColor(style.getColor(checkboxColorChecked), 0.04),
                  '!important',
                ],
              },
            },
          },
          '& .MuiTypography-root': {
            color: ({ options: { textColor } }) => [
              style.getColor(textColor),
              '!important',
            ],
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
      },
    };
  },
}))();
