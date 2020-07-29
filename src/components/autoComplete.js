(() => ({
  name: 'AutoComplete',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      defaultValue,
      required,
      disabled,
      error,
      placeholder,
      variant,
      type,
      size,
      fullWidth,
      margin,
      helperText,
      actionInputId,
      model,
      multiple,
      freeSolo,
      searchProperty,
      valueProperty,
      property,
      propertyLabelOverride,
      closeOnSelect,
      renderCheckboxes,
      showError,
      hideLabel,
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
    const { useText, getProperty, getActionInput, useGetAll, env } = B;
    const isDev = env === 'dev';
    const displayError = showError === 'built-in';
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const placeholderText = useText(placeholder);
    const helper = useText(helperText);

    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

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
    };

    const actionInput = getActionInput(actionInputId);
    const searchProp = getProperty(searchProperty) || {};
    const valueProp = getProperty(valueProperty) || {};
    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam, setDebouncedSearchParam] = useState('');

    const { filter } = options;
    const hasSearch = searchProp && searchProp.id;
    const hasValue = valueProp && valueProp.id;

    if (hasSearch && debouncedSearchParam !== '') {
      filter[searchProp.id] = {
        regex: debouncedSearchParam,
      };
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

    const { loading, error: err, data, refetch } =
      model && useGetAll(model, { filter, skip: 0, take: 50 });

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    useEffect(() => {
      B.defineFunction('Clear', () => setCurrentValue(null));
    }, []);

    useEffect(() => {
      B.defineFunction('Refetch', () => refetch());
    }, [refetch]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchParam(searchParam);
      }, 1000);
      return () => {
        clearTimeout(handler);
      };
    }, [searchParam]);

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

    const onChange = (_, newValue) => {
      if (!valueProp || !newValue) {
        setCurrentValue(newValue);
        B.triggerEvent('OnChange');
        return;
      }
      let newCurrentValue = newValue[valueProp.name];
      if (multiple) {
        newCurrentValue = newValue.map(rec => rec[valueProp.name]);
      }
      setCurrentValue(newCurrentValue);
      B.triggerEvent('OnChange');
    };

    const getDefaultValue = records => {
      if (!currentValue) {
        return multiple ? [] : null;
      }
      let currentRecordsKeys = currentValue;
      if (!Array.isArray(currentValue)) {
        currentRecordsKeys = multiple
          ? currentValue.toString().split(',')
          : [currentValue];
      }
      const currentRecords = records.reduce((acc, cv) => {
        const searchStr = cv[valueProp.name].toString();
        const search = cv[valueProp.name];
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
    };

    const renderLabel = option =>
      option[searchProp.name] && option[searchProp.name].toString();

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

    if (isDev || !model) {
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
    if (!data || hasNoProp) {
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

    return (
      <Autocomplete
        multiple={multiple}
        freeSolo={freeSolo}
        options={results}
        value={getDefaultValue(results)}
        getOptionLabel={renderLabel}
        PopoverProps={{
          classes: {
            root: classes.popover,
          },
        }}
        onInputChange={(_, inputValue) => {
          if (!freeSolo) {
            return;
          }
          setSearchParam(inputValue);
        }}
        onChange={onChange}
        disableCloseOnSelect={!closeOnSelect}
        renderOption={renderCheckboxes && renderOption}
        renderInput={params => (
          <>
            <input
              type="hidden"
              key={currentValue ? 'hasValue' : 'isEmpty'}
              name={actionInput && actionInput.name}
              value={currentValue}
            />
            <TextField
              {...params}
              {...textFieldProps}
              required={
                required && (!currentValue || currentValue.length === 0)
              }
              loading={loading}
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
