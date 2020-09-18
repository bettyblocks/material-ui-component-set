(() => ({
  name: 'Select',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      required,
      disabled,
      defaultValue,
      variant,
      size,
      fullWidth,
      hasError,
      margin,
      helperText,
      selectOptions = '',
      model,
      filter,
      optionType,
      labelProperty: labelProp,
      valueProperty: valueProp,
      showError,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      property,
      propertyLabelOverride,
    } = options;
    const { TextField, MenuItem } = window.MaterialUI.Core;
    const displayError = showError === 'built-in';
    const isDev = B.env === 'dev';
    const { useGetAll, getProperty, useText, getCustomModelAttribute } = B;
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const helper = useText(helperText);

    const { id: customModelAttributeId, label } = customModelAttributeObj;
    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const value = currentValue;

    const { name: labelName } = getProperty(labelProp) || {};
    const { name: propName } = getProperty(valueProp) || {};

    const { loading, error, data, refetch } =
      model && useGetAll(model, { filter, skip: 0, take: 50 });

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    if (error && !displayError) {
      B.triggerEvent('onError', error.message);
    }

    const { results } = data || {};

    if (results) {
      if (results.length > 0) {
        B.triggerEvent('onSuccess', results);
      } else {
        B.triggerEvent('onNoResults');
      }
    }

    useEffect(() => {
      B.defineFunction('Refetch', () => refetch());
    }, [refetch]);

    const handleChange = event => {
      const {
        target: { value: eventValue },
      } = event;

      setCurrentValue(eventValue);
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    const renderOptions = () => {
      if (optionType !== 'data') {
        return selectOptions.split('\n').map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ));
      }
      if (loading) return <span>Loading...</span>;
      if (error && displayError) return <span>{error.message}</span>;
      return (results || []).map(
        item =>
          propName &&
          labelName && (
            <MenuItem key={item.id} value={item[propName]}>
              {item[labelName]}
            </MenuItem>
          ),
      );
    };

    const SelectCmp = (
      <TextField
        select
        defaultValue={value}
        value={value}
        size={size}
        classes={{ root: classes.formControl }}
        variant={variant}
        fullWidth={fullWidth}
        onChange={handleChange}
        inputProps={{
          name: customModelAttribute && customModelAttribute.name,
          tabIndex: isDev ? -1 : 0,
        }}
        required={required}
        disabled={disabled}
        label={!hideLabel && labelText}
        error={hasError}
        margin={margin}
        helperText={helper}
      >
        {renderOptions()}
      </TextField>
    );

    return isDev ? <div className={classes.root}>{SelectCmp}</div> : SelectCmp;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
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
