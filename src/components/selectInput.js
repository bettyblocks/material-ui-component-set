(() => ({
  name: 'SelectInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId,
      allowClear,
      clearLabel,
      dataComponentAttribute = ['Select'],
      disabled: initialIsDisabled,
      filter,
      fullWidth,
      helperText = [''],
      hideLabel,
      label,
      labelProperty,
      margin,
      model,
      order,
      floatLabel,
      orderBy,
      placeholderLabel,
      property,
      required,
      size,
      validationValueMissing = [''],
      value: prefabValue,
      variant,
    } = options;
    const {
      env,
      generateUUID,
      getProperty,
      useAllQuery,
      useRelation,
      useText,
    } = B;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [interactionFilter, setInteractionFilter] = useState({});
    const [disabled, setIsDisabled] = useState(initialIsDisabled);
    const mounted = useRef(false);
    const { current: labelControlRef } = useRef(generateUUID());
    const modelProperty = getProperty(property || '') || {};
    const labelText = useText(label);
    const clearLabelText = useText(clearLabel);
    const placeholderLabelText = useText(placeholderLabel);
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

    const isObjectProperty = kind === 'object' || kind === 'OBJECT';

    const resolvedCurrentValue = isObjectProperty
      ? JSON.stringify({ uuid: defaultValueText })
      : defaultValueText || placeholderLabelText;

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
      !!contextModelId || !modelId,
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
      const hasError =
        required && (!currentValue || currentValue === placeholderLabelText);
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

      setCurrentValue(eventValue);
    };

    const validationHandler = () => {
      const hasError =
        required && (!currentValue || currentValue === placeholderLabelText);
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
    const isListProperty = kind === 'list' || kind === 'LIST';

    if (!isListProperty && !isDev) {
      if (!modelId) {
        message = 'No model selected';
        valid = false;
      }
    }

    const idOrPathLabel =
      typeof labelProperty.id !== 'undefined'
        ? labelProperty.id
        : labelProperty;
    const labelPropertyPath =
      typeof idOrPathLabel === 'string' ? [idOrPathLabel] : idOrPathLabel;

    const renderLabel = (option) => {
      let optionLabel = '';
      const emptyPropertyPath =
        labelPropertyPath.length > 0 && labelPropertyPath[0] !== '';
      if (emptyPropertyPath) {
        optionLabel = labelPropertyPath.reduce((acc, propertyId) => {
          if (!acc) {
            return null;
          }
          return acc[getProperty(propertyId).name] || null;
        }, option);
      } else {
        const modelReference = B.getModel(referenceModelId || modelId);
        if (modelReference.labelPropertyId) {
          const preDefinedLabelProperty = B.getProperty(
            modelReference.labelPropertyId,
          ).name;
          optionLabel = option[preDefinedLabelProperty];
        } else {
          optionLabel = option.id;
        }
      }

      return optionLabel === '' || optionLabel === null
        ? '-- empty --'
        : optionLabel.toString();
    };

    const renderOptions = () => {
      if (isListProperty) {
        return values.map(({ value }) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ));
      }

      if (isObjectProperty) {
        return allowedValues.map((item) => {
          const itemLabel = item[labelProperty.useKey || 'uuid'];
          const stringifiedItem = JSON.stringify({ uuid: item.uuid });
          return (
            <MenuItem key={item.uuid} value={stringifiedItem}>
              {itemLabel}
            </MenuItem>
          );
        });
      }

      if (!loading && !isDev) {
        const rows = data ? data.results : [];

        return rows.map((row) => {
          return (
            <MenuItem key={row.id} value={row.id}>
              {renderLabel(row)}
            </MenuItem>
          );
        });
      }

      if (!loading && !data) {
        return <span>unable to fetch data</span>;
      }

      return <span>loading...</span>;
    };

    const SelectCmp = (
      <>
        <TextField
          id={actionVariableId}
          InputLabelProps={{ htmlFor: labelControlRef }}
          select={!disabled}
          defaultValue={isDev ? placeholderLabelText : currentValue}
          value={isDev ? placeholderLabelText : currentValue}
          className={includeStyling()}
          size={size}
          classes={{
            root: `${classes.formControl} ${floatLabel && classes.floatLabel} ${
              (isDev || currentValue === placeholderLabelText) &&
              classes.placeholder
            }`,
          }}
          variant={variant}
          fullWidth={fullWidth}
          onChange={handleChange}
          onBlur={validationHandler}
          inputProps={{
            id: labelControlRef,
            tabIndex: isDev ? -1 : 0,
            'data-component': dataComponentAttributeValue,
          }}
          required={required}
          disabled={disabled || !valid}
          label={!valid ? message : !hideLabel && labelText}
          error={errorState}
          margin={margin}
          helperText={helper}
        >
          {allowClear && (
            <MenuItem value="" className={classes.clearLabel}>
              {clearLabelText}
            </MenuItem>
          )}
          {placeholderLabelText && !defaultValueText && (
            <MenuItem value={placeholderLabelText} disabled>
              {placeholderLabelText}
            </MenuItem>
          )}
          {valid && renderOptions()}
        </TextField>
        <input
          id={actionVariableId}
          className={classes.validationInput}
          onInvalid={validationHandler}
          type="text"
          tabIndex="-1"
          required={required}
          value={placeholderLabelText === currentValue ? '' : currentValue}
        />
      </>
    );

    return isDev ? <div className={classes.root}>{SelectCmp}</div> : SelectCmp;
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      validationInput: {
        height: 0,
        width: 0,
        fontSize: 0,
        padding: 0,
        border: 'none',
        pointerEvents: 'none',
      },
      floatLabel: {
        '& > label': {
          position: 'static !important',
          transform: 'none !important',
          marginBottom: '8px !important',
        },
        '& .MuiInputBase-root': {
          '& > fieldset': {
            '& > legend': {
              maxWidth: '0px !important',
            },
          },
        },
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
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { borderHoverColor } }) => [
                  style.getColor(borderHoverColor),
                  '!important',
                ],
              },
          },
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
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
          '& .MuiSelect-nativeInput': {
            width: '0px',
          },
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
        '& .MuiSvgIcon-root': {
          marginRight: '6px',
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
          {
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
          '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
            {
              borderColor: ({ options: { borderFocusColor } }) => [
                style.getColor(borderFocusColor),
                '!important',
              ],
            },
        },
        '& .MuiInputBase-root.Mui-error, & .MuiInputBase-root.Mui-error:hover, & .MuiInputBase-root.Mui-error.Mui-focused, & .MuiInputBase-root.Mui-error.Mui-focused:hover':
          {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
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
              '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
                {
                  borderColor: ({ options: { errorColor } }) => [
                    style.getColor(errorColor),
                    '!important',
                  ],
                },
            },
          },
      },
      clearLabel: {
        fontStyle: 'italic',
        borderBottom: '1px solid lightgray !important',
      },
      placeholder: {
        '& .MuiInputBase-root': {
          color: ({ options: { placeholderColor } }) => [
            style.getColor(placeholderColor),
            '!important',
          ],
        },
      },
    };
  },
}))();
