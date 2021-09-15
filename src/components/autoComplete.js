(() => ({
  name: 'AutoComplete',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      disabled,
      error,
      placeholder,
      variant,
      type,
      size,
      fullWidth,
      margin,
      helperText,
      model,
      multiple,
      freeSolo,
      searchProperty,
      valueProperty,
      closeOnSelect,
      renderCheckboxes,
      showError,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      property,
      nameAttribute,
      order,
      orderBy,
      dataComponentAttribute,
    } = options;
    const { Autocomplete } = window.MaterialUI.Lab;
    const {
      TextField,
      CircularProgress,
      Chip,
      Checkbox,
    } = window.MaterialUI.Core;
    const {
      ExpandMore,
      Close,
      CheckBox,
      CheckBoxOutlineBlank,
    } = window.MaterialUI.Icons;
    const {
      env,
      ModelProvider,
      InteractionScope,
      getCustomModelAttribute,
      getProperty,
      useAllQuery,
      useText,
    } = B;
    const isDev = env === 'dev';
    const displayError = showError === 'built-in';
    const placeholderText = useText(placeholder);
    const helper = useText(helperText);
    const nameAttributeValue = useText(nameAttribute);

    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
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
    const { kind, values: listValues } = getProperty(property) || {};
    const [currentValue, setCurrentValue] = useState(
      useText(defaultValue, { rawValue: true }),
    );
    const [currentLabel, setCurrentLabel] = useState('');
    const changeContext = useRef(null);
    const mounted = useRef(false);
    const labelText = useText(label);

    const textFieldProps = {
      disabled,
      variant,
      label: !hideLabel && labelText,
      fullWidth,
      size,
      type,
      required,
      error,
      placeholder: placeholderText,
      margin,
      helperText: helper,
      classes: { root: classes.formControl },
      'data-component': useText(dataComponentAttribute) || 'AutoComplete',
    };

    const searchProp = getProperty(searchProperty) || {};
    const valueProp = getProperty(valueProperty) || {};
    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam, setDebouncedSearchParam] = useState('');
    const [interactionFilter, setInteractionFilter] = useState({});

    const deepMerge = (...objects) => {
      const isObject = item =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach(key => {
          const accumulatorValue = accumulator[key];
          const value = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
            accumulator[key] = accumulatorValue.concat(value);
          } else if (isObject(accumulatorValue) && isObject(value)) {
            accumulator[key] = deepMerge(accumulatorValue, value);
          } else {
            accumulator[key] = value;
          }
        });
        return accumulator;
      }, {});
    };

    const transformValue = value => {
      if (value instanceof Date) {
        return value.toISOString();
      }

      return value;
    };

    const filter = { ...options.filter };
    const hasSearch = searchProp && searchProp.id;
    const hasValue = valueProp && valueProp.id;

    if (hasSearch && debouncedSearchParam !== '') {
      if (['serial', 'minutes', 'count', 'integer'].includes(searchProp.kind)) {
        filter[searchProp.id] = {
          eq: parseInt(debouncedSearchParam, 10),
        };
      } else {
        filter[searchProp.id] = {
          regex: debouncedSearchParam,
        };
      }
    } else if (hasSearch && debouncedSearchParam === '') {
      delete filter[searchProp.id];
    }

    const hasNoProp = !hasSearch || !hasValue;
    const reason = hasNoProp ? 'No property selected' : 'No data';

    let inputProps = {
      inputProps: {
        tabIndex: isDev && -1,
      },
      endAdornment: (
        <>
          {currentValue && <Close />}
          {!freeSolo && <ExpandMore />}
        </>
      ),
    };

    if (multiple && currentValue) {
      inputProps = {
        ...inputProps,
        startAdornment: <Chip label={currentValue} onDelete={() => {}} />,
      };
    }

    const valueArray = currentValue ? currentValue.toString().split(',') : [];

    const rawFilter = {
      rawFilter: {
        [valueProp.name]: { in: valueArray },
      },
    };

    const [useFilter, setUseFilter] = useState(
      currentValue ? rawFilter : filter,
    );

    const resetFilter = () => {
      setUseFilter({ filter });
    };

    let interactionFilters = {};

    const isEmptyValue = value =>
      (typeof value !== 'boolean' && !value) ||
      (Array.isArray(value) && value.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value }]) => !isEmptyValue(value))
      .map(([, { property: propertyArg, value }]) =>
        propertyArg.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(value)
              ? {
                  _or: value.map(el => ({
                    [field]: { [propertyArg.operator]: el },
                  })),
                }
              : { [field]: { [propertyArg.operator]: value } };
          }

          return { [field]: acc };
        }, {}),
      );

    interactionFilters =
      clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

    const completeFilter = deepMerge(
      useFilter.filter || {},
      interactionFilters,
    );

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

    const {
      loading,
      error: err,
      data: { results } = {},
      refetch,
    } = useAllQuery(
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
        B.triggerEvent('onChange', currentValue, changeContext.current);
      }
    }, [currentValue]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useEffect(() => {
      if (!isDev && results) {
        resetFilter();
      }
    }, [results]);

    useEffect(() => {
      if (mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
    }, [loading]);

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    B.defineFunction('Clear', () => {
      setCurrentValue(multiple ? [] : null);
      setSearchParam('');
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

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchParam(searchParam);
      }, 1000);
      return () => {
        clearTimeout(handler);
      };
    }, [searchParam]);

    const onChange = (_, newValue) => {
      if (!valueProp || !newValue) {
        setCurrentValue(newValue || '');
        setCurrentLabel(newValue || '');
        return;
      }

      const isPropDefined = newValue[valueProp.name] !== undefined;
      const propValue = isPropDefined ? newValue[valueProp.name] || '' : '';
      let newCurrentValue = isPropDefined ? propValue : newValue;
      if (typeof newValue === 'string') {
        if (currentLabel === newValue) {
          newCurrentValue = currentValue;
        }
      } else if (searchProp) {
        const newLabelValue = newValue[searchProp.name];
        setCurrentLabel(newLabelValue || '');
      }

      if (multiple) {
        newCurrentValue = newValue.map(rec => rec[valueProp.name] || rec);
      }
      setCurrentValue(newCurrentValue);
    };

    const record = React.useMemo(() => {
      if (!currentValue || !results) {
        return multiple ? [] : null;
      }
      let currentRecordsKeys = currentValue;
      if (!Array.isArray(currentValue)) {
        currentRecordsKeys = multiple
          ? currentValue.toString().split(',')
          : [currentValue];
      }
      const currentRecords = results.reduce((acc, cv) => {
        const searchStr = cv[valueProp.name]
          ? cv[valueProp.name].toString()
          : '';
        const search = cv[valueProp.name] || '';
        if (
          currentRecordsKeys.indexOf(searchStr) > -1 ||
          currentRecordsKeys.indexOf(search) > -1
        ) {
          acc.push(cv);
        }
        return acc;
      }, []);

      const singleRecord = currentRecords[0] ? { ...currentRecords[0] } : null;

      return multiple ? currentRecords : singleRecord;
    }, [currentValue, results]);

    useEffect(() => {
      if (!multiple) {
        setCurrentLabel(
          (record && searchProp && record[searchProp.name]) || '',
        );
      }
    }, [record]);

    const renderLabel = option => {
      const optionLabel = option[searchProp.name];
      const isEmptyLabel =
        optionLabel !== undefined &&
        (optionLabel === '' || optionLabel === null);
      return isEmptyLabel
        ? '-- empty --'
        : (optionLabel && optionLabel.toString()) || option;
    };

    const renderOption = (option, { selected }) => (
      <>
        <Checkbox
          classes={{ root: classes.checkbox }}
          icon={<CheckBoxOutlineBlank fontSize="small" />}
          checkedIcon={<CheckBox fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {renderLabel(option)}
      </>
    );

    if (isDev) {
      return (
        <div className={classes.root}>
          <TextField
            {...textFieldProps}
            value={multiple ? '' : currentValue}
            InputProps={inputProps}
          />
        </div>
      );
    }

    if (kind === 'list' || kind === 'LIST') {
      const onPropertyListChange = (_, newValue) => {
        setCurrentValue(newValue);
      };

      const selectValues =
        listValues
          .map(({ value }) => value)
          .filter(e => e.startsWith(searchParam)) || [];

      return (
        <Autocomplete
          id="combo-box-demo"
          disabled={disabled}
          options={selectValues}
          value={currentValue}
          onInputChange={(_, inputValue) => {
            setSearchParam(inputValue);
          }}
          onChange={(event, value) => {
            onPropertyListChange(event, value);
          }}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField
              {...params}
              {...textFieldProps}
              name={nameAttributeValue || customModelAttributeName}
              key={currentValue ? 'hasValue' : 'isEmpty'}
              required={required && !currentValue}
              InputProps={{
                ...params.InputProps,
                endAdornment: params.InputProps.endAdornment,
              }}
            />
          )}
        />
      );
    }

    if (!model) {
      return (
        <div className={classes.root}>
          <TextField
            {...textFieldProps}
            value={multiple ? '' : currentValue}
            InputProps={inputProps}
          />
        </div>
      );
    }

    if (err && displayError) return <span>{err.message}</span>;
    if (!results || hasNoProp) {
      return (
        <TextField
          {...textFieldProps}
          defaultValue={reason}
          disabled
          InputProps={{
            endAdornment: <CircularProgress color="inherit" size={20} />,
          }}
        />
      );
    }

    let currentInputValue = searchParam;
    if (!searchParam && record) {
      currentInputValue = currentLabel;
    }
    if (!currentInputValue) {
      currentInputValue = '';
    }

    return (
      <ModelProvider value={record} id={model}>
        <InteractionScope model={model}>
          {ctx => {
            changeContext.current = ctx;

            return (
              <Autocomplete
                disabled={disabled}
                multiple={multiple}
                freeSolo={freeSolo}
                options={results}
                value={record}
                inputValue={currentInputValue}
                getOptionLabel={renderLabel}
                getOptionSelected={(option, value) => value.id === option.id}
                onInputChange={(event, inputValue) => {
                  if (event) setSearchParam(inputValue);
                }}
                onChange={(event, value) => {
                  onChange(event, value);
                }}
                disableCloseOnSelect={!closeOnSelect}
                renderOption={renderCheckboxes && renderOption}
                renderInput={params => (
                  <>
                    <input
                      type="hidden"
                      key={currentValue ? 'hasValue' : 'isEmpty'}
                      name={nameAttributeValue || customModelAttributeName}
                      value={currentValue}
                    />
                    <TextField
                      {...params}
                      {...textFieldProps}
                      required={
                        required && (!currentValue || currentValue.length === 0)
                      }
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
                    />
                  </>
                )}
              />
            );
          }}
        </InteractionScope>
      </ModelProvider>
    );
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
