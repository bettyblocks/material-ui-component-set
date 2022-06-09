(() => ({
  name: 'AutocompleteInput',
  type: 'FORM_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Autocomplete } = window.MaterialUI.Lab;
    const { TextField, FormControl, FormHelperText } = window.MaterialUI.Core;
    const { env, getProperty, useText, Icon } = B;
    const {
      actionProperty,
      actionVariableId,
      closeOnSelect,
      dataComponentAttribute,
      disabled,
      fullWidth,
      helperText: helperTextRaw,
      hideLabel,
      label,
      margin,
      placeholder: placeholderRaw,
      required,
      size,
      type,
      validationValueMissing = [''],
      value: prefabValue,
      variant,
    } = options;

    const isDev = env === 'dev';
    const placeholder = useText(placeholderRaw || []);
    const helperText = useText(helperTextRaw || []);
    const changeContext = useRef(null);
    const [helper, setHelper] = useState(useText(helperTextRaw || []));
    const { values = [] } = getProperty(actionProperty.modelProperty) || {};
    const [errorState, setErrorState] = useState(false);
    const dataComponentAttributeValue =
      useText(dataComponentAttribute || []) || 'AutoComplete';

    const [value, setValue] = useState(useText(prefabValue) || '');
    const [inputValue, setInputValue] = useState(useText(prefabValue) || '');
    const [interactionFilter, setInteractionFilter] = useState({});
    const isNumberType = type === 'number';

    const valueMissingMessage = useText(validationValueMissing || []);
    const helperTextResolved = useText(helperTextRaw || []);

    const validationMessage = (validityObject) => {
      if (!validityObject) {
        return '';
      }
      if (validityObject.valid) {
        return '';
      }
      if (validityObject.valueMissing && valueMissingMessage) {
        return valueMissingMessage;
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
      return target.validity;
    };

    B.defineFunction('Clear', () => {
      setValue('');
      setInputValue('');
    });

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
    if (isDev) {
      const devValue = useText(prefabValue).replace(/\n/g, '') || null;

      return (
        <div className={classes.root}>
          <TextField
            InputProps={{
              inputProps: {
                tabIndex: isDev ? -1 : undefined,
              },
              endAdornment: <Icon name="ExpandMore" />,
            }}
            classes={{ root: classes.formControl }}
            InputLabelProps={{ shrink: !!devValue }}
            dataComponent={dataComponentAttributeValue}
            disabled={disabled}
            error={errorState}
            fullWidth={fullWidth}
            helperText={helperText}
            label={!hideLabel && label}
            margin={margin}
            placeholder={placeholder}
            required={required}
            size={size}
            value={devValue}
            variant={variant}
          />
        </div>
      );
    }

    const getOptions = () => {
      return values.map(({ value: PropertyValue }) => PropertyValue);
    };

    const currentOptions = getOptions();

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
          id={actionVariableId}
          disableCloseOnSelect={!closeOnSelect}
          disabled={disabled}
          inputValue={inputValue}
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue || '');
            const triggerEventValue = newValue || '';
            B.triggerEvent(
              'onChange',
              triggerEventValue,
              changeContext.current,
            );
          }}
          onInputChange={(event, newValue) => {
            let validation = event ? event.target.validity : null;
            if (isNumberType) {
              validation = customPatternValidation(event.target);
            }
            handleValidation(validation);
            if (event && ['change', 'keydown', 'click'].includes(event.type)) {
              setInputValue(newValue);
            }
          }}
          onBlur={(event) => {
            let validation = event.target.validity;
            if (isNumberType) {
              validation = customPatternValidation(event.target);
            }
            handleValidation(validation);
            setInputValue(value);
          }}
          options={currentOptions}
          renderInput={(params) => (
            <>
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
                  },
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
                classes={{ root: classes.formControl }}
                data-component={dataComponentAttributeValue}
                disabled={disabled}
                fullWidth={fullWidth}
                error={errorState}
                label={!hideLabel && label}
                margin={margin}
                placeholder={placeholder}
                required={required}
                size={size}
                variant={variant}
              />
            </>
          )}
        />
        {helper && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );

    return MuiAutocomplete;
  })(),
  styles: (B) => (t) => {
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
