(() => ({
  name: 'DateTimePickerInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      autoComplete,
      closeOnSelect,
      disabled,
      error,
      value,
      placeholder = [''],
      variant,
      validationValueMissing,
      inputvariant,
      type: typeComponent,
      dateFormat,
      timeFormat,
      datetimeFormat,
      size,
      fullWidth,
      required,
      minValue,
      maxValue,
      validationBeforeMinValue,
      validationAfterMaxValue,
      validationInvalidValue,
      margin,
      helperText,
      disableToolbar,
      disablePastDates,
      hideLabel,
      use24HourClockTime: is24HourClockTime,
      label,
      locale,
      dataComponentAttribute = ['DateTimePicker'],
      floatLabel,
    } = options;

    const { env, useText, Icon, generateUUID } = B;
    const {
      MuiPickersUtilsProvider,
      KeyboardTimePicker,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;
    const { nlLocale, enLocale } = window.MaterialUI.DateLocales;
    const { DateFnsUtils } = window.MaterialUI;
    const DateFns = new DateFnsUtils();

    const localeMap = {
      nl: nlLocale,
      en: enLocale,
    };

    const isDev = env === 'dev';

    const valueText = useText(value);
    const optionHelperText = useText(helperText);

    const validationValueMissingText = useText(validationValueMissing);
    const validationInvalidValueText = useText(validationInvalidValue);
    const validationBeforeMinValueText = useText(validationBeforeMinValue);
    const validationAfterMaxValueText = useText(validationAfterMaxValue);

    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const { current: labelControlRef } = useRef(generateUUID());

    const [selectedDate, setSelectedDate] = useState(valueText || null);
    const [errorState, setErrorState] = useState(error);
    const [currentHelperText, setHelper] = useState(optionHelperText);
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [isFirstValidation, setIsFirstValidation] = useState(true);

    B.defineFunction('Clear', () => setSelectedDate(null));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));

    const DATA_API_DATE_FORMAT = 'yyyy-MM-dd';
    const DATA_API_TIME_FORMAT = 'HH:mm:ss';

    function getFormat(typeFormat) {
      return {
        date: dateFormat || 'dd/MM/yyyy',
        time: timeFormat || 'HH:mm:ss',
        datetime: datetimeFormat || 'dd/MM/yyyy HH:mm:ss',
      }[typeFormat];
    }

    function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    }

    // useEffect for 'valueText', trigger on first componentRender (and data-loaded)
    useEffect(() => {
      let parsedValue = null;

      if (valueText) {
        let parsedDate = '';

        switch (typeComponent) {
          case 'datetime': {
            parsedDate = new Date(valueText);
            break;
          }
          case 'date': {
            parsedDate = DateFns.parse(valueText, DATA_API_DATE_FORMAT);
            break;
          }
          case 'time': {
            parsedDate = DateFns.parse(valueText, DATA_API_TIME_FORMAT);
            break;
          }
          default: {
            throw new Error(
              `DateTimePickerInput: unknown type: '${typeComponent}'`,
            );
          }
        }

        if (isValidDate(parsedDate)) {
          parsedValue = parsedDate;
        } else {
          parsedDate = DateFns.parse(valueText, getFormat(typeComponent));
          if (isValidDate(parsedDate)) {
            parsedValue = parsedDate;
          }
        }
      }

      setSelectedDate(parsedValue);
    }, [valueText]);

    function validationMessage(validityObject) {
      if (validityObject.valueMissing) {
        return validationValueMissingText;
      }
      if (validityObject.invalidValue) {
        return validationInvalidValueText;
      }
      if (validityObject.beforeMinValue) {
        return validationBeforeMinValueText;
      }
      if (validityObject.afterMaxValue) {
        return validationAfterMaxValueText;
      }
      return '';
    }

    function setValidationMessage(validation) {
      setErrorState(!validation.valid);
      setHelper(validationMessage(validation) || optionHelperText);
    }

    const onChangeHandler = (internalDate) => {
      setSelectedDate(internalDate);
      setIsFirstValidation(false);

      setTimeout(() => {
        B.triggerEvent('onChange', internalDate);
      }, 250);
    };

    // onInvalidHandler is called on form submit with invalid value
    const onInvalidHandler = (event) => {
      event.preventDefault();
      const {
        target: { validity },
      } = event;

      setValidationMessage(validity);
      setIsFirstValidation(false);
    };

    const onBlurHandler = (event) => {
      const {
        target: { validity },
      } = event;

      setValidationMessage(validity);
    };

    // onErrorHandler is called on render and every time the value changes
    const onErrorHandler = (internalComponentMessage) => {
      const validation = {
        valid:
          !internalComponentMessage &&
          (isFirstValidation || selectedDate || !required),
        valueMissing: !isFirstValidation && !selectedDate && required,
        invalidValue: internalComponentMessage.includes('Invalid'),
        beforeMinValue: internalComponentMessage.includes('minimal date'),
        afterMaxValue: internalComponentMessage.includes('maximal date'),
      };

      setValidationMessage(validation);
    };

    function convertToValidDate(dateText) {
      if (dateText) {
        const parsedValue = DateFns.parse(dateText, getFormat(typeComponent));
        if (isValidDate(parsedValue)) {
          return parsedValue;
        }
        // convert to slashes because it conflicts with the MUI DateTimeCmp
        const parsedValueWithSlashes = dateText.replace(/-/g, '/');
        return new Date(parsedValueWithSlashes);
      }
      return undefined;
    }

    let DateTimeComponent;
    let resultValue;
    switch (typeComponent) {
      case 'date': {
        DateTimeComponent = KeyboardDatePicker;
        resultValue = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd')
          : null;
        break;
      }
      case 'datetime': {
        DateTimeComponent = KeyboardDateTimePicker;
        resultValue = isValidDate(selectedDate)
          ? selectedDate.toISOString()
          : null;

        break;
      }
      case 'time': {
        DateTimeComponent = KeyboardTimePicker;
        resultValue = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'HH:mm:ss')
          : null;
        break;
      }
      default:
    }

    const DateTimeCmp = (
      <DateTimeComponent
        id={labelControlRef}
        classes={{
          root: `${classes.formControl} ${floatLabel && classes.floatLabel}`,
        }}
        value={selectedDate}
        autoComplete={autoComplete ? 'on' : 'off'}
        placeholder={useText(placeholder)}
        label={!hideLabel && useText(label)}
        error={errorState}
        helperText={currentHelperText}
        disableToolbar={disableToolbar}
        disablePast={disablePastDates}
        minDate={convertToValidDate(useText(minValue))}
        maxDate={convertToValidDate(useText(maxValue))}
        format={getFormat(typeComponent)}
        fullWidth={fullWidth}
        size={size}
        margin={margin}
        data-component={dataComponentAttributeValue}
        ampm={!is24HourClockTime}
        keyboardIcon={
          typeComponent === 'time' ? (
            <Icon name="AccessTime" fontSize={size} />
          ) : (
            <Icon name="Event" fontSize={size} />
          )
        }
        required={required}
        clearable="true"
        disabled={isDisabled}
        autoOk={closeOnSelect}
        variant={variant}
        inputVariant={inputvariant}
        InputProps={{
          inputProps: {
            tabIndex: isDev ? -1 : undefined,
            className: includeStyling(),
            // this prevents the form from submitting when in error state
            ...(errorState && {
              pattern: '^a',
            }),
          },
        }}
        KeyboardButtonProps={{
          tabIndex: isDev ? -1 : undefined,
        }}
        PopoverProps={{
          classes: {
            root: classes.popover,
          },
        }}
        DialogProps={{
          className: classes.dialog,
        }}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        onInvalid={onInvalidHandler}
        onError={onErrorHandler}
      />
    );

    if (isDev) {
      return (
        <div className={classes.root}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[locale]}
          >
            {variant === 'static' ? (
              <div className={classes.static}>{DateTimeCmp}</div>
            ) : (
              DateTimeCmp
            )}
          </MuiPickersUtilsProvider>
        </div>
      );
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
        <input type="hidden" name={name} value={resultValue} />
        {variant === 'static' ? (
          <div className={classes.static}>{DateTimeCmp}</div>
        ) : (
          DateTimeCmp
        )}
      </MuiPickersUtilsProvider>
    );
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
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      dialog: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
        '& .MuiButton-textPrimary': {
          color: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      popover: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      floatLabel: {
        '& > label': {
          position: 'static !important',
          transform: 'none !important',
          marginBottom: '8px !important',
        },
        '& .MuiInputBase-root': {
          '& > fieldset': {
            '& > legend': {
              maxWidth: '0px !important',
            },
          },
        },
      },
      formControl: {
        '& > label': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
          zIndex: ({ options: { inputvariant } }) =>
            inputvariant === 'standard' ? 1 : null,

          '&.Mui-focused': {
            color: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
          '&.Mui-error, &.Mui-error .Mui-error': {
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
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          marginRight: '-12px',
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
      static: {
        '& .MuiPickersStaticWrapper-staticWrapperRoot': {
          '& .MuiToolbar-root, & .MuiPickersDay-daySelected': {
            backgroundColor: ({ options: { backgroundColorPopup } }) => [
              style.getColor(backgroundColorPopup),
              '!important',
            ],
          },
        },
      },
    };
  },
}))();
