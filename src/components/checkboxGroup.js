(() => ({
  name: 'CheckboxGroup',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
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
      validationValueMissing,
    } = options;

    const {
      env,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useText,
    } = B;
    const displayError = showError === 'built-in';
    const isDev = env === 'dev';
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));

    const { kind, values: listValues = [] } = getProperty(property) || {};
    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue,
      required: defaultRequired = false,
    } = customModelAttributeObj;
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const {
      name: customModelAttributeName,
      validations: { required: attributeRequired } = {},
    } = customModelAttribute || {};
    const required = customModelAttribute ? attributeRequired : defaultRequired;
    const labelText = useText(label);
    const nameAttributeValue = useText(nameAttribute);

    const getValues = () => {
      const value = defaultValue ? useText(defaultValue) : [];
      // split the string and trim spaces
      if (Array.isArray(value)) return value;

      return value
        .split(',')
        .filter(part => part !== '')
        .map(str => str.trim());
    };

    const [values, setValues] = useState(getValues());

    useEffect(() => {
      B.triggerEvent('onChange', values);
    }, [values]);

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
        onCompleted(res) {
          const hasResult = res && res.result && res.result.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      });

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    const { results } = data || {};

    B.defineFunction('Refetch', () => refetch());

    useEffect(() => {
      if (isDev) {
        setValues(getValues());
        setHelper(useText(helperText));
      }
    }, [isDev, defaultValue, helperText]);

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
      setErrorState(false);
      setValues(state => {
        if (checked) return state.concat(value);
        return state.filter(v => v !== value);
      });
    };

    const invalidHandler = event => {
      event.preventDefault();
      setAfterFirstInvalidation(true);
      setErrorState(true);
    };

    const isValid = required ? values.join() !== '' : true;
    const hasError = errorState || !isValid;

    const renderCheckbox = (checkboxLabel, checkboxValue) => (
      <FormControlLabel
        control={
          <MUICheckbox
            required={required && !isValid}
            tabIndex={isDev && -1}
            size={size}
          />
        }
        label={checkboxLabel}
        labelPlacement={position}
        checked={values.includes(checkboxValue)}
        onChange={handleChange}
        disabled={disabled}
        name={nameAttributeValue || customModelAttributeName}
        value={checkboxValue}
        onInvalid={invalidHandler}
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

    useEffect(() => {
      if (afterFirstInvalidation) {
        const message = useText(hasError ? validationValueMissing : helperText);
        setHelper(message);
      }
    }, [errorState, values, required, afterFirstInvalidation]);

    const Control = (
      <FormControl
        classes={{ root: classes.formControl }}
        margin={margin}
        component="fieldset"
        required={required}
        error={afterFirstInvalidation && hasError}
        fullWidth={fullWidth}
      >
        {labelText && !hideLabel && (
          <FormLabel component="legend">{labelText}</FormLabel>
        )}
        <FormGroup row={row}>{renderCheckBoxes()}</FormGroup>
        {helper && <FormHelperText>{helper}</FormHelperText>}
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
