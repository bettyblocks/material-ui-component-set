(() => ({
  name: 'DateTimePicker',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      autoComplete,
      disabled,
      error,
      placeholder = [''],
      variant,
      inputvariant,
      type,
      dateFormat,
      timeFormat,
      dateTimeFormat,
      size,
      fullWidth,
      margin,
      helperText = [''],
      disableToolbar,
      disablePastDates,
      closeOnSelect,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      use24HourClockDateTime,
      use24HourClockTime,
      nameAttribute,
      locale,
      clearable,
      dataComponentAttribute = ['DateTimePicker'],
    } = options;
    const { env, getCustomModelAttribute, useText, Icon } = B;
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
    const [selectedDate, setSelectedDate] = useState(null);
    const helper = useText(helperText);
    const placeholderText = useText(placeholder);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const mounted = useRef(false);

    const localeMap = {
      nl: nlLocale,
      en: enLocale,
    };

    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
      required: defaultRequired = false,
    } = customModelAttributeObj;
    const strDefaultValue = useText(defaultValue, { rawValue: true });
    const labelText = useText(label);
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const {
      name: customModelAttributeName,
      validations: { required: attributeRequired } = {},
    } = customModelAttribute || {};
    const required = customModelAttribute ? attributeRequired : defaultRequired;
    const nameAttributeValue = useText(nameAttribute);
    const isValidDate = (date) => date instanceof Date && !isNaN(date);
    const [formatError, setFormatError] = useState(null);
    const newFormat = dateFormat || dateTimeFormat;

    const validateFormat = () => {
      if (!formatError) {
        if (newFormat.indexOf('YYYY') !== -1) {
          setFormatError(
            'Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr',
          );
        } else if (newFormat.indexOf('YY') !== -1) {
          setFormatError(
            'Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr',
          );
        } else if (newFormat.indexOf('D') !== -1) {
          setFormatError(
            'Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr',
          );
        } else if (newFormat.indexOf('DD') !== -1) {
          setFormatError(
            'Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr',
          );
        } else {
          setFormatError(null);
        }
      } else {
        setFormatError(null);
      }
    };
    useEffect(() => {
      validateFormat();
    }, [newFormat]);
    // validateFormat();
    const convertToDate = (date) => {
      if (isValidDate(date)) {
        const dateString = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        return dateString;
      }
      return '';
    };

    const changeHandler = (date) => {
      setSelectedDate(date);
    };

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

    const setDefaultDate = (defaultFormat, givenFormat) => {
      if (!selectedDate && strDefaultValue) {
        const propDefaultParse = defaultFormat
          ? DateFns.parse(strDefaultValue, defaultFormat)
          : new Date(strDefaultValue);
        const formatDefaultParse = DateFns.parse(strDefaultValue, givenFormat);
        if (isValidDate(propDefaultParse)) {
          setSelectedDate(propDefaultParse);
        } else if (isValidDate(formatDefaultParse)) {
          setSelectedDate(formatDefaultParse);
        } else {
          setSelectedDate(DateFns.parse('00:00:00', 'HH:mm:ss'));
        }
      }
    };

    B.defineFunction('Clear', () => setSelectedDate(null));

    let DateTimeComponent;
    let format;
    let resultString;
    let use24HourClock = true;

    switch (type) {
      case 'date': {
        DateTimeComponent = KeyboardDatePicker;
        format = dateFormat || 'dd/MM/yyyy';

        setDefaultDate('yyyy-MM-dd', format);
        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd')
          : null;
        break;
      }
      case 'datetime': {
        DateTimeComponent = KeyboardDateTimePicker;
        format = dateTimeFormat || 'dd/MM/yyyy HH:mm:ss';
        use24HourClock = use24HourClockDateTime;

        setDefaultDate(null, format);

        resultString = isValidDate(selectedDate)
          ? new Date(selectedDate).toISOString()
          : null;
        break;
      }
      case 'time': {
        DateTimeComponent = KeyboardTimePicker;
        format = timeFormat || 'HH:mm:ss';
        use24HourClock = use24HourClockTime;

        setDefaultDate('HH:mm:ss', format);

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'HH:mm:ss')
          : null;
        break;
      }
      default:
    }

    const DateTimeCmp = (
      <DateTimeComponent
        name={nameAttributeValue || customModelAttributeName}
        value={selectedDate}
        size={size}
        autoComplete={autoComplete ? 'on' : 'off'}
        classes={{ root: classes.formControl }}
        variant={variant}
        placeholder={placeholderText}
        fullWidth={fullWidth}
        onChange={changeHandler}
        inputVariant={inputvariant}
        InputProps={{
          inputProps: {
            name: nameAttributeValue || customModelAttributeName,
            tabIndex: isDev ? -1 : undefined,
          },
        }}
        KeyboardButtonProps={{
          tabIndex: isDev ? -1 : undefined,
        }}
        required={required}
        disabled={disabled}
        label={!hideLabel && labelText}
        error={error}
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
        {formatError && (
          <div className={classes.error}>
            <h5>Date/DateTime component</h5>
            {formatError}
          </div>
        )}
        {!formatError && (
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
        )}
      </div>
    ) : (
      <>
        {formatError && (
          <div className={classes.error}>
            <h5>Date/DateTime component</h5>
            {formatError}
          </div>
        )}
        {!formatError && (
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[locale]}
          >
            <input
              type="hidden"
              name={nameAttributeValue || customModelAttributeName}
              value={resultString}
            />
            {variant === 'static' ? (
              <div className={classes.static}>{DateTimeCmp}</div>
            ) : (
              DateTimeCmp
            )}
          </MuiPickersUtilsProvider>
        )}
      </>
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
      error: {
        color: ({ options: { errorColor } }) => [
          style.getColor(errorColor),
          '!important',
        ],
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
