(() => ({
  name: 'RadioInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      dataComponentAttribute = ['Radio'],
      disabled: initialIsDisabled,
      filter,
      fullWidth,
      helperText = [''],
      hideLabel,
      label,
      labelPosition,
      labelProperty,
      margin,
      model,
      order,
      orderBy,
      property,
      required,
      row,
      size,
      validationValueMissing = [''],
      value: prefabValue,
    } = options;
    const {
      env,
      generateUUID,
      getProperty,
      useAllQuery,
      useRelation,
      useText,
    } = B;
    const {
      FormControl: MUIFormControl,
      FormControlLabel: MUIFormControlLabel,
      FormHelperText,
      FormLabel,
      Radio,
      RadioGroup,
    } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const modelProperty = getProperty(property || '') || {};

    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [interactionFilter, setInteractionFilter] = useState({});
    const [disabled, setIsDisabled] = useState(initialIsDisabled);
    const mounted = useRef(false);
    const getValue = (val) => (isNaN(Number(val)) ? val : Number(val));
    const labelText = useText(label);
    const defaultValueText = useText(prefabValue);
    const helperTextResolved = useText(helperText);
    const validationMessageText = useText(validationValueMissing);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const { contextModelId } = model;

    const {
      referenceModelId,
      modelId = contextModelId || model,
      kind,
      values = [],
      allowedValues = [],
    } = modelProperty;

    const isListProperty = kind === 'list' || kind === 'LIST';
    const isObjectProperty = kind === 'object' || kind === 'OBJECT';
    const isPageVariableProperty = prefabValue.find(
      (item) => item.type === 'PAGE_VARIABLE_MODEL_PROPERTY',
    );

    const isPropertyArray = Boolean(
      prefabValue.length && prefabValue.some((p) => p.type === 'PROPERTY'),
    );

    let resolvedCurrentValue;

    // set the value based on the selected property type (list, relational or object)
    if (isObjectProperty) {
      resolvedCurrentValue = JSON.stringify({ uuid: defaultValueText });
    } else if (isListProperty) {
      resolvedCurrentValue = defaultValueText;
    } else if (isPropertyArray && !isObjectProperty) {
      resolvedCurrentValue = parseInt(defaultValueText, 10) || '';
    } else if (isPageVariableProperty) {
      resolvedCurrentValue = getValue(defaultValueText);
    } else if (kind === undefined) {
      // if kind is undefined, it is non property based
      resolvedCurrentValue = '';
    } else {
      resolvedCurrentValue = getValue(prefabValue);
    }
    const [currentValue, setCurrentValue] = useState(resolvedCurrentValue);

    useEffect(() => {
      setCurrentValue(resolvedCurrentValue);
    }, [defaultValueText]);

    B.defineFunction('Clear', () => setCurrentValue(''));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));

    const transformValue = (arg) => {
      if (arg instanceof Date) {
        return arg.toISOString();
      }

      return arg;
    };

    const deepMerge = (...objects) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach((key) => {
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

    const orderByArray = [orderBy].flat();
    const sort =
      !isDev && orderBy.id
        ? orderByArray.reduceRight((acc, orderByProperty, index) => {
            const prop = getProperty(orderByProperty);
            return index === orderByArray.length - 1
              ? { [prop.name]: order.toUpperCase() }
              : { [prop.name]: acc };
          }, {})
        : {};

    let interactionFilters = {};

    const isEmptyValue = (arg) =>
      !arg || (Array.isArray(arg) && arg.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value: valueArg }]) => !isEmptyValue(valueArg))
      .map(([, { property: propertyArg, value: valueArg }]) =>
        propertyArg.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(valueArg)
              ? {
                  _or: valueArg.map((el) => ({
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

    const {
      data: queryData,
      loading: queryLoading,
      refetch,
    } = useAllQuery(
      referenceModelId || modelId,
      {
        filter: completeFilter,
        take: 50,
        variables: {
          ...(orderBy.id ? { sort: { relation: sort } } : {}),
        },
      },
      !!contextModelId || !model,
    );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );

    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;

    useEffect(() => {
      B.defineFunction('Refetch', () => refetch());

      /**
       * @name Filter
       * @param {Property} property
       * @returns {Void}
       */
      B.defineFunction(
        'Filter',
        ({ event, property: propertyArg, interactionId }) => {
          setInteractionFilter((s) => ({
            ...s,
            [interactionId]: {
              property: propertyArg,
              value: event.target ? event.target.value : transformValue(event),
            },
          }));
        },
      );

      B.defineFunction('ResetFilter', () => {
        setInteractionFilter({});
      });
    }, []);

    useEffect(() => {
      B.defineFunction('Reset', () => setCurrentValue(defaultValueText));
    }, []);

    useEffect(() => {
      if (mounted.current) {
        B.triggerEvent('onChange', currentValue);
      }
    }, [currentValue]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    const handleValidation = () => {
      const hasError = required && !currentValue;
      setErrorState(hasError);
      const message = hasError ? validationMessageText : helperTextResolved;
      setHelper(message);
    };

    const handleChange = (event) => {
      const {
        target: { value: eventValue },
      } = event;

      if (afterFirstInvalidation) {
        handleValidation();
      }

      setCurrentValue(isListProperty ? eventValue : getValue(eventValue));
    };

    const validationHandler = () => {
      const hasError = required && !currentValue;
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(defaultValueText);
      }
    }, [isDev, defaultValueText]);

    let valid = true;
    let message = '';

    if (!isListProperty && !isDev) {
      if (!modelId) {
        message = 'No model selected';
        valid = false;
      }
    }

    // renders the radio component
    const renderRadio = (optionValue, optionLabel) => {
      const labelControlRef = generateUUID();
      return (
        <MUIFormControlLabel
          for={labelControlRef}
          disabled={disabled}
          value={optionValue}
          control={
            <Radio
              id={labelControlRef}
              tabIndex={isDev ? -1 : undefined}
              size={size}
            />
          }
          label={optionLabel}
          labelPlacement={labelPosition}
        />
      );
    };

    const renderRadios = () => {
      if (!valid) {
        return <span>{message}</span>;
      }

      if (isDev && !isListProperty && !isObjectProperty)
        return renderRadio('value', 'Placeholder');

      if (isObjectProperty) {
        return allowedValues.map((item) => {
          return renderRadio(
            JSON.stringify({ uuid: item.uuid }),
            item[labelProperty.useKey || 'uuid'],
          );
        });
      }

      if (isListProperty) {
        return values.map(({ value }) => renderRadio(value, value));
      }

      if (!loading && !isDev) {
        let labelKey = 'id';
        if (labelProperty) {
          labelKey = B.getProperty(labelProperty).name;
        } else {
          const modelReference = B.getModel(referenceModelId || modelId);
          if (modelReference.labelPropertyId)
            labelKey = B.getProperty(modelReference.labelPropertyId).name;
        }

        const results = data ? data.results : [];

        return results.map((result) => {
          return renderRadio(result.id, result[labelKey]);
        });
      }

      if (!loading && !data) {
        return <span>unable to fetch data</span>;
      }

      return <span>loading...</span>;
    };

    const RadioComp = (
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
          className={includeStyling()}
          value={currentValue}
          name={name}
          onChange={handleChange}
          onBlur={validationHandler}
          aria-label={labelText}
          data-component={dataComponentAttributeValue}
        >
          {renderRadios()}
        </RadioGroup>
        <FormHelperText>{helper}</FormHelperText>
        <input
          className={classes.validationInput}
          onInvalid={() => {
            const hasError = required && !currentValue;
            setAfterFirstInvalidation(hasError);
            handleValidation();
          }}
          type="text"
          tabIndex="-1"
          required={required}
          value={currentValue}
        />
      </MUIFormControl>
    );

    return isDev ? <div className={classes.root}>{RadioComp}</div> : RadioComp;
  })(),
  styles: (B) => (t) => {
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
