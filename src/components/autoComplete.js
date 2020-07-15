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
    const { useText, getProperty, getActionInput, GetAll, env } = B;
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
      label: labelText,
      fullWidth,
      size,
      type,
      required,
      error,
      placeholder: placeholderText,
      margin,
      helperText: helper,
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    useEffect(() => {
      B.defineFunction('Clear', () => setCurrentValue(null));
    }, []);

    if (isDev || !model) {
      let inputProps = {
        inputProps: {
          tabIndex: isDev && -1,
        },
        endAdornment: (
          <>
            {currentValue && <Close className={classes.icon} />}
            {!freeSolo && <ExpandMore className={classes.icon} />}
          </>
        ),
      };
      if (multiple && currentValue) {
        inputProps = {
          ...inputProps,
          startAdornment: <Chip label={currentValue} onDelete={() => {}} />,
        };
      }

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

    const actionInput = getActionInput(actionInputId);
    const searchProp = searchProperty ? getProperty(searchProperty) : null;

    const valueProp = valueProperty ? getProperty(valueProperty) : null;

    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam, setDebouncedSearchParam] = useState('');
    const debounceDelay = 1000;

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

    const { filter } = options;

    if (searchProp && debouncedSearchParam !== '') {
      filter[searchProp.id] = {
        regex: debouncedSearchParam,
      };
    } else if (searchProp && debouncedSearchParam === '') {
      delete filter[searchProp.id];
    }

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchParam(searchParam);
      }, debounceDelay);
      return () => {
        clearTimeout(handler);
      };
    }, [searchParam]);

    return (
      <GetAll modelId={model} filter={filter} skip={0} take={50}>
        {({ loading, error: errorResp, data }) => {
          if (loading) {
            B.triggerEvent('onLoad', loading);
          }

          if (errorResp && !displayError) {
            B.triggerEvent('onError', errorResp.message);
          }
          if (errorResp && displayError) {
            return <span>{errorResp.message}</span>;
          }

          let reason = 'No data';
          if (!searchProp || !valueProp) {
            reason = 'No property selected';
          }

          const { results = [] } = data || {};
          if (results.length > 0) {
            B.triggerEvent('onSuccess', results);
          } else {
            B.triggerEvent('onNoResults');
          }

          if (!data || !searchProp || !valueProp) {
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

          const renderLabel = option =>
            option[searchProp.name] && option[searchProp.name].toString();

          const renderOption = (option, { selected }) => (
            <>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {renderLabel(option)}
            </>
          );

          return (
            <Autocomplete
              multiple={multiple}
              freeSolo={freeSolo}
              options={results}
              value={getDefaultValue(results)}
              getOptionLabel={renderLabel}
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
        }}
      </GetAll>
    );
  })(),
  styles: () => () => ({
    root: {
      display: ({ options: { fullWidth } }) =>
        fullWidth ? 'block' : 'inline-block',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    icon: {
      '&.MuiSvgIcon-root': {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1.25rem',
      },
    },
  }),
}))();
