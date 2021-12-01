(() => ({
  name: 'AutoComplete',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const {
      Checkbox,
      Chip,
      CircularProgress,
      TextField,
    } = window.MaterialUI.Core;
    const {
      InteractionScope,
      ModelProvider,
      env,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useFilter,
      useText,
      Icon,
    } = B;
    const {
      closeOnSelect,
      customModelAttribute: customModelAttributeRaw,
      dataComponentAttribute: dataComponentAttributeRaw,
      disabled,
      errorType,
      filter: filterRaw,
      freeSolo,
      fullWidth,
      helperText: helperTextRaw,
      hideLabel,
      margin,
      multiple: multipleRaw,
      nameAttribute: nameAttributeRaw,
      optionType,
      order,
      orderBy,
      placeholder: placeholderRaw,
      property,
      model,
      renderCheckboxes,
      showError,
      searchProperty,
      size,
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

    const isDev = env === 'dev';
    const multiple = optionType === 'model' && multipleRaw;
    const displayError = errorType === 'built-in';
    const placeholder = useText(placeholderRaw);
    const helperText = useText(helperTextRaw);
    const nameAttribute = useText(nameAttributeRaw);
    const changeContext = useRef(null);
    const dataComponentAttribute =
      useText(dataComponentAttributeRaw) || 'AutoComplete';

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

    let initalValue = defaultValue.replace(/\n/g, '');

    if (multiple) {
      if (defaultValue.trim() === '') {
        initalValue = [];
      } else {
        initalValue = defaultValue
          .trim()
          .split(',')
          .map(x => x.trim());
      }
    }

    /*
     * Selected value of the autocomplete.
     *
     * It is an object or and array of objects (in case of multiple). The object being a one on one copy of the result of the request.
     * In case of freeSolo the type is string or and array of strings.
     *
     */
    const [value, setValue] = useState(initalValue);

    useEffect(() => {
      if (isDev && typeof value === 'string') {
        if (value.trim() === '') {
          setValue([]);
        } else {
          setValue(
            value
              .trim()
              .split(',')
              .map(x => x.trim()),
          );
        }
      }
    }, [multiple]);

    /*
     * User input in the autocomplete. In case of freeSolo this is the same as `value`
     */
    const [inputValue, setInputValue] = useState(
      optionType === 'property' ||
        (optionType === 'model' && freeSolo && !multiple)
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
      const isObject = item =>
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
    if (multiple && value.length > 0) {
      if (!freeSolo) {
        if (!filter._or) {
          filter._or = [];
        }

        value.forEach(x => {
          filter._or.push({
            [valueProp.name]: {
              [valuePropIsNumber ? 'eq' : 'regex']:
                typeof x === 'string' ? x : x[valueProp.name],
            },
          });
        });
      }

      if (debouncedInputValue) {
        if (!filter._or) {
          filter._or = [];
        }

        filter._or.push({
          [searchProp.name]: {
            [searchPropIsNumber ? 'eq' : 'regex']: searchPropIsNumber
              ? parseInt(debouncedInputValue, 10)
              : debouncedInputValue,
          },
        });
      } else if (!freeSolo && defaultValueEvaluatedRef.current) {
        if (!filter._or) {
          filter._or = [];
        }

        filter._or.push({
          [valueProp.name]: {
            neq:
              typeof value[0] === 'string'
                ? value[0]
                : value[0][valueProp.name],
          },
        });
      }
    } else if (multiple) {
      if (debouncedInputValue) {
        if (!filter._or) {
          filter._or = [];
        }

        filter._or.push({
          [searchProp.name]: {
            [searchPropIsNumber ? 'eq' : 'regex']: searchPropIsNumber
              ? parseInt(debouncedInputValue, 10)
              : debouncedInputValue,
          },
        });
      }
    } else if (
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
    } else if (value !== '' && !freeSolo) {
      filter._or = [
        {
          [valueProp.name]: {
            [valuePropIsNumber ? 'eq' : 'regex']:
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
          if (index === arr.length - 1) {
            return Array.isArray(eventValue)
              ? {
                  _or: eventValue.map(el => ({
                    [field]: { [propertyArg.operator]: el },
                  })),
                }
              : { [field]: { [propertyArg.operator]: eventValue } };
          }

          return { [field]: acc };
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

    const { loading, error, data: { results } = {}, refetch } = useAllQuery(
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
    if (
      !isDev &&
      !defaultValueEvaluatedRef.current &&
      !freeSolo &&
      value &&
      results
    ) {
      setValue(prev => {
        if (multiple) {
          return prev
            .map(val =>
              results.find(
                result =>
                  result[valueProp.name] ===
                  (valuePropIsNumber ? parseInt(val, 10) : val),
              ),
            )
            .filter(x => typeof x !== 'undefined');
        }

        return (
          results.find(result =>
            result[valueProp.name] === valuePropIsNumber
              ? parseInt(prev, 10)
              : prev,
          ) || ''
        );
      });

      defaultValueEvaluatedRef.current = true;
    } else if (!isDev && !defaultValueEvaluatedRef.current && freeSolo) {
      defaultValueEvaluatedRef.current = true;
    }

    B.defineFunction('Clear', () => {
      setValue(multiple ? [] : '');
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
              endAdornment: <>{!freeSolo && <Icon name="ExpandMore" />}</>,
              startAdornment: (
                <>
                  {multiple ? (
                    <>
                      <Chip label="Chip 1" onDelete={() => {}} />
                      <Chip label="Chip 2" onDelete={() => {}} />
                    </>
                  ) : null}
                </>
              ),
            }}
            classes={{ root: classes.formControl }}
            dataComponent={dataComponentAttribute}
            disabled={disabled || !valid}
            error={showError}
            fullWidth={fullWidth}
            helperText={helperText}
            label={!hideLabel && label}
            margin={margin}
            placeholder={placeholder}
            required={required && !value}
            size={size}
            value={multiple ? '' : designTimeValue}
            variant={variant}
          />
        </div>
      );
    }

    const getOptions = () => {
      if (optionType === 'property') {
        return propertyValues.map(propertyValue => propertyValue.value);
      }

      if (optionType === 'model') {
        if (!results) {
          return [];
        }

        // If freeSolo is turned on the value and options are strings instead of objects
        if (freeSolo) {
          return results.map(result => result[searchProp.name]);
        }

        if (multiple) {
          const nonFetchedOptions = [];
          value.forEach(x => {
            if (
              !results.some(result => {
                if (typeof x === 'string') {
                  return valuePropIsNumber
                    ? result[valueProp.name] === parseInt(x, 10)
                    : result[valueProp.name] === x;
                }

                return result[valueProp.name] === x[valueProp.name];
              })
            ) {
              nonFetchedOptions.push(x);
            }
          });

          return [...nonFetchedOptions, ...results];
        }

        if (
          !results.some(result => {
            if (typeof value === 'string') {
              return valuePropIsNumber
                ? result[valueProp.name] === parseInt(value, 10)
                : result[valueProp.name] === value;
            }

            return result[valueProp.name] === value[valueProp.name];
          })
        ) {
          return [value, ...results];
        }

        return results;
      }

      return [];
    };

    const currentOptions = getOptions();

    /*
     * Convert `value` state into something the `value` prop of the `Autocomplete` component will accept with the right settings
     */
    const getValue = () => {
      if (optionType === 'property') {
        return value;
      }

      // If freeSolo is turned on the value and options are strings instead of objects
      if (freeSolo) {
        return value;
      }

      if (currentOptions.length === 0) {
        return multiple ? [] : null;
      }

      if (multiple) {
        return value
          .map(x =>
            currentOptions.find(option => {
              if (typeof x === 'string') {
                return valuePropIsNumber
                  ? option[valueProp.name] === parseInt(x, 10)
                  : option[valueProp.name] === x;
              }

              return option[valueProp.name] === x[valueProp.name];
            }),
          )
          .filter(x => x !== undefined);
      }

      return currentOptions.find(option => {
        if (typeof value === 'string') {
          return valuePropIsNumber
            ? option[valueProp.name] === parseInt(value, 10)
            : option[valueProp.name] === value;
        }

        return option[valueProp.name] === value[valueProp.name];
      });
    };

    /*
     * Convert `Autocomplete` `value` into a value the hidden input accepts (a string)
     */
    const getHiddenValue = currentValue => {
      if (!currentValue) {
        return '';
      }

      if (typeof currentValue === 'string') {
        return currentValue;
      }

      if (multiple) {
        return currentValue
          .filter(x => x !== undefined)
          .map(x => (typeof x === 'string' ? x : x[valueProp.name]))
          .join(',');
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
    if (!multiple && !inputValue && currentValue) {
      setValue(currentValue);
      setInputValue(currentValue[searchProp.name].toString());
    }

    const renderLabel = option => {
      if (freeSolo) {
        return option ? option.toString() : '';
      }

      let optionLabel = '';

      if (option && option[searchProp.name]) {
        optionLabel = option[searchProp.name];
      }

      return optionLabel === '' || optionLabel === null
        ? '-- empty --'
        : optionLabel.toString();
    };

    const MuiAutocomplete = (
      <Autocomplete
        autoSelect={freeSolo}
        disableCloseOnSelect={!closeOnSelect}
        disabled={disabled}
        freeSolo={freeSolo}
        {...(optionType === 'model' && {
          getOptionLabel: renderLabel,
        })}
        inputValue={inputValue}
        loading={loading}
        multiple={multiple}
        onChange={(_, newValue) => {
          setValue(newValue || (multiple ? [] : ''));

          let triggerEventValue;

          if (optionType === 'model') {
            if (multiple) {
              setDebouncedInputValue('');

              if (freeSolo) {
                triggerEventValue = newValue || [];
              } else {
                triggerEventValue =
                  newValue.length === 0
                    ? []
                    : newValue.map(x => x[valueProp.name]);
              }
            } else if (freeSolo) {
              triggerEventValue = newValue || '';
            } else {
              triggerEventValue = newValue ? newValue[valueProp.name] : '';
            }
          } else if (optionType === 'property') {
            triggerEventValue = newValue || '';
          }

          B.triggerEvent('onChange', triggerEventValue, changeContext.current);
        }}
        onInputChange={(event, newValue) => {
          if (event && (event.type === 'change' || event.type === 'keydown')) {
            setInputValue(newValue);
          } else if (event && event.type === 'click') {
            setInputValue(newValue);
            setDebouncedInputValue(newValue);
          }
        }}
        options={currentOptions}
        renderInput={params => (
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
              error={showError}
              fullWidth={fullWidth}
              helperText={helperText}
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
    );

    if (optionType === 'model') {
      return (
        <ModelProvider value={getValue()} id={model}>
          <InteractionScope model={model}>
            {ctx => {
              changeContext.current = ctx;
              return MuiAutocomplete;
            }}
          </InteractionScope>
        </ModelProvider>
      );
    }

    return MuiAutocomplete;
  })(),
  styles: B => t => {
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
