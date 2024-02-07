(() => ({
  name: 'Form',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      recordVariable,
      actionId,
      model,
      currentRecord,
      filter = {},
      showDataOnLoad,
    } = options;
    const { Form, GetOne, useFilter, getIdProperty } = B;
    const formRef = React.createRef();
    const [interactionFilter, setInteractionFilter] = useState({});
    const mounted = useRef(false);

    const isDev = B.env === 'dev';

    const getFilter = React.useCallback(() => {
      if (isDev || !currentRecord || !model) {
        return filter;
      }
      const idProperty = getIdProperty(model);

      return {
        [idProperty.id]: { eq: currentRecord },
      };
    }, [isDev, filter, currentRecord, model]);

    const selectedFilter = getFilter();

    if (isDev && children.length === 0) {
      return (
        <div className={[classes.empty, classes.pristine].join(' ')}>Form</div>
      );
    }

    const onActionSuccess = (response) => {
      const event = response.data.action.results;

      B.triggerEvent('onActionSuccess', event, { modelData: event });
    };

    const onActionError = (error) => {
      B.triggerEvent('onActionError', error);
    };

    const onActionDone = () => {
      B.triggerEvent('onActionDone');
    };

    const onActionLoad = (loading) => {
      if (loading) B.triggerEvent('onActionLoad', loading);
    };

    useEffect(() => {
      B.defineFunction('Submit', () => {
        if (formRef.current) {
          if (typeof formRef.current.requestSubmit === 'function') {
            formRef.current.requestSubmit();
          } else {
            formRef.current.dispatchEvent(
              new Event('submit', { cancelable: true }),
            );
          }
        }
      });
    }, [formRef]);

    const transformValue = (value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }

      return value;
    };

    useEffect(() => {
      mounted.current = true;

      B.triggerEvent('onRender');
      return () => {
        mounted.current = false;
      };
    }, []);

    /**
     * @name Filter
     * @param {Property} property
     * @returns {Void}
     */
    B.defineFunction('Filter', ({ event, property, interactionId }) => {
      if (event === undefined || event === null) {
        // eslint-disable-next-line no-console
        console.error(
          'Event is empty. Please use this function with valid input events.',
        );
        return;
      }
      setInteractionFilter((s) => ({
        ...s,
        [interactionId]: {
          property,
          value: event.target ? event.target.value : transformValue(event),
        },
      }));
    });

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
    });

    const deepMerge = (...objects) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach((key) => {
          const accumulatorValue = accumulator[key];
          const value = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
            accumulator[key] = accumulatorValue.concat(value);
          } else if (isObject(accumulatorValue) && isObject(value)) {
            accumulator[key] = deepMerge(accumulatorValue, value);
          } else {
            accumulator[key] = value;
          }
        });
        return accumulator;
      }, {});
    };

    let interactionFilters = {};

    const isEmptyValue = (value) =>
      !value || (Array.isArray(value) && value.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value }]) => !isEmptyValue(value))
      .map(([, { property, value }]) =>
        property.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(value)
              ? {
                  _or: value.map((el) => ({
                    [field]: { [property.operator]: el },
                  })),
                }
              : { [field]: { [property.operator]: value } };
          }

          return { [field]: acc };
        }, {}),
      );

    interactionFilters =
      clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

    const completeFilter = deepMerge(selectedFilter, interactionFilters);
    const where = useFilter(completeFilter);
    const hasFilter = where && Object.keys(where).length !== 0;

    function FormComponent({ record }) {
      return (
        <Form
          actionId={actionId}
          onActionLoad={onActionLoad}
          onActionDone={onActionDone}
          onActionSuccess={onActionSuccess}
          onActionError={onActionError}
          ref={formRef}
          currentRecord={currentRecord || record}
          recordVariable={recordVariable}
        >
          <fieldset className={classes.fieldset}>{children}</fieldset>
        </Form>
      );
    }

    if (isDev) {
      return (
        <div>
          <FormComponent />
        </div>
      );
    }

    if (model && hasFilter) {
      return (
        <GetOne modelId={model} rawFilter={where}>
          {({ loading, error, data }) => {
            if (loading && showDataOnLoad) {
              return <>{children}</>;
            }

            if (loading) {
              return <></>;
            }

            if (error) {
              return <span>Something went wrong: {error.message}</span>;
            }
            const { id } = data;

            return <FormComponent record={id} />;
          }}
        </GetOne>
      );
    }

    return <FormComponent />;
  })(),
  styles: () => ({
    fieldset: {
      border: 0,
      margin: 0,
      padding: 0,
      minInlineSize: 'auto',
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: ({ options: { columnHeight } }) => (columnHeight ? 0 : '4rem'),
      height: '100%',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
