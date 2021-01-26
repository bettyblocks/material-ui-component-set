(() => ({
  name: 'CheckboxGroup',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      error,
      position,
      size,
      helperText,
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
      customModelAttribute: customModelAttributeObj,
      property,
      nameAttribute,
      order,
      orderBy,
    } = options;

    const {
      defineFunction = () => {},
      env,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useText,
      triggerEvent = () => {},
    } = B;
    const displayError = showError === 'built-in';
    const isDev = env === 'dev';

    const componentHelperText = useText(helperText);
    const { kind, values: listValues = [] } = getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue,
    } = customModelAttributeObj;
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};
    const labelText = useText(label);
    const nameAttributeValue = useText(nameAttribute);

    const getValues = () => {
      const value = defaultValue ? useText(defaultValue) : [];
      // split the string and trim spaces
      return !Array.isArray(value)
        ? value.split(',').map(str => str.trim())
        : value;
    };

    const [values, setValues] = useState(getValues());

    const orderByArray = [orderBy].flat();
    const sort =
      !isDev && orderBy
        ? orderByArray.reduceRight((acc, orderByProperty, index) => {
            const prop = getProperty(orderByProperty);
            return index === orderByArray.length - 1
              ? { [prop.name]: order.toUpperCase() }
              : { [prop.name]: acc };
          }, {})
        : {};

    const { loading, error: err, data, refetch } =
      model &&
      useAllQuery(model, {
        filter,
        skip: 0,
        take: 50,
        variables: {
          ...(orderBy ? { sort: { relation: sort } } : {}),
        },
      });

    if (loading) {
      triggerEvent('onLoad', loading);
    }

    if (err && !displayError) {
      triggerEvent('onError', err);
    }

    const { results } = data || {};
    if (results) {
      if (results.length > 0) {
        triggerEvent('onSuccess', results);
      } else {
        triggerEvent('onNoResults');
      }
    }

    defineFunction('Refetch', () => refetch());

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
        disabled={disabled}
        name={nameAttributeValue || customModelAttributeName}
        value={checkboxValue}
      />
    );

    const renderCheckBoxes = () => {
      if (kind === 'list' || kind === 'LIST') {
        return listValues.map(({ value: v }) => renderCheckbox(v, v));
      }
      if (optionType === 'static') {
        return (checkboxOptions || '')
          .split('\n')
          .map(opt => renderCheckbox(opt, opt));
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
    const { color: colorFunc, Styling } = B;
    const style = new Styling(t);
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
