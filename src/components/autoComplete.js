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
    } = options;
    const isDev = B.env === 'dev';
    const { Autocomplete } = window.MaterialUI.Lab;
    const { TextField, CircularProgress, Chip } = window.MaterialUI.Core;
    const { ExpandMore, Close } = window.MaterialUI.Icons;
    const { useText, getProperty, getActionInput } = B;
    const [currentValue, setCurrentValue] = isDev
      ? useState(defaultValue.join(' '))
      : useState(useText(defaultValue));
    const placeholderText = isDev
      ? placeholder.join(' ')
      : useText(placeholder);
    const helper = isDev ? helperText.join(' ') : useText(helperText);

    const textFieldProps = {
      disabled,
      variant,
      label,
      fullWidth,
      size,
      type,
      required,
      error,
      placeholder: placeholderText,
      margin,
      helperText: helper,
    };

    if (isDev) {
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
    const searchProp = options.property ? getProperty(options.property) : null;

    const valueProp = options.valueproperty
      ? getProperty(options.valueproperty)
      : null;

    const [searchParam, setSearchParam] = useState('');
    const [records, setRecords] = React.useState([]);

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

    const AutoCompleteCmp = ({ loading, onInputChange, currentRecs }) => (
      <Autocomplete
        multiple={multiple}
        freeSolo={freeSolo}
        options={records}
        getOptionLabel={option =>
          searchProp &&
          option[searchProp.name] &&
          option[searchProp.name].toString()
        }
        defaultValue={multiple ? currentRecs : currentRecs[0]}
        loading={loading}
        onInputChange={onInputChange}
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

    const { filter } = options;

    if (searchProp && searchParam !== '') {
      filter[searchProp.id] = {
        regex: searchParam,
      };
    }

    let currentRecs = [];

    const DataComponent = () =>
      model ? (
        <B.GetAll modelId={model} filter={filter} skip={0} take={50}>
          {({ loading, error: errorResp, data, refetch }) => {
            if (data && !loading && !errorResp && valueProp) {
              currentRecs = data.results.filter(
                rec =>
                  rec[valueProp.name] === value ||
                  rec[valueProp.name] === parseInt(value, 10),
              );
              setRecords(data.results);
            }
            return (
              <AutoCompleteCmp
                loading={loading}
                onInputChange={(_event, evtValue) => {
                  setSearchParam(evtValue);
                  if (refetch) {
                    refetch();
                  }
                }}
                currentRecs={currentRecs}
              />
            );
          }}
        </B.GetAll>
      ) : (
        <AutoCompleteCmp onInputChange={() => {}} currentRecs={[]} />
      );

    return <DataComponent />;
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
