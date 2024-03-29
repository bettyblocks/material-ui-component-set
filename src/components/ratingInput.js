(() => ({
  name: 'Rating',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { FormControl, FormHelperText, InputLabel, FormGroup } =
      window.MaterialUI.Core;
    const { Rating } = window.MaterialUI.Lab;
    const { env, generateUUID, useText, Icon } = B;
    const isDev = env === 'dev';

    const {
      actionVariableId: name,
      hideLabel,
      label = '',
      value: defaultValue,
      numberOfIcons,
      size,
      required,
      customSize,
      disabled,
      readonly,
      precision,
      icon,
      validationValueMissing = [''],
      error,
      helperText = [''],
      dataComponentAttribute = ['Rating'],
    } = options;

    const labelText = useText(label);
    const { current: labelControlRef } = useRef(generateUUID());

    const [currentValue, setCurrentValue] = usePageState(
      useText(defaultValue, { rawValue: true }),
    );
    const [isDisabled, setIsDisabled] = useState(disabled);

    useEffect(() => {
      setIsDisabled(disabled);
    }, [disabled]);

    const value = useText(defaultValue, { rawValue: true });
    useEffect(() => {
      setCurrentValue(value);
      B.defineFunction('Clear', () => setCurrentValue(''));
      B.defineFunction('Enable', () => setIsDisabled(false));
      B.defineFunction('Disable', () => setIsDisabled(true));
      B.defineFunction('Reset', () => setCurrentValue(value));
    }, [value]);

    const maxIcons = parseInt(numberOfIcons, 10) || 0;
    const [errorState, setErrorState] = useState(error);
    const [helper, setHelper] = useState(useText(helperText));
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);

    const IconComponent = <Icon name={icon} className={classes.ratingIcon} />;

    const defaultValueText = useText(defaultValue);
    const helperTextResolved = useText(helperText);

    const validationMessageText = useText(validationValueMissing);
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const handleValidation = () => {
      const hasError = required && !currentValue;
      setErrorState(hasError);
      const message = hasError ? validationMessageText : helperTextResolved;
      setHelper(message);
    };

    const validationHandler = () => {
      const hasError = required && !currentValue;
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    const handleChange = (_, newValue) => {
      setCurrentValue(newValue || '');
      if (afterFirstInvalidation) {
        handleValidation();
      }
      B.triggerEvent('onChange', newValue);
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(defaultValueText);
        setHelper(helperTextResolved);
      }
    }, [isDev, defaultValueText, helperTextResolved]);

    const RatingComponent = (
      <FormGroup
        className={[
          classes.root,
          labelText.length !== 0 && !hideLabel && classes.formGroup,
        ]}
      >
        <FormControl
          required={required}
          component="fieldset"
          error={errorState}
        >
          {labelText && !hideLabel && (
            <InputLabel for={labelControlRef} classes={{ root: classes.label }}>
              {labelText}
            </InputLabel>
          )}
          <Rating
            className={includeStyling(classes.ratingIcon)}
            value={currentValue}
            precision={precision}
            size={size === 'custom' ? customSize : size}
            onChange={handleChange}
            disabled={isDisabled}
            readOnly={readonly}
            emptyIcon={IconComponent}
            icon={IconComponent}
            onBlur={validationHandler}
            max={maxIcons}
            data-component={dataComponentAttributeValue}
          />
          {helper && (
            <FormHelperText classes={{ root: classes.helper }}>
              {helper}
            </FormHelperText>
          )}
          <input
            id={labelControlRef}
            className={classes.validationInput}
            onInvalid={validationHandler}
            type="text"
            tabIndex="-1"
            required={required}
            value={currentValue}
            name={name}
          />
        </FormControl>
      </FormGroup>
    );

    return isDev ? (
      <div className={classes.wrapper}>{RatingComponent}</div>
    ) : (
      RatingComponent
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      wrapper: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      root: {
        display: 'inline-block',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
      ratingIcon: {
        '& .MuiRating-iconEmpty': {
          color: ({ options: { emptyColor } }) => style.getColor(emptyColor),
        },
        '& .MuiRating-iconFilled': {
          color: ({ options: { filledColor } }) => style.getColor(filledColor),
        },
        '&.MuiSvgIcon-root': {
          fontSize: ({ options: { size, customSize } }) =>
            size === 'custom' ? customSize : 'inherit',
        },
      },
      helper: {
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
      validationInput: {
        display: 'none',
      },
      formGroup: {
        paddingTop: '15px !important',
      },
      label: {
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        transform: 'none !important',
        position: 'static !important',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
      },
    };
  },
}))();
