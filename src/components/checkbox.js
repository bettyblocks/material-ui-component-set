(() => ({
  name: 'Checkbox',
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
      row,
      checkboxOptions,
      model,
      optionType,
      labelProp,
      valueProp,
      margin,
      filter,
      fullWidth,
      showError,
      hideLabel,
    } = options;

    const { useText, getActionInput, getProperty, useGetAll } = B;
    const displayError = showError === 'built-in';
    const isDev = B.env === 'dev';
    const actionInput = getActionInput(actionInputId);

    const componentLabel = useText(label);
    const componentHelperText = useText(helperText);
    const propLabelOverride = useText(propertyLabelOverride);
    const { label: propertyLabelText, name: propertyName } =
      getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);

    const getValues = () => {
      const value = useText(defaultValue);
      // split the string and trim spaces
      return !Array.isArray(value)
        ? value.split(',').map(str => str.trim())
        : value;
    };

    const [values, setValues] = useState(getValues());

    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : componentLabel;
    const formComponentName = propertyName || (actionInput && actionInput.name);

    const { loading, error: err, data, refetch } =
      model && useGetAll(model, { filter, skip: 0, take: 50 });

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    if (err && !displayError) {
      B.triggerEvent('onError', err.message);
    }

    const { results } = data || {};
    if (results) {
      if (results.length > 0) {
        B.triggerEvent('onSuccess', results);
      } else {
        B.triggerEvent('onNoResults');
      }
    }

    useEffect(() => {
      if (refetch && refetch instanceof Function) {
        B.defineFunction('Refetch', () => refetch());
      }
    }, [refetch]);

    useEffect(() => {
      if (isDev) {
        setValues(getValues());
      }
    }, [isDev, defaultValue]);

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
      FormGroup,
      FormLabel,
    } = window.MaterialUI.Core;

    const handleChange = evt => {
      const { checked, value } = evt.target;
      setValues(state => {
        if (checked) return state.concat(value);
        return state.filter(v => v !== value);
      });
    };

    const renderCheckbox = (checkboxLabel, checkboxValue) => (
      <FormControlLabel
        control={<MUICheckbox tabIndex={isDev && -1} size={size} />}
        label={checkboxLabel}
        labelPlacement={position}
        checked={values.includes(checkboxValue)}
        onChange={handleChange}
        name={formComponentName}
        disabled={disabled}
        value={checkboxValue}
      />
    );

    const checkboxData = (checkboxOptions || '').split('\n');

    const renderCheckBoxes = () => {
      if (optionType !== 'data') {
        return checkboxData.map(opt => renderCheckbox(opt, opt));
      }
      if (isDev) return renderCheckbox('Placeholder', false);
      if (loading) return <span>Loading...</span>;
      if (err && displayError) return <span>{err.message}</span>;
      return results.map(item =>
        renderCheckbox(item[labelProperty.name], `${item[valueProperty.name]}`),
      );
    };

    const Control = (
      <FormControl
        classes={{ root: classes.formControl }}
        margin={margin}
        component="fieldset"
        required={required}
        error={error}
        fullWidth={fullWidth}
      >
        {labelText && !hideLabel && (
          <FormLabel component="legend">{labelText}</FormLabel>
        )}
        <FormGroup row={row}>{renderCheckBoxes()}</FormGroup>
        {componentHelperText && (
          <FormHelperText>{componentHelperText}</FormHelperText>
        )}
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
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      formControl: {
        '& > legend': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
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
