(() => ({
  name: 'SearchInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const { CircularProgress, TextField, FormControl, FormHelperText } =
      window.MaterialUI.Core;
    const {
      InteractionScope,
      ModelProvider,
      env,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useFilter,
      useText,
    } = B;
    const {
      closeOnSelect,
      customModelAttribute: customModelAttributeRaw,
      dataComponentAttribute: dataComponentAttributeRaw,
      disabled,
      errorType,
      filter: filterRaw,
      fullWidth,
      helperText: helperTextRaw,
      hideLabel,
      margin,
      maxlength,
      type,
      minlength,
      minvalue,
      maxvalue,
      model,
      nameAttribute: nameAttributeRaw,
      optionType,
      order,
      orderBy,
      pattern,
      placeholder: placeholderRaw,
      property,
      searchProperty,
      showError,
      size,
      validationAboveMaximum = [''],
      validationBelowMinimum = [''],
      validationPatternMismatch = [''],
      validationTooLong = [''],
      validationTooShort = [''],
      validationTypeMismatch = [''],
      validationValueMissing = [''],
      valueProperty,
      variant,
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

    const freeSolo = true;
    const isDev = env === 'dev';
    const displayError = errorType === 'built-in';
    const placeholder = useText(placeholderRaw);
    const [helper, setHelper] = useState(useText(helperTextRaw));
    const nameAttribute = useText(nameAttributeRaw);
    const changeContext = useRef(null);
    const dataComponentAttribute =
      useText(dataComponentAttributeRaw) || 'AutoComplete';
    const [errorState, setErrorState] = useState(showError);
    const isNumberType = type === 'number';

    const validPattern = pattern || null;
    const validMinlength = minlength || null;
    const validMaxlength = maxlength || null;
    const validMinvalue = minvalue || null;
    const validMaxvalue = maxvalue || null;

    const patternMismatchMessage = useText(validationPatternMismatch);
    const typeMismatchMessage = useText(validationTypeMismatch);
    const valueMissingMessage = useText(validationValueMissing);
    const tooLongMessage = useText(validationTooLong);
    const tooShortMessage = useText(validationTooShort);
    const belowMinimumMessage = useText(validationBelowMinimum);
    const aboveMaximumMessage = useText(validationAboveMaximum);
    const helperTextResolved = useText(helperTextRaw);

    const validationMessage = (validityObject) => {
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
      if (validityObject.rangeOverflow && aboveMaximumMessage) {
        return aboveMaximumMessage;
      }
      return '';
    };

    const handleValidation = (validation) => {
      setErrorState(!validation.valid);
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

    const {
      id,
      label: labelRaw = [],
      value: valueRaw = [],
      required: defaultRequired = false,
    } = customModelAttributeRaw;
    const {
      name,
      validations: { required: customAttributeRequired = false } = {},
    } = getCustomModelAttribute(id) || {};

    const required = customAttributeRequired || defaultRequired;

    const label = useText(labelRaw);
    const defaultValue = useText(valueRaw, { rawValue: true });

    const initalValue = defaultValue.replace(/\n/g, '');

    /*
     * Selected value of the autocomplete.
     *
     * It is an object or and array of objects (in case of multiple). The object being a one on one copy of the result of the request.
     * In case of freeSolo the type is string or and array of strings.
     *
     */
    const [value, setValue] = useState(initalValue);

    /*
     * User input in the autocomplete. In case of freeSolo this is the same as `value`
     */
    const [inputValue, setInputValue] = useState(
      optionType === 'property' || (optionType === 'model' && freeSolo)
        ? defaultValue
        : '',
    );

    /*
     * Debounced user input to only send a request every 250ms
     */
    const [debouncedInputValue, setDebouncedInputValue] = useState();

    /*
     * Keep state of interaction filters coming from other components
     */
    const [interactionFilter, setInteractionFilter] = useState({});

    const defaultValueEvaluatedRef = useRef(false);

    const { kind: propertyKind = '', values: propertyValues } =
      getProperty(property) || {};
    const isListProperty = propertyKind.toLowerCase() === 'list';

    const searchProp = getProperty(searchProperty) || {};
    const valueProp = getProperty(valueProperty) || {};
    const hasSearch = searchProp && searchProp.id;
    const hasValue = valueProp && valueProp.id;

    let valid = false;
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
    switch (optionType) {
      case 'model': {
        if (!model) {
          message = 'No model selected';
          break;
        }
        if (!hasSearch && !hasValue) {
          message = 'No property selected';
          break;
        }
        if (!hasValue) {
          message = 'No value propery selected';
          break;
        }
        if (!hasSearch) {
          message = 'No label property selected';
          break;
        }

        valid = true;
        break;
      }
      case 'property': {
        if (!propertyKind) {
          message = 'No property selected';
          break;
        }

        if (!isListProperty) {
          message = 'No property of type "List" selected';
          break;
        }

        valid = true;
        break;
      }
      default: {
        message = 'Invalid value for optionType option';
        break;
      }
    }

    useEffect(() => {
      let debounceInput;

      if (optionType === 'model') {
        if (inputValue !== debouncedInputValue) {
          debounceInput = setTimeout(() => {
            setDebouncedInputValue(inputValue);
          }, 250);
        }
      }

      return () => {
        if (optionType === 'model') {
          clearTimeout(debounceInput);
        }
      };
    }, [inputValue]);

    const optionFilter = useFilter(filterRaw || {});

    // We need to do this, because options.filter is not immutable
    const filter = { ...optionFilter };

    const searchPropIsNumber = numberPropTypes.includes(searchProp.kind);
    const valuePropIsNumber = numberPropTypes.includes(valueProp.kind);

    /*
     * We extend the option filter with the value of the `value` state and the value of the `inputValue` state.
     *
     * Those values always need to be returned in the results of the request
     */
    /* eslint-disable no-underscore-dangle */
    if (
      debouncedInputValue &&
      (searchPropIsNumber
        ? parseInt(debouncedInputValue, 10)
        : debouncedInputValue) ===
        (typeof value === 'string' ? value : value[searchProp.name]) &&
      !freeSolo
    ) {
      filter._or = [
        {
          [searchProp.name]: {
            [searchPropIsNumber ? 'eq' : 'regex']: searchPropIsNumber
              ? parseInt(debouncedInputValue, 10)
              : debouncedInputValue,
          },
        },
        {
          [valueProp.name]: {
            neq: valuePropIsNumber
              ? parseInt(value[valueProp.name], 10)
              : value[valueProp.name],
          },
        },
      ];
    } else if (debouncedInputValue) {
      filter[searchProp.name] = {
        [searchPropIsNumber ? 'eq' : 'regex']: searchPropIsNumber
          ? parseInt(debouncedInputValue, 10)
          : debouncedInputValue,
      };
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
      loading,
      error,
      data: { results } = {},
      refetch,
    } = useAllQuery(
      model,
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
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      optionType === 'property' || !valid,
    );

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    if (error && displayError) {
      valid = false;
      message = 'Something went wrong while loading.';
    }

    // If the default value is a value that lives outside the take range of the query we should fetch the values before we continue.
    if (!isDev && !defaultValueEvaluatedRef.current && freeSolo) {
      defaultValueEvaluatedRef.current = true;
    }

    B.defineFunction('Clear', () => {
      setValue('');
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
        <div className={classes.root}>
          <TextField
            InputProps={{
              inputProps: {
                tabIndex: isDev ? -1 : undefined,
              },
            }}
            dataComponent={dataComponentAttribute}
            disabled={disabled || !valid}
            error={errorState}
            fullWidth={fullWidth}
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

    const getOptions = () => {
      if (optionType === 'property') {
        return propertyValues.map((propertyValue) => propertyValue.value);
      }

      if (optionType === 'model') {
        if (!results) {
          return [];
        }
        return results.map((result) => result[searchProp.name]);
      }

      return [];
    };

    const currentOptions = getOptions();

    /*
     * Convert `value` state into something the `value` prop of the `Autocomplete` component will accept with the right settings
     */
    const getValue = () => {
      return value;
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

    // In the first render we want to make sure to convert the default value
    if (!inputValue && currentValue) {
      setValue(currentValue);
      setInputValue(currentValue[searchProp.name].toString());
    }

    const renderLabel = (option) => {
      return option ? option.toString() : '';
    };

    const MuiAutocomplete = (
      <FormControl
        classes={{ root: classes.formControl }}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        margin={margin}
        error={errorState}
      >
        <Autocomplete
          disableCloseOnSelect={!closeOnSelect}
          disabled={disabled}
          freeSolo={freeSolo}
          {...(optionType === 'model' && {
            getOptionLabel: renderLabel,
          })}
          inputValue={inputValue}
          loading={loading}
          onChange={(_, newValue) => {
            setValue(newValue || '');

            let triggerEventValue;

            if (optionType === 'model') {
              triggerEventValue = newValue || '';
            } else if (optionType === 'property') {
              triggerEventValue = newValue || '';
            }

            B.triggerEvent(
              'onChange',
              triggerEventValue,
              changeContext.current,
            );
          }}
          onInputChange={(event, newValue) => {
            if (
              event &&
              (event.type === 'change' || event.type === 'keydown')
            ) {
              setInputValue(newValue);
            } else if (event && event.type === 'click') {
              setInputValue(newValue);
              setDebouncedInputValue(newValue);
            }
            let validation = event.target.validity;

            if (isNumberType) {
              validation = customPatternValidation(event.target);
            }
            handleValidation(validation);
          }}
          options={currentOptions}
          renderInput={(params) => (
            <>
              {optionType === 'model' && (
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
                    pattern: validPattern,
                    minLength: validMinlength,
                    maxLength: validMaxlength,
                    min: validMinvalue,
                    max: validMaxvalue,
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
                classes={{ root: classes.formControl }}
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
