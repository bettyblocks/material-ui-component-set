(() => ({
  name: 'AutoCompleteSingle',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const { TextField } = window.MaterialUI.Core;
    const { ExpandMore } = window.MaterialUI.Icons;
    const { env, getCustomModelAttribute, getProperty, useText } = B;
    const {
      closeOnSelect,
      customModelAttribute: customModelAttributeRaw,
      dataComponentAttribute: dataComponentAttributeRaw,
      disabled,
      errorType,
      freeSolo,
      fullWidth,
      helperText: helperTextRaw,
      hideLabel,
      margin,
      nameAttribute: nameAttributeRaw,
      optionType,
      placeholder: placeholderRaw,
      property,
      // model,
      showError,
      searchProperty,
      size,
      valueProperty,
      variant,
    } = options;

    const isDev = env === 'dev';
    const displayError = errorType === 'built-in';
    const placeholder = useText(placeholderRaw);
    const helperText = useText(helperTextRaw);
    const nameAttribute = useText(nameAttributeRaw);
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
    // TODO: discuss default value behaviour this doesnt seem to work at the moment for a list property
    const defaultValue = useText(valueRaw, { rawValue: true });
    const [value, setValue] = useState(defaultValue);

    const { kind: propertyKind = '', values: propertyValues } =
      getProperty(property) || {};
    const isListProperty = propertyKind.toLowerCase() === 'list';

    const searchProp = getProperty(searchProperty) || {};
    const valueProp = getProperty(valueProperty) || {};
    const hasSearch = searchProp && searchProp.id;
    const hasValue = valueProp && valueProp.id;

    let valid = false;
    let message = '';

    switch (optionType) {
      case 'model': {
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
          message = 'No List property selected';
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

    // TODO: Remove when dynamic request is added
    const error = false;

    if (isDev || !valid) {
      let inputValue;

      if (!valid) {
        inputValue = message;
      }
      // TODO: disscus with anton!
      if (isDev) {
        inputValue = defaultValue;
      }

      return (
        <div className={classes.root}>
          <TextField
            InputProps={{
              inputProps: {
                tabIndex: isDev && -1,
              },
              endAdornment: <>{!freeSolo && <ExpandMore />}</>,
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
            value={inputValue}
            variant={variant}
          />
        </div>
      );
    }

    if (error && displayError) return <span>{error.message}</span>;

    const getOptions = () => {
      if (isListProperty) {
        return propertyValues.map(propertyValue => propertyValue.value);
      }

      return [];
    };

    return (
      <Autocomplete
        autoSelect={freeSolo}
        disableCloseOnSelect={!closeOnSelect}
        disabled={disabled}
        freeSolo={freeSolo}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        options={getOptions()}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: params.InputProps.endAdornment,
            }}
            classes={{ root: classes.formControl }}
            dataComponent={dataComponentAttribute}
            disabled={disabled}
            error={showError}
            fullWidth={fullWidth}
            helperText={helperText}
            key={value ? 'hasValue' : 'isEmpty'}
            label={!hideLabel && label}
            margin={margin}
            name={nameAttribute || name}
            placeholder={placeholder}
            required={required && !value}
            size={size}
            variant={variant}
          />
        )}
        value={value}
      />
    );
  })(),
  styles: B => t => {
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
