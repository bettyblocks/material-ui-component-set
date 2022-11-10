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
      type,
      dateFormat,
      timeFormat,
      datetimeFormat,
      size,
      fullWidth,
      required,
      margin,
      helperText = [''],
      disableToolbar,
      disablePastDates,
      hideLabel,
      use24HourClockDateTime,
      use24HourClockTime,
      label,
      locale,
      dataComponentAttribute = ['DateTimePicker'],
    } = options;
    const { env, useText, Icon } = B;
    const {
      MuiPickersUtilsProvider,
      KeyboardTimePicker,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;
    const { DateFnsUtils } = window.MaterialUI;
    const { nlLocale, enLocale } = window.MaterialUI.DateLocales;
    const DateFns = new DateFnsUtils();
    const isDev = env === 'dev';
    const parsedValue = useText(value);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorState, setErrorState] = useState(error);
    const helperTextResolved = useText(helperText);
    const [helper, setHelper] = useState(helperTextResolved);
    const valueMissingMessage = useText(validationValueMissing);
    const placeholderText = useText(placeholder);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const mounted = useRef(false);
    const clearable = true;

    const localeMap = {
      nl: nlLocale,
      en: enLocale,
    };

    const parsedLabel = useText(label);
    const labelText = parsedLabel || name;
    const isValidDate = (date) => date instanceof Date && !isNaN(date);

    const convertToDate = (date) => {
      if (isValidDate(date)) {
        const dateString = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        return dateString;
      }
      return '';
    };

    const validationMessage = (validityObject) => {
      if (validityObject.valueMissing && valueMissingMessage) {
        return valueMissingMessage;
      }
      return '';
    };

    const handleValidation = (validation) => {
      setErrorState(!validation.valid);
      const message = validationMessage(validation) || helperTextResolved;
      setHelper(message);
    };

    const changeHandler = (date) => {
      setSelectedDate(date);

      if (!date || DateFns.isValid(date)) {
        setErrorState(false);
        setHelper('');
      }
    };

    const invalidHandler = (event) => {
      event.preventDefault();
      const {
        target: { validity },
      } = event;
      handleValidation(validity);
    };

    useEffect(() => {
      if (parsedValue) {
        switch (type) {
          case 'date': {
            setSelectedDate(DateFns.parse(parsedValue, 'yyyy-MM-dd'));
            break;
          }

          case 'datetime': {
            const formatDefaultParse = DateFns.parse(
              parsedValue,
              'yyyy-MM-dd HH:mm:ss',
            );

            if (!parsedValue) return;

            if (isValidDate(formatDefaultParse)) {
              setSelectedDate(formatDefaultParse);
            } else {
              setSelectedDate(new Date(parsedValue));
            }

            break;
          }

          case 'time': {
            setSelectedDate(DateFns.parse(parsedValue, 'HH:mm:ss'));
            break;
          }

          default:
        }
      }
    }, [parsedValue]);

    useEffect(() => {
      if (mounted.current) {
        let datevalue = selectedDate;
        if (type === 'date') {
          datevalue = convertToDate(selectedDate);
          B.triggerEvent('onChange', datevalue);
          return;
        }

        if (!datevalue) {
          B.triggerEvent('onChange', '');
          return;
        }

        if (DateFns.isValid(datevalue)) {
          B.triggerEvent('onChange', datevalue);
        }
      }
    }, [selectedDate]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    B.defineFunction('Clear', () => setSelectedDate(null));

    let DateTimeComponent;
    let format;
    let resultString;
    let use24HourClock = true;

    switch (type) {
      case 'date': {
        DateTimeComponent = KeyboardDatePicker;
        format = dateFormat || 'dd/MM/yyyy';

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd')
          : null;
        break;
      }
      case 'datetime': {
        DateTimeComponent = KeyboardDateTimePicker;
        format = datetimeFormat || 'dd/MM/yyyy HH:mm:ss';
        use24HourClock = use24HourClockDateTime;

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd HH:mm:ss')
          : null;
        break;
      }
      case 'time': {
        DateTimeComponent = KeyboardTimePicker;
        format = timeFormat || 'HH:mm:ss';
        use24HourClock = use24HourClockTime;

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'HH:mm:ss')
          : null;
        break;
      }
      default:
    }

    const onBlurHandler = () => {
      if (!selectedDate) return;
      if (selectedDate && DateFns.isValid(selectedDate)) {
        setErrorState(false);
        setHelper('');
      } else {
        setErrorState(true);
        setHelper('invalid input');
      }
    };

    const DateTimeCmp = (
      <DateTimeComponent
        error={errorState}
        value={selectedDate}
        size={size}
        onBlur={onBlurHandler}
        autoComplete={autoComplete ? 'on' : 'off'}
        classes={{ root: classes.formControl }}
        variant={variant}
        placeholder={placeholderText}
        fullWidth={fullWidth}
        onChange={changeHandler}
        inputVariant={inputvariant}
        onInvalid={invalidHandler}
        InputProps={{
          inputProps: {
            tabIndex: isDev ? -1 : undefined,
          },
        }}
        KeyboardButtonProps={{
          tabIndex: isDev ? -1 : undefined,
        }}
        required={required}
        disabled={disabled}
        label={!hideLabel && labelText}
        margin={margin}
        helperText={helper}
        disableToolbar={disableToolbar}
        disablePast={disablePastDates}
        autoOk={closeOnSelect}
        format={format}
        data-component={dataComponentAttributeValue}
        PopoverProps={{
          classes: {
            root: classes.popover,
          },
        }}
        DialogProps={{
          className: classes.dialog,
        }}
        ampm={!use24HourClock}
        keyboardIcon={
          type === 'time' ? <Icon name="AccessTime" /> : <Icon name="Event" />
        }
        clearable={clearable}
      />
    );

    return isDev ? (
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
    ) : (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
        <input type="hidden" name={name} value={resultString} />
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
