(() => ({
  name: 'AutocompleteInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const { CircularProgress, TextField, FormControl, FormHelperText } =
      window.MaterialUI.Core;
    const {
      Icon,
      InteractionScope,
      ModelProvider,
      env,
      generateUUID,
      getIdProperty,
      getModel,
      getProperty,
      useAllQuery,
      useFilter,
      useRelation,
      useText,
    } = B;
    const {
      actionVariableId: name,
      closeOnSelect,
      dataComponentAttribute: dataComponentAttributeRaw,
      disabled: initialDisabled,
      errorType,
      filter: filterRaw,
      fullWidth,
      helperText: helperTextRaw,
      hideLabel,
      label: labelRaw,
      labelProperty: labelPropertyId = '',
      margin,
      maxlength,
      minlength,
      minvalue,
      model,
      nameAttribute: nameAttributeRaw,
      noOptionsText: noOptionsTextRaw,
      groupBy,
      order,
      orderBy,
      pattern,
      placeholder: placeholderRaw,
      property,
      required: defaultRequired,
      size,
      type,
      validationBelowMinimum = [''],
      validationPatternMismatch = [''],
      validationTooLong = [''],
      validationTooShort = [''],
      validationTypeMismatch = [''],
      validationValueMissing = [''],
      value: valueRaw,
      variant,
      floatLabel,
    } = options;
    const numberPropTypes = [
      'count',
      'decimal',
      'integer',
      'minutes',
      'serial',
    ];

    /*
     * To understand this component it is important to know what the following options are used for:
     *
     * optionType: Is one of two values: `property` or `model`. When the value is `property` we're working with a list property to show a list of selectable values,
     * otherwise we're working with a model.
     *
     */
    const isDev = env === 'dev';
    const displayError = errorType === 'built-in';
    const placeholder = useText(placeholderRaw);
    const helperText = useText(helperTextRaw);
    const noOptionsText = useText(noOptionsTextRaw);
    const nameAttribute = useText(nameAttributeRaw);
    const changeContext = useRef(null);
    const [disabled, setIsDisabled] = useState(initialDisabled);
    const [helper, setHelper] = useState(useText(helperTextRaw));
    const [errorState, setErrorState] = useState(false);
    const dataComponentAttribute =
      useText(dataComponentAttributeRaw) || 'AutoComplete';

    const required = defaultRequired;
    const label = useText(labelRaw);
    const defaultValue = useText(valueRaw, { rawValue: true });
    const initalValue = defaultValue.replace(/\n/g, '');
    const [value, setValue] = useState(initalValue);
    const [debouncedInputValue, setDebouncedInputValue] = useState();
    const [debouncedCurrentValue, setDebouncedCurrentValue] = useState();
    const [interactionFilter, setInteractionFilter] = useState({});
    const defaultValueEvaluatedRef = useRef(false);
    const { current: labelControlRef } = useRef(generateUUID());

    const isNumberType = type === 'number';

    const validPattern = pattern || null;
    const validMinlength = minlength || null;
    const validMaxlength = maxlength || null;
    const validMinvalue = minvalue || null;

    const patternMismatchMessage = useText(validationPatternMismatch);
    const typeMismatchMessage = useText(validationTypeMismatch);
    const valueMissingMessage = useText(validationValueMissing);
    const tooLongMessage = useText(validationTooLong);
    const tooShortMessage = useText(validationTooShort);
    const belowMinimumMessage = useText(validationBelowMinimum);
    const helperTextResolved = useText(helperTextRaw);
    const modelProperty = getProperty(property || '') || {};
    const labelProperty = getProperty(labelPropertyId) || {};
    const { modelId: propertyModelId, referenceModelId } = modelProperty;
    const { contextModelId } = model;
    const modelId =
      contextModelId || referenceModelId || propertyModelId || model || '';
    const propertyModel = getModel(modelId);
    const defaultLabelProperty =
      getProperty(
        propertyModel && propertyModel.labelPropertyId
          ? propertyModel.labelPropertyId
          : '',
      ) || {};
    const idProperty = getIdProperty(modelId) || {};
    const isListProperty =
      modelProperty.kind === 'LIST' || modelProperty.kind === 'list';

    const [inputValue, setInputValue] = useState(
      isListProperty ? defaultValue : '',
    );

    const hasLabelProperty = !!(labelProperty && labelProperty.id);
    const hasDefaultLabelProperty = !!(
      defaultLabelProperty && defaultLabelProperty.id
    );

    const searchProperty = isListProperty
      ? modelProperty
      : (hasLabelProperty && labelProperty) ||
        (hasDefaultLabelProperty && defaultLabelProperty) ||
        idProperty;

    useEffect(() => {
      if (defaultValue) {
        defaultValueEvaluatedRef.current = false;
        setValue(initalValue);
        setInputValue('');
      } else {
        defaultValueEvaluatedRef.current = true;
        setValue('');
        setInputValue('');
        setDebouncedInputValue('');
      }
    }, [defaultValue]);

    /*
     * This component only works with relational or list properties.
     * the value of a list property is the list item itself.
     * the value of a related property is the id of the related record.
     */
    const valueProperty = isListProperty ? modelProperty : idProperty;

    const validationMessage = (validityObject) => {
      if (!validityObject) {
        return '';
      }
      if (validityObject.customError && patternMismatchMessage) {
        return patternMismatchMessage;
      }
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.typeMismatch && typeMismatchMessage) {
        return typeMismatchMessage;
      }
      if (validityObject.patternMismatch && patternMismatchMessage) {
        return patternMismatchMessage;
      }
      if (validityObject.valueMissing && valueMissingMessage) {
        return valueMissingMessage;
      }
      if (validityObject.tooLong && tooLongMessage) {
        return tooLongMessage;
      }
      if (validityObject.tooShort && tooShortMessage) {
        return tooShortMessage;
      }
      if (validityObject.rangeUnderflow && belowMinimumMessage) {
        return belowMinimumMessage;
      }
      return '';
    };

    const handleValidation = (validation) => {
      if (validation) {
        setErrorState(!validation.valid);
      }
      const message = validationMessage(validation) || helperTextResolved;
      setHelper(message);
    };

    const customPatternValidation = (target) => {
      const { value: eventValue, validity } = target;
      if (!pattern) {
        return validity;
      }
      const patternRegex = RegExp(`^${pattern}$`);
      const isValid = patternRegex.test(eventValue);
      target.setCustomValidity(isValid ? '' : 'Invalid field.');
      return {
        ...validity,
        valid: isValid,
        patternMismatch: !isValid,
      };
    };

    const searchProp = searchProperty || {};
    const valueProp = valueProperty || {};
    const hasSearch = searchProp && searchProp.id;
    const hasValue = !!(valueProp && valueProp.id);

    /*
     * Merges interaction filters with local filters
     */
    const mergeFilters = (...filters) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return filters.reduce((acc, object) => {
        Object.entries(object).forEach(([key, filterValue]) => {
          const accValue = acc[key];

          if (Array.isArray(accValue) && Array.isArray(filterValue)) {
            acc[key] = accValue.concat(filterValue);
          } else if (isObject(accValue) && isObject(filterValue)) {
            acc[key] = mergeFilters(accValue, filterValue);
          } else {
            acc[key] = filterValue;
          }
        });

        return acc;
      }, {});
    };

    /*
     * We do some validations that checks if all required options are set. We do this in one place to prevent clutter further on
     */

    let valid = true;
    let message = '';

    if (!isListProperty && !isDev) {
      if (!hasSearch && !hasValue) {
        message = 'No property selected';
        valid = false;
      }
      if (!hasValue) {
        message = 'No value property selected';
        valid = false;
      }
      if (!hasSearch) {
        message = 'No label property selected';
        valid = false;
      }
      if (!modelId) {
        message = 'No model selected';
        valid = false;
      }
    }

    useEffect(() => {
      let debounceInput;

      if (!isListProperty) {
        if (inputValue !== debouncedInputValue) {
          debounceInput = setTimeout(() => {
            setDebouncedInputValue(inputValue);
          }, 250);
        }
      }

      return () => {
        if (!isListProperty) {
          clearTimeout(debounceInput);
        }
      };
    }, [inputValue]);

    const optionFilter = useFilter(filterRaw || {});

    // We need to do this, because options.filter is not immutable
    let filter = { ...optionFilter };

    const searchPropIsNumber = numberPropTypes.includes(searchProp.kind);
    const valuePropIsNumber = numberPropTypes.includes(valueProp.kind);
    const labelPropIsNumber = numberPropTypes.includes(labelProperty.kind);

    /*
     * Build up group array for grouping options
     */
    const idOrPathGroup =
      typeof groupBy.id !== 'undefined' ? groupBy.id : groupBy;
    const groupByPath =
      typeof idOrPathGroup === 'string' ? [idOrPathGroup] : idOrPathGroup;

    let group = [];

    if (!isDev) {
      if (groupByPath.length === 1 && groupByPath[0] !== '') {
        group = [getProperty(groupByPath[0]).name];
      } else if (groupByPath.length > 1) {
        group = groupByPath.map((propertyId) => getProperty(propertyId).name);
      }
    }

    /*
     * Build up array for relational label
     */
    const idOrPathLabel =
      typeof labelPropertyId.id !== 'undefined'
        ? labelPropertyId.id
        : labelPropertyId;
    const labelPropertyPath =
      typeof idOrPathLabel === 'string' ? [idOrPathLabel] : idOrPathLabel;

    /*
     * We extend the option filter with the value of the `value` state and the value of the `inputValue` state.
     *
     * Those values always need to be returned in the results of the request
     */
    /* eslint-disable no-underscore-dangle */
    if (
      debouncedInputValue &&
      (searchPropIsNumber
        ? parseFloat(debouncedInputValue, 10)
        : debouncedInputValue) ===
        (typeof value === 'string' ? value : value[searchProp.name])
    ) {
      filter._or = [
        {
          [searchProp.name]: {
            [searchPropIsNumber ? 'eq' : 'matches']: searchPropIsNumber
              ? parseFloat(debouncedInputValue, 10)
              : debouncedInputValue,
          },
        },
        {
          [valueProp.name]: {
            neq: valuePropIsNumber
              ? parseFloat(value[valueProp.name], 10)
              : value[valueProp.name],
          },
        },
      ];
    } else if (debouncedInputValue) {
      // if a relation is selected for label option
      if (labelPropertyPath.length > 1) {
        const newFilter = {
          [labelPropIsNumber ? 'eq' : 'matches']: labelPropIsNumber
            ? parseFloat(debouncedInputValue, 10)
            : debouncedInputValue,
        };
        const resolvedUuids = labelPropertyPath.map((u) => getProperty(u).name);
        const resolvedFilter = resolvedUuids.reduceRight((acc, q) => {
          return { [q]: acc };
        }, newFilter);
        filter = { ...filter, ...resolvedFilter };
      } else {
        filter[searchProp.name] = {
          [searchPropIsNumber ? 'eq' : 'matches']: searchPropIsNumber
            ? parseFloat(debouncedInputValue, 10)
            : debouncedInputValue,
        };
      }
    } else if (value !== '') {
      filter._or = [
        {
          [valueProp.name]: {
            [valuePropIsNumber ? 'eq' : 'matches']:
              typeof value === 'string' ? value : value[valueProp.name],
          },
        },
      ];

      if (defaultValueEvaluatedRef.current) {
        filter._or.push({
          [valueProp.name]: {
            neq: typeof value === 'string' ? value : value[valueProp.name],
          },
        });
      }
    }
    /* eslint-enable no-underscore-dangle */

    /*
     * Merge external filters (from interactions) into local filters
     */
    const externalFilters = Object.values(interactionFilter)
      .filter(
        ({ value: eventValue }) =>
          (Array.isArray(eventValue) && eventValue.length > 0) || eventValue,
      )
      .map(({ property: propertyArg, value: eventValue }) =>
        propertyArg.id.reduceRight((acc, field, index, arr) => {
          if (
            Array.isArray(eventValue) &&
            B.getProperty(field).kind === 'belongs_to'
          ) {
            const [operator] = Object.keys(acc);
            return {
              [operator]: [
                ...acc[operator].map((entry) => ({ [field]: { ...entry } })),
              ],
            };
          }
          if (index === arr.length - 1) {
            return Array.isArray(eventValue)
              ? {
                  _or: eventValue.map((el) => ({
                    [field]: { [propertyArg.operator]: el },
                  })),
                }
              : { [field]: { [propertyArg.operator]: eventValue } };
          }

          return { [field]: acc }; // keep building tree
        }, {}),
      );

    const externalFiltersObject =
      externalFilters.length > 1
        ? { _and: externalFilters }
        : externalFilters[0] || {};

    const resolvedExternalFiltersObject = useFilter(externalFiltersObject);

    /*
     * Build up order object to pass to request
     */
    const idOrPath = typeof orderBy.id !== 'undefined' ? orderBy.id : orderBy;
    const orderByPath = typeof idOrPath === 'string' ? [idOrPath] : idOrPath;

    let sort;

    if (!isDev) {
      if (orderByPath.length === 1 && orderByPath[0] !== '') {
        sort = {
          field: getProperty(orderByPath[0]).name,
          order: order.toUpperCase(),
        };
      } else if (orderByPath.length > 1) {
        sort = orderByPath.reduceRight((acc, propertyId, index) => {
          const orderProperty = getProperty(propertyId);

          return index === orderByPath.length - 1
            ? { [orderProperty.name]: order.toUpperCase() }
            : { relation: { [orderProperty.name]: acc } };
        }, {});
      }
    }

    const {
      loading: queryLoading,
      error,
      data: queryData,
      refetch,
    } = useAllQuery(
      modelId,
      {
        take: 20,
        rawFilter: mergeFilters(filter, resolvedExternalFiltersObject),
        variables: {
          sort,
        },
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }

          B.triggerEvent('onDone');
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      !!contextModelId || isListProperty || !valid,
    );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );

    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    const { results } = data || {};

    if (error && displayError) {
      valid = false;
      message = 'Something went wrong while loading.';
    }

    // If the default value is a value that lives outside the take range of the query we should fetch the values before we continue.
    if (!isDev && !defaultValueEvaluatedRef.current && value && results) {
      setValue((prev) => {
        return (
          results.find(
            (result) =>
              result[valueProp.name] &&
              prev[valueProp.name] === result[valueProp.name],
          ) || ''
        );
      });

      defaultValueEvaluatedRef.current = true;
    }

    B.defineFunction('Clear', () => {
      setValue('');
      setInputValue('');
      setDebouncedInputValue('');
    });

    B.defineFunction('Reset', () => setValue(initalValue));

    B.defineFunction('Refetch', () => refetch());

    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));

    /**
     * @name Filter
     * @param {Property} property
     * @returns {Void}
     */
    B.defineFunction(
      'Filter',
      ({ event, property: propertyArg, interactionId }) => {
        let eventValue;

        if (event.target) {
          eventValue = event.target.value;
        } else if (event instanceof Date) {
          eventValue = value.toISOString();
        } else {
          eventValue = event;
        }

        setInteractionFilter({
          ...interactionFilter,
          [interactionId]: {
            property: propertyArg,
            value: eventValue,
          },
        });
      },
    );

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
    });

    const getOptions = () => {
      if (isListProperty) {
        return modelProperty.values.map((propertyValue) => propertyValue.value);
      }

      if (!isListProperty) {
        if (!results) {
          return [];
        }

        if (
          !results.some((result) => {
            if (typeof value === 'string') {
              return valuePropIsNumber
                ? result[valueProp.name] === parseFloat(value, 10)
                : result[valueProp.name] === value;
            }

            return result[valueProp.name] === value[valueProp.name];
          })
        ) {
          return value !== '' ? [value, ...results] : [...results];
        }

        return results;
      }

      return [];
    };

    const getSortByGroupValue = (obj) =>
      [obj]
        .concat(group)
        .reduce((a, b) => (a && a[b]) || '')
        .toString();

    const currentOptions = getOptions();
    const currentOptionsGrouped =
      group.length &&
      currentOptions.sort(
        (a, b) => -getSortByGroupValue(b).localeCompare(getSortByGroupValue(a)),
      );

    /*
     * Convert `value` state into something the `value` prop of the `Autocomplete` component will accept with the right settings
     */
    const getValue = () => {
      if (isListProperty) {
        return value;
      }

      if (currentOptions.length === 0) {
        return null;
      }

      return (
        currentOptions.find((option) => {
          if (typeof value === 'string') {
            return valuePropIsNumber
              ? option[valueProp.name] === parseFloat(value, 10)
              : option[valueProp.name] === value;
          }

          return option[valueProp.name] === value[valueProp.name];
        }) || null
      );
    };

    /*
     * Convert `Autocomplete` `value` into a value the hidden input accepts (a string)
     */
    const getHiddenValue = (currentValue) => {
      if (!currentValue) {
        return '';
      }

      if (typeof currentValue === 'string') {
        return currentValue;
      }

      return currentValue[valueProp.name];
    };

    /*
     * Prepare a list of options that can be passed to the `Autocomplete` `options` prop.
     *
     * The hidden input is used when `optionType` is set to `model`. Then the `valueProperty` options is used to determine what is send to the backend when a from is submitted.
     */

    const currentValue = getValue();

    useEffect(() => {
      if (currentValue !== debouncedCurrentValue) {
        setTimeout(() => {
          setDebouncedCurrentValue(currentValue);
        }, 250);
      } else {
        let triggerEventValue = '';

        if (value) {
          triggerEventValue = !isListProperty ? value[valueProp.name] : value;
        }
        changeContext.current = { modelData: value };
        B.triggerEvent('onChange', triggerEventValue, changeContext.current);
      }
    }, [currentValue]);

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

    // In the first render we want to make sure to convert the default value
    if (!inputValue && currentValue) {
      setValue(currentValue);
      if (isListProperty) {
        setInputValue(currentValue);
      } else {
        const newLabel = renderLabel(currentValue);
        setInputValue(newLabel);
      }
    }

    const MuiAutocomplete = (
      <FormControl
        classes={{
          root: `${classes.formControl} ${floatLabel && classes.floatLabel}`,
        }}
        className={includeStyling()}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required && !value}
        error={errorState}
      >
        <Autocomplete
          id={labelControlRef}
          disableCloseOnSelect={!closeOnSelect}
          disabled={disabled}
          {...(!isListProperty && {
            getOptionLabel: renderLabel,
          })}
          inputValue={inputValue}
          loading={loading}
          {...(group.length && {
            groupBy: (option) => getSortByGroupValue(option),
          })}
          onChange={(_, newValue) => {
            setValue(newValue || '');
            setDebouncedCurrentValue(newValue);
          }}
          onInputChange={(event, newValue) => {
            let validation = event ? event.target.validity : null;
            if (isNumberType) {
              validation = customPatternValidation(event.target);
            }
            handleValidation(validation);
            if (
              event &&
              (event.type === 'change' || event.type === 'keydown')
            ) {
              setInputValue(newValue);
            } else if (event && event.type === 'click') {
              setInputValue(newValue);
              setDebouncedInputValue(newValue);
            }
          }}
          onBlur={(event) => {
            let validation = event.target.validity;
            if (isNumberType) {
              validation = customPatternValidation(event.target);
            }
            handleValidation(validation);
            setInputValue('');
          }}
          options={currentOptionsGrouped || currentOptions}
          noOptionsText={noOptionsText}
          renderInput={(params) => (
            <>
              {!isListProperty && (
                <input
                  type="hidden"
                  key={value[valueProp.name] ? 'hasValue' : 'isEmpty'}
                  name={nameAttribute || name}
                  value={getHiddenValue(debouncedCurrentValue)}
                />
              )}
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  inputProps: {
                    ...params.inputProps,
                    onInvalid: (e) => {
                      e.preventDefault();
                      handleValidation(e.target.validity);
                    },
                    pattern: validPattern,
                    minLength: validMinlength,
                    maxLength: validMaxlength,
                    min: validMinvalue,
                  },
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                classes={{
                  root: `${classes.formControl} ${
                    floatLabel && classes.floatLabel
                  }`,
                }}
                data-component={dataComponentAttribute}
                disabled={disabled}
                fullWidth={fullWidth}
                error={errorState}
                label={!hideLabel && label}
                margin={margin}
                {...(isListProperty && {
                  name: nameAttribute || name,
                })}
                placeholder={placeholder}
                required={required && !value}
                size={size}
                variant={variant}
              />
            </>
          )}
          value={currentValue}
        />
        {helper && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );

    /*
     * Show a TextField in design time
     */
    if (isDev || !valid) {
      let designTimeValue;

      if (!valid) {
        designTimeValue = message;
      }

      if (isDev) {
        designTimeValue = defaultValue;
      }

      return (
        <div className={includeStyling(classes.root)}>
          <TextField
            InputProps={{
              inputProps: {
                tabIndex: isDev ? -1 : undefined,
              },
              endAdornment: <Icon name="ExpandMore" />,
            }}
            classes={{
              root: `${classes.formControl} ${
                floatLabel && classes.floatLabel
              }`,
            }}
            dataComponent={dataComponentAttribute}
            disabled={disabled || !valid}
            error={errorState}
            fullWidth={fullWidth}
            helperText={helperText}
            label={!hideLabel && label}
            margin={margin}
            placeholder={placeholder}
            required={required && !value}
            size={size}
            value={designTimeValue}
            variant={variant}
          />
        </div>
      );
    }

    if (!isListProperty) {
      return (
        <ModelProvider value={getValue()} id={modelId}>
          <InteractionScope model={modelId}>
            {(ctx) => {
              changeContext.current = ctx;
              return MuiAutocomplete;
            }}
          </InteractionScope>
        </ModelProvider>
      );
    }

    return MuiAutocomplete;
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
          '& input': {
            '&::placeholder': {
              color: ({ options: { placeholderColor } }) => [
                style.getColor(placeholderColor),
                '!important',
              ],
            },
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
          '& .MuiChip-root': {
            color: ({ options: { textColorChip } }) => [
              style.getColor(textColorChip),
              '!important',
            ],
            backgroundColor: ({ options: { backgroundColorChip } }) => [
              style.getColor(backgroundColorChip),
              '!important',
            ],
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
