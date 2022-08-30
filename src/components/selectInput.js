(() => ({
  name: 'SelectInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionProperty,
      actionVariableId,
      disabled: initialIsDisabled,
      filter,
      variant,
      size,
      fullWidth,
      margin,
      order,
      orderBy,
      helperText = [''],
      label,
      labelProperty,
      required,
      hideLabel,
      validationValueMissing = [''],
      value: prefabValue,
      blanco,
      dataComponentAttribute = ['Select'],
    } = options;
    const { env, getProperty, useText, useAllQuery } = B;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [interactionFilter, setInteractionFilter] = useState({});
    const [disabled, setIsDisabled] = useState(initialIsDisabled);
    const mounted = useRef(false);
    const blancoText = useText(blanco);
    const modelProperty = getProperty(actionProperty.modelProperty) || {};
    const [currentValue, setCurrentValue] = useState(useText(prefabValue));
    const labelText = useText(label);
    const defaultValueText = useText(prefabValue);
    const helperTextResolved = useText(helperText);
    const validationMessageText = useText(validationValueMissing);
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const { referenceModelId, modelId, kind, values = [] } = modelProperty;

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
      !isDev && orderBy
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

    const { data, loading, refetch } = useAllQuery(
      referenceModelId || modelId,
      {
        filter: completeFilter,
        variables: {
          ...(orderBy ? { sort: { relation: sort } } : {}),
        },
      },
    );

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

      setCurrentValue(eventValue);
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

    const renderOptions = () => {
      if (kind === 'list' || kind === 'LIST') {
        return values.map(({ value: v }) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ));
      }

      if (!loading && !isDev) {
        let labelKey = 'id';
        if (labelProperty) {
          labelKey = B.getProperty(labelProperty).name;
        } else {
          const model = B.getModel(referenceModelId);
          if (model.labelPropertyId)
            labelKey = B.getProperty(model.labelPropertyId).name;
        }

        const rows = data ? data.results : [];
        return rows.map((row) => {
          const value = row[kind === 'belongs_to' ? 'id' : labelKey];
          const itemLabel = row[labelKey];
          return (
            <MenuItem key={row.id} value={value}>
              {itemLabel}
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
          select={!disabled}
          defaultValue={currentValue}
          value={currentValue}
          size={size}
          classes={{ root: classes.formControl }}
          variant={variant}
          fullWidth={fullWidth}
          onChange={handleChange}
          onBlur={validationHandler}
          inputProps={{
            tabIndex: isDev ? -1 : 0,
            'data-component': dataComponentAttributeValue,
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
          id={actionVariableId}
          className={classes.validationInput}
          onInvalid={validationHandler}
          type="text"
          tabIndex="-1"
          required={required}
          value={currentValue}
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
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
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
    };
  },
}))();