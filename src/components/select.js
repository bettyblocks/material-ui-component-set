(() => ({
  name: 'Select',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      variant,
      size,
      fullWidth,
      margin,
      helperText,
      selectOptions = '',
      model,
      filter,
      optionType,
      labelProperty: labelProp,
      valueProperty: valueProp,
      showError,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      property,
      validationValueMissing,
      nameAttribute,
      order,
      orderBy,
      blanco,
    } = options;
    const {
      env,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useText,
    } = B;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const displayError = showError === 'built-in';
    const isDev = env === 'dev';
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [interactionFilter, setInteractionFilter] = useState({});
    const mounted = useRef(false);
    const blancoText = useText(blanco);

    const { kind, values = [] } = getProperty(property) || {};

    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
      required: defaultRequired = false,
    } = customModelAttributeObj;

    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const labelText = useText(label);
    const nameAttributeValue = useText(nameAttribute);

    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const {
      name: customModelAttributeName,
      validations: { required: attributeRequired } = {},
    } = customModelAttribute || {};
    const required = customModelAttribute ? attributeRequired : defaultRequired;
    const value = currentValue;

    const { name: labelName } = getProperty(labelProp) || {};
    const { name: propName } = getProperty(valueProp) || {};

    const transformValue = arg => {
      if (arg instanceof Date) {
        return arg.toISOString();
      }

      return arg;
    };

    const deepMerge = (...objects) => {
      const isObject = item =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach(key => {
          const accumulatorValue = accumulator[key];
          const valueArg = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(valueArg)) {
            accumulator[key] = accumulatorValue.concat(valueArg);
          } else if (isObject(accumulatorValue) && isObject(valueArg)) {
            accumulator[key] = deepMerge(accumulatorValue, valueArg);
          } else {
            accumulator[key] = valueArg;
          }
        });
        return accumulator;
      }, {});
    };

    B.defineFunction('Reset', () => setCurrentValue(useText(defaultValue)));

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

    let interactionFilters = {};

    const isEmptyValue = arg =>
      !arg || (Array.isArray(arg) && arg.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value: valueArg }]) => !isEmptyValue(valueArg))
      .map(([, { property: propertyArg, value: valueArg }]) =>
        propertyArg.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(valueArg)
              ? {
                  _or: valueArg.map(el => ({
                    [field]: { [propertyArg.operator]: el },
                  })),
                }
              : { [field]: { [propertyArg.operator]: valueArg } };
          }

          return { [field]: acc };
        }, {}),
      );

    interactionFilters =
      clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

    const completeFilter = deepMerge(filter, interactionFilters);

    const { loading, error, data, refetch } = useAllQuery(
      model,
      {
        filter: completeFilter,
        take: 50,
        variables: {
          ...(orderBy ? { sort: { relation: sort } } : {}),
        },
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
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
      },
      !model,
    );

    useEffect(() => {
      if (mounted.current) {
        B.triggerEvent('onChange', currentValue);
      }
    }, [currentValue]);

    useEffect(() => {
      if (mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
    }, [loading]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    const { results } = data || {};

    B.defineFunction('Refetch', () => refetch());

    /**
     * @name Filter
     * @param {Property} property
     * @returns {Void}
     */
    B.defineFunction(
      'Filter',
      ({ event, property: propertyArg, interactionId }) => {
        setInteractionFilter({
          ...interactionFilter,
          [interactionId]: {
            property: propertyArg,
            value: event.target ? event.target.value : transformValue(event),
          },
        });
      },
    );

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
    });

    const handleValidation = () => {
      const hasError = required && !value;
      setErrorState(hasError);
      const message = useText(hasError ? validationValueMissing : helperText);
      setHelper(message);
    };

    const handleChange = event => {
      const {
        target: { value: eventValue },
      } = event;

      if (afterFirstInvalidation) {
        handleValidation();
      }

      setCurrentValue(eventValue);
    };

    const validationHandler = () => {
      const hasError = required && !value;
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    const renderOptions = () => {
      if (kind === 'list' || kind === 'LIST') {
        return values.map(({ value: v }) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ));
      }
      if (optionType === 'static') {
        return selectOptions.split('\n').map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ));
      }
      if (loading) return <span>Loading...</span>;
      if (error && displayError) return <span>{error.message}</span>;
      return (results || []).map(
        item =>
          propName &&
          labelName && (
            <MenuItem key={item.id} value={item[propName]}>
              {item[labelName]}
            </MenuItem>
          ),
      );
    };

    const SelectCmp = (
      <>
        <TextField
          select={!disabled}
          defaultValue={value}
          value={value}
          size={size}
          classes={{ root: classes.formControl }}
          variant={variant}
          fullWidth={fullWidth}
          onChange={handleChange}
          onBlur={validationHandler}
          inputProps={{
            name: nameAttributeValue || customModelAttributeName,
            tabIndex: isDev ? -1 : 0,
          }}
          required={required}
          disabled={disabled}
          label={!hideLabel && labelText}
          error={errorState}
          margin={margin}
          helperText={helper}
        >
          {blancoText && <MenuItem value="">{blancoText}</MenuItem>}
          {renderOptions()}
        </TextField>
        <input
          className={classes.validationInput}
          onInvalid={validationHandler}
          type="text"
          tabIndex="-1"
          required={required}
          value={value}
        />
      </>
    );

    return isDev ? <div className={classes.root}>{SelectCmp}</div> : SelectCmp;
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
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
        '& > label': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
          zIndex: ({ options: { variant } }) =>
            variant === 'standard' ? 1 : null,
          '&.Mui-focused': {
            color: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
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
        '& .MuiInputBase-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
              borderColor: ({ options: { borderFocusColor } }) => [
                style.getColor(borderFocusColor),
                '!important',
              ],
            },
          },
          '& fieldset': {
            top: ({ options: { hideLabel } }) => (hideLabel ? 0 : null),
          },
          '& legend': {
            display: ({ options: { hideLabel } }) =>
              hideLabel ? ['none', '!important'] : null,
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
          borderColor: ({ options: { borderColor } }) => [
            style.getColor(borderColor),
            '!important',
          ],
        },
        '& .MuiInput-underline, & .MuiFilledInput-underline': {
          '&::before, &::after': {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
          '&:hover': {
            '&::before, &::after': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after': {
            borderColor: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
        },
        '& .MuiInputBase-root.Mui-error, & .MuiInputBase-root.Mui-error:hover, & .MuiInputBase-root.Mui-error.Mui-focused, & .MuiInputBase-root.Mui-error.Mui-focused:hover': {
          '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
            borderColor: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
          '&.MuiInput-underline, &.MuiFilledInput-underline': {
            '&::before, &::after': {
              borderColor: ({ options: { errorColor } }) => [
                style.getColor(errorColor),
                '!important',
              ],
            },
            '&:hover': {
              '&::before, &::after': {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
            },
            '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after': {
              borderColor: ({ options: { errorColor } }) => [
                style.getColor(errorColor),
                '!important',
              ],
            },
          },
        },
      },
    };
  },
}))();
