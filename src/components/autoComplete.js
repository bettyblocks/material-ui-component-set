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
    } = options;
    const isDev = B.env === 'dev';
    const { Autocomplete } = window.MaterialUI.Lab;
    const { TextField, CircularProgress, Chip } = window.MaterialUI.Core;
    const { ExpandMore, Close } = window.MaterialUI.Icons;
    const { useText, getProperty, getActionInput, GetAll } = B;
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));
    const placeholderText = isDev
      ? placeholder.join(' ')
      : useText(placeholder);
    const helper = isDev
      ? helperText.map(h => (h.name ? h.name : h)).join(' ')
      : useText(helperText);

    const propLabel =
      property && getProperty(property) && getProperty(property).label;
    const propLabelOverride = isDev
      ? propertyLabelOverride.map(l => (l.name ? l.name : l)).join(' ')
      : useText(propertyLabelOverride);
    const propertyLabelText = isDev ? '{{ property label }}' : propLabel;
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : label;

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

    if (isDev || !model) {
      const textValue = defaultValue
        .map(textitem => (textitem.name ? textitem.name : textitem))
        .join(' ');

      let inputAdornments = {
        endAdornment: (
          <>
            {textValue && <Close className={classes.icon} />}
            {!freeSolo && <ExpandMore className={classes.icon} />}
          </>
        ),
      };
      if (multiple && textValue) {
        inputAdornments = {
          ...inputAdornments,
          startAdornment: <Chip label={textValue} onDelete={() => {}} />,
        };
      }

      return (
        <div className={classes.root}>
          <TextField
            {...textFieldProps}
            value={multiple ? '' : textValue}
            InputProps={inputAdornments}
          />
        </div>
      );
    }

    const actionInput = getActionInput(actionInputId);
    const value = currentValue;
    const searchProp = searchProperty ? getProperty(searchProperty) : null;

    const valueProp = valueProperty ? getProperty(valueProperty) : null;

    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam, setDebouncedSearchParam] = useState('');
    const debounceDelay = 1000;

    const onChange = (_, newValue) => {
      if (!valueProp || !newValue) {
        setCurrentValue(newValue);
        return;
      }
      let newCurrentValue = newValue[valueProp.name];
      if (multiple) {
        newCurrentValue = newValue.map(rec => rec[valueProp.name]);
      }
      setCurrentValue(newCurrentValue);
    };

    const getDefaultValue = records => {
      if (!value) {
        return multiple ? [] : null;
      }
      let currentRecordsKeys = value;
      if (!Array.isArray(value)) {
        currentRecordsKeys = multiple ? value.toString().split(',') : [value];
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
          if (errorResp) {
            return <span>Something went wrong: {errorResp.message} :(</span>;
          }

          let reason = 'No data';
          if (!searchProp || !valueProp) {
            reason = 'No property selected';
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

          return (
            <Autocomplete
              multiple={multiple}
              freeSolo={freeSolo}
              options={data.results}
              defaultValue={getDefaultValue(data.results)}
              getOptionLabel={option =>
                option[searchProp.name] && option[searchProp.name].toString()
              }
              onInputChange={(_, inputValue) => {
                if (!freeSolo) {
                  return;
                }
                setSearchParam(inputValue);
              }}
              onChange={onChange}
              renderInput={params => (
                <>
                  <input
                    type="hidden"
                    name={actionInput && actionInput.name}
                    value={value}
                  />
                  <TextField
                    {...params}
                    {...textFieldProps}
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
