(() => ({
  name: 'CheckboxGroup',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      dataComponentAttribute = ['CheckboxGroup'],
      disabled,
      filter,
      fullWidth,
      helperText = [''],
      hideLabel,
      label: labelRaw,
      labelProperty: labelPropertyId = '',
      margin,
      model,
      optionType,
      order,
      orderBy,
      position,
      property,
      required,
      row,
      showError,
      size,
      validationValueMissing = [''],
      value: valueRaw,
    } = options;

    const {
      env,
      generateUUID,
      getIdProperty,
      getModel,
      getProperty,
      useAllQuery,
      useFilter,
      useRelation,
      useText,
    } = B;
    const displayError = showError === 'built-in';
    const isDev = env === 'dev';
    const [errorState, setErrorState] = useState(false);
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [helper, setHelper] = useState(useText(helperText));
    const [isDisabled, setIsDisabled] = useState(disabled);

    const labelText = useText(labelRaw);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const validationValueMissingText = useText(validationValueMissing);
    const helperTextResolved = useText(helperText);
    const defaultValueText = useText(valueRaw, { rawValue: true });

    const modelProperty = getProperty(property || '') || {};
    const { modelId: propertyModelId, referenceModelId } = modelProperty;
    const { contextModelId } = model;

    const modelId =
      contextModelId || referenceModelId || propertyModelId || model || '';

    const idProperty = getIdProperty(modelId || '') || {};
    const isListProperty =
      modelProperty.kind === 'LIST' || modelProperty.kind === 'list';
    const valueProperty = isListProperty ? modelProperty : idProperty;

    const propertyModel = getModel(modelId);

    const defaultLabelProperty =
      getProperty(
        propertyModel && propertyModel.labelPropertyId
          ? propertyModel.labelPropertyId
          : '',
      ) || {};

    const labelProperty =
      getProperty(labelPropertyId) || defaultLabelProperty || idProperty;

    const listValues = valueProperty.values;

    let valid = true;
    let validMessage = '';

    if (!isListProperty && !isDev) {
      if (!modelId) {
        validMessage = 'No model selected';
        valid = false;
      }
    }

    /*
     * Merges interaction filters with local filters
     */
    const mergeFilters = (...filters) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return filters.reduce((acc, object) => {
        Object.entries(object).forEach(([key, filterValue]) => {
          const accValue = acc[key];

          if (Array.isArray(accValue) && Array.isArray(filterValue)) {
            acc[key] = accValue.concat(filterValue);
          } else if (isObject(accValue) && isObject(filterValue)) {
            acc[key] = mergeFilters(accValue, filterValue);
          } else {
            acc[key] = filterValue;
          }
        });

        return acc;
      }, {});
    };

    const getValues = () => {
      const value = defaultValueText || [];
      // split the string and trim spaces
      if (Array.isArray(value)) return value;

      // check wether our value is an object array.
      try {
        const parsed = JSON.parse(value);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === 'object' && 'id' in item)
        ) {
          return parsed.map((obj) => String(obj.id));
        }
      } catch (error) {
        return value
          .split(',')
          .filter((part) => part !== '')
          .map((str) => str.trim());
      }

      return value
        .split(',')
        .filter((part) => part !== '')
        .map((str) => str.trim());
    };

    const [values, setValues] = useState(getValues());

    useEffect(() => {
      setValues(getValues());
    }, [defaultValueText]);

    const orderBySanitized = orderBy.id === '' ? undefined : orderBy;

    const orderByArray = [orderBySanitized].flat();
    const sort =
      !isDev && orderBySanitized
        ? orderByArray.reduceRight((acc, orderByProperty, index) => {
            const prop = getProperty(orderByProperty);
            return index === orderByArray.length - 1
              ? { [prop.name]: order.toUpperCase() }
              : { [prop.name]: acc };
          }, {})
        : {};

    const {
      loading: queryLoading,
      error: err,
      data: queryData,
      refetch,
    } = useAllQuery(
      model,
      {
        filter,
        take: 50,
        variables: {
          ...(orderBySanitized ? { sort: { relation: sort } } : {}),
        },
        onCompleted(res) {
          const hasResult = res && res.result && res.result.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      !!contextModelId || optionType === 'property' || !valid,
    );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );

    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;

    if (loading) {
      B.triggerEvent('onLoad', loading);
    }

    const { results } = data || {};

    let parentIdValue;
    let valuesFilter = {};

    // check if the value option has a relation with an id property
    const relationPropertyId = valueRaw[0] && valueRaw[0].id;
    const relationProperty = getProperty(relationPropertyId || '');

    // check if the value option has a relational property
    if (relationProperty && relationProperty.inverseAssociationId) {
      const parentProperty = getIdProperty(relationProperty.modelId);
      const parentIdProperty = parentProperty ? parentProperty.id : '';
      parentIdValue = B.useProperty(parentIdProperty);

      // create a filter with the relation id and the parent id-property id
      valuesFilter = {
        _and: [
          {
            [relationProperty.inverseAssociationId]: {
              [parentIdProperty]: {
                eq: {
                  id: [parentIdProperty],
                  type: 'PROPERTY',
                },
              },
            },
          },
        ],
      };
    }

    if (relationProperty && !relationProperty.inverseAssociationId) {
      const parentProperty = getIdProperty(relationProperty.modelId);
      const parentIdProperty = parentProperty ? parentProperty.id : '';
      parentIdValue = B.useProperty(parentIdProperty);

      // create a filter with the relation id and the parent id-property id
      valuesFilter = {
        _and: [
          {
            [parentIdProperty]: {
              eq: {
                id: [parentIdProperty],
                type: 'PROPERTY',
              },
            },
          },
        ],
      };
    }

    // merge the values filter with the options filter to get the values in range of the complete set
    const valueFilter = useFilter(mergeFilters(valuesFilter, filter));
    const queryWasResolvable = !!parentIdValue;

    useAllQuery(
      // use contextModelId when selecting a relation in the model option
      contextModelId || model,
      {
        take: 50,
        rawFilter: valueFilter,
        variables: {},
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            // get the id's of the filtered results to set as values
            const ids = res.results.map(({ id }) => id.toString());
            setValues(ids);
          }
        },
        onError(resp) {
          if (!displayError) {
            B.triggerEvent('onError', resp);
          }
        },
      },
      /*
       * don't execute if the optionType is a property like a list-property
       * don't execute if not valid (no property, no model etc)
       * don't execute when the filter cannot use the parent id-property (queryWasResolvable)
       */
      optionType === 'property' || !valid || !queryWasResolvable,
    );

    B.defineFunction('Refetch', () => refetch());
    B.defineFunction('Reset', () => setValues(defaultValueText || []));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));

    useEffect(() => {
      if (isDev) {
        setValues(getValues());
        setHelper(helperTextResolved);
      }
    }, [isDev, defaultValueText, helperTextResolved]);

    const {
      Checkbox: MUICheckbox,
      FormControlLabel,
      FormControl,
      FormHelperText,
      FormGroup,
      FormLabel,
    } = window.MaterialUI.Core;

    const handleChange = (evt) => {
      const { checked, value } = evt.target;
      setErrorState(false);
      setValues((state) => {
        if (checked) return state.concat(value);
        return state.filter((v) => v !== value);
      });
      setTimeout(() => {
        B.triggerEvent('onChange', values);
      }, 250);
    };

    const invalidHandler = (event) => {
      event.preventDefault();
      setAfterFirstInvalidation(true);
      setErrorState(true);
    };

    const isValid = required ? values.join() !== '' : true;
    const hasError = errorState || !isValid;

    const renderCheckbox = (checkboxLabel, checkboxValue) => {
      const labelControlRef = generateUUID();
      return (
        <FormControlLabel
          control={
            <MUICheckbox
              id={labelControlRef}
              required={required && !isValid}
              tabIndex={isDev ? -1 : undefined}
              size={size}
            />
          }
          htmlFor={labelControlRef}
          label={checkboxLabel}
          labelPlacement={position}
          checked={values.includes(checkboxValue)}
          onChange={handleChange}
          disabled={isDisabled}
          value={checkboxValue}
          onInvalid={invalidHandler}
        />
      );
    };

    const renderCheckBoxes = () => {
      if (isListProperty) {
        return listValues.map(({ value: v }) => renderCheckbox(v, v));
      }
      if (isDev) return renderCheckbox('Placeholder', false);
      if (loading) return <span>Loading...</span>;
      if (err && displayError) return <span>{err.message}</span>;
      if (!loading && results) {
        return results.map((item) => {
          return renderCheckbox(item[labelProperty.name], `${item.id}`);
        });
      }
      return <span>No results</span>;
    };

    useEffect(() => {
      if (afterFirstInvalidation) {
        const message = hasError
          ? validationValueMissingText
          : helperTextResolved;
        setHelper(message);
      }
    }, [errorState, values, required, afterFirstInvalidation]);

    const Control = (
      <FormControl
        classes={{ root: classes.formControl }}
        margin={margin}
        className={includeStyling()}
        component="fieldset"
        required={required}
        error={afterFirstInvalidation && hasError}
        fullWidth={fullWidth}
      >
        {labelText && !hideLabel && (
          <FormLabel component="legend">{labelText}</FormLabel>
        )}
        <FormGroup row={row} data-component={dataComponentAttributeValue}>
          {valid ? renderCheckBoxes() : validMessage}
          <input type="hidden" name={name} value={values} />
        </FormGroup>
        {helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    );
    return isDev ? <div className={classes.root}>{Control}</div> : Control;
  })(),
  styles: (B) => (t) => {
    const { color: colorFunc, Styling } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      formControl: {
        '& > legend': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
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
        '& .MuiFormControlLabel-root': {
          '& .MuiCheckbox-root': {
            color: ({ options: { checkboxColor } }) => [
              style.getColor(checkboxColor),
              '!important',
            ],
            '&:hover': {
              backgroundColor: ({ options: { checkboxColor } }) => [
                getOpacColor(style.getColor(checkboxColor), 0.04),
                '!important',
              ],
            },
            '&.Mui-checked': {
              color: ({ options: { checkboxColorChecked } }) => [
                style.getColor(checkboxColorChecked),
                '!important',
              ],
              '&:hover': {
                backgroundColor: ({ options: { checkboxColorChecked } }) => [
                  getOpacColor(style.getColor(checkboxColorChecked), 0.04),
                  '!important',
                ],
              },
            },
          },
          '& .MuiTypography-root': {
            color: ({ options: { textColor } }) => [
              style.getColor(textColor),
              '!important',
            ],
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
      },
    };
  },
}))();
