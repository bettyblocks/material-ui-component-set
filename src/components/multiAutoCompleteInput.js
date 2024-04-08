(() => ({
  name: 'Multi Autocomplete',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const {
      Checkbox,
      Chip,
      CircularProgress,
      FormControl,
      FormHelperText,
      TextField,
    } = window.MaterialUI.Core;
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
      disabled,
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
      optionType,
      order,
      orderBy,
      pattern,
      placeholder: placeholderRaw,
      property,
      renderCheckboxes,
      required,
      showError,
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
    const numberPropTypes = ['serial', 'minutes', 'count', 'integer'];
    /*
     * To understand this component it is important to know what the following options are used for:
     *
     * customModelAttribute: To label how the data will be send to an action when a form is submitted. Also to get the default value when used in an update form.
     * freeSolo: Allows any value to be submitted from the Autocomplete. Normally only values rendered as options in the dropdown can be selected and submitted.
     * multiple: Allows multiple values to be selected. Will be send to the backend as a string with comma separated values
     * optionType: Is one of two values: `property` or `model`. When the value is `property` we're working with a list property to show a list of selectable values, otherwise we're working with a model.
     *
     */

    const isDev = env === 'dev';
    const multiple = true;
    const displayError = errorType === 'built-in';
    const placeholder = useText(placeholderRaw);
    const helperText = useText(helperTextRaw);
    const noOptionsText = useText(noOptionsTextRaw);
    const nameAttribute = useText(nameAttributeRaw);
    const [helper, setHelper] = useState(useText(helperTextRaw));
    const [errorState, setErrorState] = useState(false);
    const changeContext = useRef(null);
    const { current: labelControlRef } = useRef(generateUUID());
    const dataComponentAttribute =
      useText(dataComponentAttributeRaw) || 'AutoComplete';

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
    const { contextModelId } = model;
    const labelProperty = getProperty(labelPropertyId) || {};
    const { modelId: propertyModelId } = modelProperty;
    const modelId = contextModelId || propertyModelId || model || '';

    const propertyModel = getModel(modelId);
    const defaultLabelProperty =
      getProperty(
        propertyModel && propertyModel.labelPropertyId
          ? propertyModel.labelPropertyId
          : '',
      ) || {};
    const idProperty = getIdProperty(modelId || '') || {};
    const isListProperty =
      modelProperty.kind === 'LIST' || modelProperty.kind === 'list';

    const hasLabelProperty = !!(labelProperty && labelProperty.id);
    const hasDefaultLabelProperty = !!(
      defaultLabelProperty && defaultLabelProperty.id
    );

    const searchProperty = isListProperty
      ? modelProperty
      : (hasLabelProperty && labelProperty) ||
        (hasDefaultLabelProperty && defaultLabelProperty) ||
        idProperty;

    const valueProperty = isListProperty ? modelProperty : idProperty;
    const defaultValue = useText(valueRaw, { rawValue: true });
    const isPageVariableValue = valueRaw[0] && valueRaw[0].path;
    const getValues = () => {
      const value = defaultValue.replace(/\n/g, '');
      try {
        const parsed = JSON.parse(value);
        if (
          Array.isArray(parsed) &&
          parsed.length &&
          parsed.every((item) => typeof item === 'object' && 'id' in item)
        ) {
          return parsed.map((obj) => String(obj.id));
        }
        if (!parsed.length) {
          if (isPageVariableValue) {
            return [''];
          }
          return [];
        }
      } catch (error) {
        if (value.trim() === '') {
          if (isPageVariableValue) {
            return [''];
          }
          return [];
        }
        return value
          .trim()
          .split(',')
          .map((x) => x.trim());
      }
      return value;
    };
    const initialValue = getValues();
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

    const label = useText(labelRaw);

    /*
     * Selected value of the autocomplete.
     *
     * It is an object or and array of objects (in case of multiple). The object being a one on one copy of the result of the request.
     * In case of freeSolo the type is string or and array of strings.
     *
     */
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      if (isDev && typeof value === 'string') {
        if (value.trim() === '') {
          setValue([]);
        } else {
          setValue(
            value
              .trim()
              .split(',')
              .map((x) => x.trim()),
          );
        }
      }
    }, [multiple]);
    useEffect(() => {
      setValue(initialValue);
    }, [defaultValue]);
    /*
     * User input in the autocomplete. In case of freeSolo this is the same as `value`
     */
    const [inputValue, setInputValue] = useState('');

    /*
     * Debounced user input to only send a request every 250ms
     */
    const [debouncedInputValue, setDebouncedInputValue] = useState();
    const [debouncedCurrentValue, setDebouncedCurrentValue] = useState();

    /*
     * Keep state of interaction filters coming from other components
     */
    const [interactionFilter, setInteractionFilter] = useState({});

    const searchProp = searchProperty || {};
    const valueProp = valueProperty || {};
    const hasSearch = searchProp && searchProp.id;
    const hasValue = !!(valueProp && valueProp.id);

    let valid = true;
    let message = '';

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

    let parentIdValue;
    let valuesFilter = {};

    // check if the value option has a relation with an id key
    const relationPropertyId = valueRaw[0] && valueRaw[0].id;
    const relationProperty = relationPropertyId
      ? getProperty(relationPropertyId || '')
      : getProperty('');
    // check if the value option has a relational property
    if (relationProperty && relationProperty.inverseAssociationId) {
      const parentProperty = getIdProperty(relationProperty.modelId);
      const parentIdProperty = parentProperty ? parentProperty.id : '';
      parentIdValue = B.useProperty(parentIdProperty);

      // create a filter with the relation id and the parent id-property id
      valuesFilter = {
        _and: [
          {
            [relationProperty.inverseAssociationId]: {
              [parentIdProperty]: {
                eq: {
                  id: [parentIdProperty],
                  type: 'PROPERTY',
                },
              },
            },
          },
        ],
      };
    }
    if (relationProperty && !relationProperty.inverseAssociationId) {
      const parentProperty = getIdProperty(relationProperty.modelId);
      const parentIdProperty = parentProperty ? parentProperty.id : '';
      parentIdValue = B.useProperty(parentIdProperty);

      // create a filter with the relation id and the parent id-property id
      valuesFilter = {
        _and: [
          {
            [parentIdProperty]: {
              eq: {
                id: [parentIdProperty],
                type: 'PROPERTY',
              },
            },
          },
        ],
      };
    }

    // Adds the default values to the filter
    const defaultValuesFilterArray = initialValue.reduce((acc, next) => {
      return [...acc, { [valueProp.name]: { eq: next } }];
    }, []);

    const initialValueFilter = {
      ...(initialValue.length > 0 && { _or: defaultValuesFilterArray }),
    };

    const valueFilter = useFilter(valuesFilter);
    const optionFilter = useFilter(filterRaw || {});
    const queryWasResolvable = !!parentIdValue || initialValue.length > 0;

    useAllQuery(
      // use contextModelId when selecting a relation in the model option
      contextModelId || model,
      {
        take: 20,
        rawFilter: mergeFilters(valueFilter, initialValueFilter),
        variables: {},
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;

          if (hasResult) {
            setValue(res.results);
          }
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      /*
       * don't execute if the optionType is a property like a list-property
       * don't execute if not valid (no property, no model etc)
       * don't execute when the filter cannot use the parent id-property (queryWasResolvable)
       */
      optionType === 'property' || !valid || !queryWasResolvable,
    );

    useEffect(() => {
      let debounceInput;

      if (optionType === 'model' || optionType === 'variable') {
        if (inputValue !== debouncedInputValue) {
          debounceInput = setTimeout(() => {
            setDebouncedInputValue(inputValue);
          }, 250);
        }
      }

      return () => {
        if (optionType === 'model' || optionType === 'variable') {
          clearTimeout(debounceInput);
        }
      };
    }, [inputValue]);

    const searchPropIsNumber = numberPropTypes.includes(searchProp.kind);
    const valuePropIsNumber = numberPropTypes.includes(valueProp.kind);

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
     * We extend the option filter with the value of the `value` state and the value of the `inputValue` state.
     *
     * Those values always need to be returned in the results of the request
     */
    /* eslint-disable no-underscore-dangle */
    if (multiple) {
      if (debouncedInputValue) {
        if (!optionFilter._and) {
          optionFilter._and = [];
        }
        optionFilter._and.push({
          [searchProp.name]: {
            [searchPropIsNumber ? 'eq' : 'matches']: searchPropIsNumber
              ? parseInt(debouncedInputValue, 10)
              : debouncedInputValue,
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
            B.getProperty(field || '').kind === 'belongs_to'
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
          const orderProperty = getProperty(propertyId || '');

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
      property ? modelProperty.referenceModelId : modelId,
      {
        take: 20,
        rawFilter: mergeFilters(optionFilter, resolvedExternalFiltersObject),
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
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      !!contextModelId || optionType === 'property' || !valid,
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
      message = error;
    }

    B.defineFunction('Clear', () => {
      setValue([]);
      setInputValue('');
      setDebouncedInputValue('');
    });

    B.defineFunction('Refetch', () => refetch());

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
      if (optionType === 'property') {
        return modelProperty.values.map((propertyValue) => propertyValue.value);
      }

      if (optionType === 'model' || optionType === 'variable') {
        if (!results) {
          return [];
        }
        const nonFetchedOptions = [];
        value.forEach((optionValue) => {
          if (
            !results.some((result) => {
              if (typeof optionValue === 'string') {
                return valuePropIsNumber
                  ? result[valueProp.name] === parseInt(optionValue, 10)
                  : result[valueProp.name] === optionValue;
              }

              return result[valueProp.name] === optionValue[valueProp.name];
            })
          ) {
            if (optionValue) {
              nonFetchedOptions.push(optionValue);
            }
          }
        });

        return [...nonFetchedOptions, ...results];
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
      return value
        .map((x) =>
          currentOptions.find((option) => {
            if (typeof x === 'string') {
              return valuePropIsNumber
                ? option[valueProp.name] === parseInt(x, 10)
                : option[valueProp.name] === x;
            }

            return option[valueProp.name] === x[valueProp.name];
          }),
        )
        .filter((x) => x !== undefined);
    };

    /*
     * Convert `Autocomplete` `value` into a value the hidden input accepts (a string)
     */
    const getHiddenValue = (currentValue) => {
      if (!currentValue) {
        return '';
      }

      return currentValue
        .filter((x) => x !== undefined)
        .map((x) => (typeof x === 'string' ? x : x[valueProp.name]))
        .join(',');
    };

    /*
     * Prepare a list of options that can be passed to the `Autocomplete` `options` prop.
     *
     * The hidden input is used when `optionType` is set to `model`. Then the `valueProperty` options is used to determine what is send to the backend when a from is submitted.
     */

    const currentValue = getValue();

    useEffect(() => {
      if (
        JSON.stringify(currentValue) !== JSON.stringify(debouncedCurrentValue)
      ) {
        setTimeout(() => {
          setDebouncedCurrentValue(currentValue);
        }, 250);
      } else {
        let triggerEventValue;

        if (optionType === 'model' || optionType === 'variable') {
          setDebouncedInputValue('');
          triggerEventValue =
            value.length === 0 ? [] : value.map((x) => x[valueProp.name]);
        } else if (optionType === 'property') {
          triggerEventValue = value || '';
        }

        changeContext.current = { modelData: value };
        B.triggerEvent('onChange', triggerEventValue, changeContext.current);
      }
    }, [value]);

    const renderLabel = (option) => {
      let optionLabel = '';

      if (option && option[searchProp.name]) {
        optionLabel = option[searchProp.name];
      }

      return optionLabel === '' || optionLabel === null
        ? '-- empty --'
        : optionLabel.toString();
    };

    const MuiAutocomplete = (
      <FormControl
        classes={{
          root: `${classes.formControl} ${floatLabel && classes.floatLabel}`,
        }}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required && !value}
        error={errorState}
      >
        <Autocomplete
          id={labelControlRef}
          disableCloseOnSelect={!closeOnSelect}
          className={includeStyling()}
          disabled={disabled}
          {...((optionType === 'model' || optionType === 'variable') && {
            getOptionLabel: renderLabel,
          })}
          inputValue={inputValue}
          loading={loading}
          multiple={multiple}
          {...(group.length && {
            groupBy: (option) => getSortByGroupValue(option),
          })}
          onChange={(_, newValue) => {
            setValue(newValue || (multiple ? [] : ''));
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
              setDebouncedInputValue(newValue);
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
              {(optionType === 'model' || optionType === 'variable') && (
                <input
                  type="hidden"
                  key={value[valueProp.name] ? 'hasValue' : 'isEmpty'}
                  name={nameAttribute || name}
                  value={getHiddenValue(currentValue)}
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
                    required: required && value.length === 0,
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
                error={errorState}
                fullWidth={fullWidth}
                label={!hideLabel && label}
                margin={margin}
                {...(optionType === 'property' && {
                  name: nameAttribute || name,
                })}
                placeholder={placeholder}
                required={required}
                size={size}
                variant={variant}
              />
            </>
          )}
          {...(renderCheckboxes && {
            renderOption: (option, { selected }) => (
              <>
                <Checkbox
                  classes={{ root: classes.checkbox }}
                  icon={<Icon name="CheckBoxOutlineBlank" fontSize="small" />}
                  checkedIcon={<Icon name="CheckBox" fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {renderLabel(option)}
              </>
            ),
          })}
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
        designTimeValue = '';
      }

      return (
        <div className={classes.root}>
          <TextField
            className={includeStyling()}
            InputProps={{
              inputProps: {
                tabIndex: isDev ? -1 : undefined,
              },
              endAdornment: <Icon name="ExpandMore" />,
              ...(!designTimeValue && {
                startAdornment: (
                  <>
                    <Chip label="Chip 1" onDelete={() => {}} />
                    <Chip label="Chip 2" onDelete={() => {}} />
                  </>
                ),
              }),
            }}
            classes={{
              root: `${classes.formControl} ${
                floatLabel && classes.floatLabel
              }`,
            }}
            dataComponent={dataComponentAttribute}
            disabled={disabled || !valid}
            error={showError}
            fullWidth={fullWidth}
            helperText={helperText}
            label={!hideLabel && label}
            margin={margin}
            placeholder={placeholder}
            required={required}
            size={size}
            value={designTimeValue}
            variant={variant}
          />
        </div>
      );
    }

    if (optionType === 'model') {
      return (
        <ModelProvider value={getValue()} id={model}>
          <InteractionScope model={model}>
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
    const { Styling, color } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => color.alpha(col, val);

    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      checkbox: {
        color: ({ options: { checkboxColor } }) => [
          style.getColor(checkboxColor),
          '!important',
        ],
        '&.MuiCheckbox-root.Mui-checked:hover, &.MuiIconButton-root:hover': {
          backgroundColor: ({ options: { checkboxColor } }) => [
            getOpacColor(style.getColor(checkboxColor), 0.04),
            '!important',
          ],
        },
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
              color: ({ options: { placeHolderColor } }) => [
                style.getColor(placeHolderColor),
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
            '& .MuiSvgIcon-root': {
              color: ({ options: { backgroundColorChip, textColorChip } }) =>
                backgroundColorChip !== 'Light' && [
                  style.getColor(textColorChip),
                  '!important',
                ],
            },
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
