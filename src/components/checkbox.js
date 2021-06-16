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
      isSwitch,
    } = options;
    const { env, useText, getCustomModelAttribute } = B;
    const isDev = env === 'dev';

    const [errorState, setErrorState] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const mounted = useRef(false);
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
      required: defaultRequired = false,
    } = customModelAttributeObj;
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const {
      name: customModelAttributeName,
      validations: { attributeRequired } = {},
    } = customModelAttribute || {};
    const required = customModelAttribute ? attributeRequired : defaultRequired;
    const labelText = useText(label);
    const componentChecked = useText(defaultValue);
    const [checked, setChecked] = useState(componentChecked === 'true');
    const nameAttributeValue = useText(nameAttribute);

    const {
      Checkbox: MUICheckbox,
      Switch,
      FormControlLabel,
      FormControl,
      FormHelperText,
    } = window.MaterialUI.Core;

    const handleValidation = isValid => {
      setErrorState(!isValid);
      const message = useText(!isValid ? validationValueMissing : helperText);
      setHelper(message);
    };

    const handleChange = evt => {
      const isChecked = evt.target.checked;
      const isValid = (isChecked && required) || !required;
      handleValidation(isValid);
      setChecked(evt.target.checked);
    };

    const invalidHandler = event => {
      event.preventDefault();
      const {
        target: {
          validity: { valid: isValid },
        },
      } = event;
      handleValidation(isValid);
    };

    useEffect(() => {
      if (checked) {
        B.triggerEvent('isTrue', true);
      } else {
        B.triggerEvent('isFalse', false);
      }
      if (mounted.current) {
        B.triggerEvent('onChange', checked);
      }
    }, [checked]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useEffect(() => {
      if (isDev) {
        setChecked(useText(defaultValue) === 'true');
      }
    }, [isDev, defaultValue]);

    const props = {
      checked,
      required,
      onInvalid: invalidHandler,
      onChange: handleChange,
      name: nameAttributeValue || customModelAttributeName,
      disabled,
      size,
      tabIndex: isDev && -1,
      value: 'on',
    };

    const Checkbox = <MUICheckbox {...props} />;
    const SwitchComponent = <Switch {...props} />;

    const ControlLabel = (
      <>
        {labelText}
        {required ? (
          <span className={errorState ? classes.formControlRequired : null}>
            {' '}
            *
          </span>
        ) : (
          ''
        )}
      </>
    );

    const Control = (
      <FormControl
        required={required}
        error={errorState}
        classes={{ root: classes.formControl }}
      >
        <FormControlLabel
          control={isSwitch ? SwitchComponent : Checkbox}
          label={ControlLabel}
          labelPlacement={position}
        />
        {!!helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    );
    return isDev ? <div className={classes.root}>{Control}</div> : Control;
  })(),
  styles: B => t => {
    const { color: colorFunc, Styling } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      formControlRequired: {
        color: ({ options: { errorColor } }) => [
          style.getColor(errorColor),
          '!important',
        ],
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
          '& .MuiSwitch-root': {
            '& .MuiSwitch-track': {
              backgroundColor: ({ options: { checkboxColor } }) => [
                style.getColor(checkboxColor),
                '!important',
              ],
            },
            '& .Mui-checked': {
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
            '& .Mui-checked ~ .MuiSwitch-track': {
              backgroundColor: ({ options: { checkboxColorChecked } }) => [
                style.getColor(checkboxColorChecked),
                '!important',
              ],
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
