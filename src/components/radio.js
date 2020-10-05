(() => ({
  name: 'RadioGroup',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      required,
      disabled,
      defaultValue,
      row,
      helperText,
      radioOptions,
      model,
      optionType,
      labelProp,
      valueProp,
      size,
      position,
      margin,
      filter,
      fullWidth,
      showError,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      property,
      validationValueMissing,
      nameAttribute,
      submit,
    } = options;
    const isDev = B.env === 'dev';
    const displayError = showError === 'built-in';

    const { useGetAll, getProperty, useText, getCustomModelAttribute } = B;

    const { id: customModelAttributeId, label } = customModelAttributeObj;
    const { kind, values: listValues } = getProperty(property) || {};
    const labelText = useText(label);

    const labelProperty = getProperty(labelProp);
    const valueProperty = getProperty(valueProp);
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const customModelAttributeName =
      customModelAttribute && customModelAttribute.name;
    const nameAttributeValue = useText(nameAttribute);

    let componentValue = useText(defaultValue);

    componentValue = isNaN(Number(componentValue))
      ? componentValue
      : Number(componentValue);

    // maintain the type of the value
    const getValue = val => (isNaN(Number(val)) ? val : Number(val));
    const [value, setValue] = useState(getValue(componentValue));
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    let radioValues = [];

    const {
      FormControl: MUIFormControl,
      RadioGroup,
      FormControlLabel: MUIFormControlLabel,
      FormHelperText,
      FormLabel,
      Radio,
    } = window.MaterialUI.Core;

    const { loading, error: err, data, refetch } =
      model && useGetAll(model, { filter, skip: 0, take: 50 });

    const mounted = useRef(true);
    useEffect(() => {
      if (!mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
      mounted.current = false;
    }, [loading]);

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
      B.defineFunction('Refetch', () => refetch());
    }, [refetch]);

    // renders the radio component
    const renderRadio = (optionValue, optionLabel) => (
      <MUIFormControlLabel
        disabled={disabled}
        value={optionValue}
        control={<Radio tabIndex={isDev && -1} size={size} />}
        label={optionLabel}
        labelPlacement={position}
      />
    );
    const radioData = (radioOptions || '').split('\n');

    const renderRadios = () => {
      if (kind === 'list' || kind === 'LIST') {
        return listValues.map(({ value: v }) => renderRadio(v, v));
      }
      if (optionType === 'static') {
        radioValues = radioData.map(option => option);
        return radioData.map(option => renderRadio(option, option));
      }
      if (isDev) return renderRadio('value', 'Placeholder');
      if (loading) return <span>Loading...</span>;
      if (err && displayError) return <span>{err.message}</span>;

      radioValues = results.map(item => item[valueProperty.name]);
      return results.map(item =>
        renderRadio(item[valueProperty.name], item[labelProperty.name]),
      );
    };

    const handleValidation = () => {
      const hasError = required && !radioValues.includes(value);
      setErrorState(hasError);
      const message = hasError
        ? useText(validationValueMissing)
        : useText(helperText);
      setHelper(message);
    };

    const inputRef = useRef(null);

    const handleChange = evt => {
      if (afterFirstInvalidation) {
        handleValidation();
      }

      setValue(getValue(evt.target.value));
      if (submit && input.current.form) {
        inputRef.current.form.dispatchEvent(new Event('submit'));
      }
    };

    const validationHandler = () => {
      const hasError = required && !radioValues.includes(value);
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    useEffect(() => {
      if (isDev) {
        setValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    const FormControl = (
      <MUIFormControl
        classes={{ root: classes.formControl }}
        required={required}
        margin={margin}
        component="fieldset"
        error={errorState}
        fullWidth={fullWidth}
      >
        {!hideLabel && <FormLabel component="legend">{labelText}</FormLabel>}
        <RadioGroup
          row={row}
          value={value}
          name={nameAttributeValue || customModelAttributeName}
          onChange={handleChange}
          onBlur={validationHandler}
          aria-label={labelText}
        >
          {renderRadios()}
        </RadioGroup>
        <FormHelperText>{helper}</FormHelperText>
        <input
          className={classes.validationInput}
          onInvalid={validationHandler}
          type="text"
          tabIndex="-1"
          required={required}
          value={radioValues.includes(value) ? value : ''}
        />
      </MUIFormControl>
    );

    return isDev ? (
      <div className={classes.root}>{FormControl}</div>
    ) : (
      FormControl
    );
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
      validationInput: {
        height: 0,
        width: 0,
        fontSize: 0,
        padding: 0,
        border: 'none',
        pointerEvents: 'none',
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
          '& .MuiRadio-root': {
            color: ({ options: { radioColor } }) => [
              style.getColor(radioColor),
              '!important',
            ],
            '&:hover': {
              backgroundColor: ({ options: { radioColor } }) => [
                getOpacColor(style.getColor(radioColor), 0.04),
                '!important',
              ],
            },
            '&.Mui-checked': {
              color: ({ options: { radioColorChecked } }) => [
                style.getColor(radioColorChecked),
                '!important',
              ],
              '&:hover': {
                backgroundColor: ({ options: { radioColorChecked } }) => [
                  getOpacColor(style.getColor(radioColorChecked), 0.04),
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
