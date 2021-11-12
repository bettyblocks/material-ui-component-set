(() => ({
  name: 'Update Form',
  icon: 'UpdateFormIcon',
  category: 'FORM',
  keywords: ['Form', 'update', 'updateform', 'input'],
  beforeCreate: ({
    prefab,
    save,
    close,
    components: {
      ModelSelector,
      Header,
      Content,
      Field,
      Footer,
      PropertiesSelector,
      Text,
    },
    helpers: { useModelQuery },
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [showValidation, setShowValidation] = React.useState(false);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    React.useEffect(() => {
      setProperties([]);
    }, [modelId]);

    return (
      <>
        <Header onClose={close} title="Configure form fields" />
        <Content>
          <Field
            label="Select model"
            error={
              showValidation && <Text color="#e82600">Model is required</Text>
            }
          >
            <ModelSelector
              onChange={id => {
                setShowValidation(false);
                setModelId(id);
              }}
              value={modelId}
            />
          </Field>

          <Field
            label="Select properties"
            info="Small note: After you have created the Update record form, you must apply the model filtering on the form component yourself (manually). By providing a filter, the form will fetch one record on page load. This record is used to Update. Soon this will be part of the form creation process."
          >
            <PropertiesSelector
              onChange={value => {
                setProperties(value);
              }}
              value={properties}
              modelId={modelId}
              scopedModels={false}
              disabledNames={['created_at', 'updated_at', 'id']}
              disabledKinds={[
                'BELONGS_TO',
                'HAS_AND_BELONGS_TO_MANY',
                'HAS_MANY',
                'MULTI_FILE',
                'AUTO_INCREMENT',
                'COUNT',
                'EMAIL',
                'MULTI_IMAGE',
                'PDF',
                'RICH_TEXT',
                'SIGNED_PDF',
                'SUM',
                'BOOLEAN_EXPRESSION',
                'DATE_EXPRESSION',
                'DATE_TIME_EXPRESSION',
                'DECIMAL_EXPRESSION',
                'INTEGER_EXPRESSION',
                'MINUTES_EXPRESSION',
                'PRICE_EXPRESSION',
                'STRING_EXPRESSION',
                'TEXT_EXPRESSION',
                'MINUTES',
                'ZIPCODE',
              ]}
            />
          </Field>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const camelToSnakeCase = str =>
              str[0].toLowerCase() +
              str
                .slice(1, str.length)
                .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

            if (!modelId || !data || !data.model) {
              setShowValidation(true);
              return;
            }

            const newPrefab = { ...prefab };
            if (data && data.model) {
              newPrefab.variables[1].name = camelToSnakeCase(data.model.label);
            }
            newPrefab.structure[0].options[0].value.modelId = modelId;
            newPrefab.structure[0].options[1].value = modelId;
            newPrefab.variables[0].options.modelId = modelId;
            newPrefab.variables[1].options.modelId = modelId;
            newPrefab.actions[0].events[0].options.assign = properties.map(
              property => ({
                leftHandSide: property.id[0],
                ref: {
                  path: [
                    '#customModelVariableId',
                    `#attribute_${property.id[0]}`,
                  ],
                },
              }),
            );

            const descendantsArray = properties.map(property => {
              switch (property.kind) {
                case 'INTEGER': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['integer'],
                        },
                      },
                      {
                        value: true,
                        label: 'Autocomplete',
                        key: 'autoComplete',
                        type: 'TOGGLE',
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '[0-9]{8,}',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min value',
                        key: 'minvalue',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max value',
                        key: 'maxvalue',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is below the set minimum'],
                        label: 'Value below minimum message',
                        key: 'validationBelowMinimum',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is above the set maximum'],
                        label: 'Value above maximun',
                        key: 'validationAboveMaximum',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Adornment',
                        key: 'adornment',
                        value: '',
                        type: 'TEXT',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'start',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: '',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'number',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: 0,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'EMAIL_ADDRESS': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['No valid value provided'],
                        label: 'Email mismatch message',
                        key: 'validationTypeMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Adornment',
                        key: 'adornmentIcon',
                        value: 'Email',
                        type: 'ICON',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'end',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornmentIcon',
                            comparator: 'EQ',
                            value: 'none',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'email',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'adornmentIcon',
                            comparator: 'EQ',
                            value: 0,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'DECIMAL': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['decimal'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '[0-9]{8,}',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Adornment',
                        key: 'adornment',
                        value: '',
                        type: 'TEXT',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'start',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: '',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'decimal',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: 0,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'TEXT': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Disabled',
                        key: 'disabled',
                        type: 'TOGGLE',
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        value: true,
                        label: 'Multiline',
                        key: 'multiline',
                        type: 'TOGGLE',
                      },
                      {
                        value: 4,
                        label: 'Rows',
                        key: 'rows',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'multiline',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Adornment',
                        key: 'adornmentIcon',
                        value: 'none',
                        type: 'ICON',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'start',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornmentIcon',
                            comparator: 'EQ',
                            value: '',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'PRICE': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['decimal'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '[0-9]+(\\.[0-9][0-9]?)?',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Currency',
                        key: 'adornment',
                        value: '€',
                        type: 'TEXT',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'start',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: '',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'decimal',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: 0,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'PASSWORD': {
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: [
                          'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
                        ],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        label: 'Show password toggle',
                        key: 'adornment',
                        value: true,
                        type: 'TOGGLE',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'end',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornment',
                            comparator: 'EQ',
                            value: false,
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'password',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'adornmentPosition',
                            comparator: 'EQ',
                            value: 0,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'DATE': {
                  return {
                    name: 'DateTimePicker',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['date'],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'date',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'customModelAttribute',
                            comparator: 'EQ',
                            value: false,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disable Toolbar',
                        key: 'disableToolbar',
                        value: false,
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disable past dates',
                        key: 'disablePastDates',
                        value: false,
                      },
                      {
                        label: 'Language',
                        key: 'locale',
                        value: 'en',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'English', value: 'en' },
                            { name: 'Dutch', value: 'nl' },
                          ],
                        },
                      },
                      {
                        value: 'MM/dd/yyyy',
                        label: 'Format',
                        key: 'dateFormat',
                        type: 'TEXT',
                      },
                      {
                        value: false,
                        label: 'Error',
                        key: 'error',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'inline',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Dialog', value: 'dialog' },
                            { name: 'Inline', value: 'inline' },
                            { name: 'Static', value: 'static' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Clearable',
                        key: 'clearable',
                        value: false,
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'variant',
                            comparator: 'EQ',
                            value: 'dialog',
                          },
                        },
                      },
                      {
                        label: 'Input Variant',
                        key: 'inputvariant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color popup',
                        key: 'backgroundColorPopup',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['DateTimePicker'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'DATE_TIME': {
                  return {
                    name: 'DateTimePicker',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['date_time'],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'datetime',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'customModelAttribute',
                            comparator: 'EQ',
                            value: false,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disable Toolbar',
                        key: 'disableToolbar',
                        value: false,
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disable past dates',
                        key: 'disablePastDates',
                        value: false,
                      },
                      {
                        label: 'Language',
                        key: 'locale',
                        value: 'en',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'English', value: 'en' },
                            { name: 'Dutch', value: 'nl' },
                          ],
                        },
                      },
                      {
                        value: 'MM/dd/yyyy HH:mm:ss',
                        label: 'Format',
                        key: 'dateTimeFormat',
                        type: 'TEXT',
                        configuration: {
                          placeholder: 'dd/MM/yyyy HH:mm:ss',
                          condition: {
                            type: 'SHOW',
                            option: 'type',
                            comparator: 'EQ',
                            value: 'datetime',
                          },
                        },
                      },
                      {
                        value: true,
                        label: 'Use 24-hour format',
                        key: 'use24HourClockTime',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'type',
                            comparator: 'EQ',
                            value: 'time',
                          },
                        },
                      },
                      {
                        value: true,
                        label: 'Use 24-hour format',
                        key: 'use24HourClockDateTime',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'type',
                            comparator: 'EQ',
                            value: 'datetime',
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Error',
                        key: 'error',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'inline',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Dialog', value: 'dialog' },
                            { name: 'Inline', value: 'inline' },
                            { name: 'Static', value: 'static' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Clearable',
                        key: 'clearable',
                        value: false,
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'variant',
                            comparator: 'EQ',
                            value: 'dialog',
                          },
                        },
                      },
                      {
                        label: 'Input Variant',
                        key: 'inputvariant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color popup',
                        key: 'backgroundColorPopup',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['DateTimePicker'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'TIME': {
                  return {
                    name: 'DateTimePicker',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        label: 'Type',
                        key: 'type',
                        value: 'time',
                        type: 'TEXT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'customModelAttribute',
                            comparator: 'EQ',
                            value: false,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disable Toolbar',
                        key: 'disableToolbar',
                        value: false,
                      },
                      {
                        value: 'HH:mm:ss',
                        label: 'Format',
                        key: 'timeFormat',
                        type: 'TEXT',
                      },
                      {
                        value: true,
                        label: 'Use 24-hour format',
                        key: 'use24HourClockTime',
                        type: 'TOGGLE',
                      },
                      {
                        value: false,
                        label: 'Error',
                        key: 'error',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'inline',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Dialog', value: 'dialog' },
                            { name: 'Inline', value: 'inline' },
                            { name: 'Static', value: 'static' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Clearable',
                        key: 'clearable',
                        value: false,
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'variant',
                            comparator: 'EQ',
                            value: 'dialog',
                          },
                        },
                      },
                      {
                        label: 'Input Variant',
                        key: 'inputvariant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color popup',
                        key: 'backgroundColorPopup',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['DateTimePicker'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'FILE':
                case 'IMAGE': {
                  return {
                    name: 'FileUpload',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['file'],
                        },
                      },
                      {
                        value: false,
                        label: 'Hide default error',
                        key: 'hideDefaultError',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        value: ['image/*'],
                        label: 'Accept files',
                        key: 'accept',
                        type: 'VARIABLE',
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Allow multiple',
                        key: 'multiple',
                        value: false,
                      },
                      {
                        label: 'Button size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Large', value: 'large' },
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Button text color',
                        key: 'buttonTextColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Button color',
                        key: 'background',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['FileUpload'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [
                      {
                        name: 'Button',
                        options: [
                          {
                            label: 'Toggle visibility',
                            key: 'visible',
                            value: true,
                            type: 'TOGGLE',
                            configuration: {
                              as: 'VISIBILITY',
                            },
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Button text',
                            key: 'buttonText',
                            value: ['Upload'],
                          },
                          {
                            value: true,
                            label: 'Full width',
                            key: 'fullWidth',
                            type: 'TOGGLE',
                          },
                          {
                            label: 'Icon',
                            key: 'icon',
                            value: 'None',
                            type: 'ICON',
                          },
                          {
                            value: 'small',
                            label: 'Icon size',
                            key: 'size',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                                { name: 'Large', value: 'large' },
                              ],
                              condition: {
                                type: 'HIDE',
                                option: 'icon',
                                comparator: 'EQ',
                                value: 'None',
                              },
                            },
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Icon position',
                            key: 'iconPosition',
                            value: 'start',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Start', value: 'start' },
                                { name: 'End', value: 'end' },
                              ],
                              condition: {
                                type: 'HIDE',
                                option: 'icon',
                                comparator: 'EQ',
                                value: 'None',
                              },
                            },
                          },
                          {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                            label: 'Outer space',
                            key: 'outerSpacing',
                            type: 'SIZES',
                          },
                          {
                            label: 'Disabled',
                            key: 'disabled',
                            value: false,
                            type: 'TOGGLE',
                          },
                          {
                            label: 'Add Tooltip',
                            key: 'addTooltip',
                            value: false,
                            type: 'TOGGLE',
                          },
                          {
                            label: 'Toggle tooltip visibility',
                            key: 'hasVisibleTooltip',
                            value: true,
                            type: 'TOGGLE',
                            configuration: {
                              as: 'VISIBILITY',
                              condition: {
                                type: 'SHOW',
                                option: 'addTooltip',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Tooltip Content',
                            key: 'tooltipContent',
                            value: ['Tips'],
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'addTooltip',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            label: 'Tooltip Placement',
                            key: 'tooltipPlacement',
                            value: 'bottom',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Top Start',
                                  value: 'top-start',
                                },
                                {
                                  name: 'Top',
                                  value: 'top',
                                },
                                {
                                  name: 'Top End',
                                  value: 'top-end',
                                },
                                {
                                  name: 'Right',
                                  value: 'right',
                                },
                                {
                                  name: 'Left',
                                  value: 'left',
                                },
                                {
                                  name: 'Botttom Start',
                                  value: 'bottom-start',
                                },
                                {
                                  name: 'Bottom',
                                  value: 'bottom',
                                },
                                {
                                  name: 'Bottom End',
                                  value: 'bottom-end',
                                },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'addTooltip',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'COLOR',
                            label: 'Tooltip Background',
                            key: 'tooltipBackground',
                            value: 'Medium',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'addTooltip',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'COLOR',
                            label: 'Tooltip Text',
                            key: 'tooltipText',
                            value: 'Black',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'addTooltip',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: false,
                            label: 'Advanced settings',
                            key: 'advancedSettings',
                            type: 'TOGGLE',
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Test attribute',
                            key: 'dataComponentAttribute',
                            value: ['Button'],
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'advancedSettings',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                        ],
                        descendants: [],
                      },
                    ],
                  };
                }
                case 'BOOLEAN': {
                  return {
                    name: 'Checkbox',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['boolean'],
                        },
                      },
                      {
                        label: 'Label Position',
                        key: 'position',
                        value: 'end',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                            { name: 'Top', value: 'top' },
                            { name: 'Bottom', value: 'bottom' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Checkbox color',
                        key: 'checkboxColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Checkbox color checked',
                        key: 'checkboxColorChecked',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['Checkbox'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                case 'LIST': {
                  return {
                    name: 'Select',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        value: [''],
                        label: 'Blank option',
                        key: 'blanco',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Option type',
                        key: 'optionType',
                        value: 'static',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Static', value: 'static' },
                            { name: 'Model', value: 'model' },
                            { name: 'Property', value: 'property' },
                          ],
                        },
                      },
                      {
                        value: property.id,
                        label: 'Property',
                        key: 'property',
                        type: 'PROPERTY',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'property',
                          },
                        },
                      },
                      {
                        type: 'MODEL',
                        label: 'Model',
                        key: 'model',
                        value: '',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        value: {},
                        label: 'Filter',
                        key: 'filter',
                        type: 'FILTER',
                        configuration: {
                          dependsOn: 'model',
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        type: 'PROPERTY',
                        label: 'Order by',
                        key: 'orderBy',
                        value: '',
                        configuration: {
                          dependsOn: 'model',
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Sort order',
                        key: 'order',
                        value: 'asc',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          condition: {
                            type: 'HIDE',
                            option: 'orderBy',
                            comparator: 'EQ',
                            value: '',
                          },
                          allowedInput: [
                            { name: 'Ascending', value: 'asc' },
                            { name: 'Descending', value: 'desc' },
                          ],
                        },
                      },
                      {
                        type: 'PROPERTY',
                        label: 'Property',
                        key: 'labelProperty',
                        value: '',
                        configuration: {
                          dependsOn: 'model',
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        value: '',
                        label: 'Value property',
                        key: 'valueProperty',
                        type: 'PROPERTY',
                        configuration: {
                          dependsOn: 'model',
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        value: 'built-in',
                        label: 'Error message',
                        key: 'showError',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Built in', value: 'built-in' },
                            { name: 'Interaction', value: 'interaction' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'model',
                          },
                        },
                      },
                      {
                        type: 'TEXT',
                        label: 'Options',
                        key: 'selectOptions',
                        value: 'a\nb\nc',
                        configuration: {
                          as: 'MULTILINE',
                          condition: {
                            type: 'SHOW',
                            option: 'optionType',
                            comparator: 'EQ',
                            value: 'static',
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Standard', value: 'standard' },
                            { name: 'Outlined', value: 'outlined' },
                            { name: 'Filled', value: 'filled' },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Medium', value: 'medium' },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            { name: 'Normal', value: 'normal' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['Select'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
                }
                default:
                  return {
                    name: 'TextField',
                    options: [
                      {
                        value: {
                          label: [property.label],
                          value: [
                            {
                              id: property.id,
                              type: property.type,
                            },
                          ],
                          propertyIds: property.id,
                          ref: {
                            id: `#attribute_${property.id[0]}`,
                          },
                        },
                        label: 'Label',
                        key: 'customModelAttribute',
                        type: 'CUSTOM_MODEL_ATTRIBUTE',
                        configuration: {
                          allowedTypes: ['string'],
                        },
                      },
                      {
                        value: false,
                        label: 'Validation options',
                        key: 'validationOptions',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Validation pattern',
                        key: 'pattern',
                        value: '',
                        type: 'TEXT',
                        configuration: {
                          placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Min length',
                        key: 'minlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        label: 'Max length',
                        key: 'maxlength',
                        value: '',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This field is required'],
                        label: 'Value required message',
                        key: 'validationValueMissing',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['Invalid value'],
                        label: 'Pattern mismatch message',
                        key: 'validationPatternMismatch',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too short'],
                        label: 'Value too short message',
                        key: 'validationTooShort',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: ['This value is too long'],
                        label: 'Value too long message',
                        key: 'validationTooLong',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'validationOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Disabled',
                        key: 'disabled',
                        value: false,
                      },
                      {
                        value: [],
                        label: 'Placeholder',
                        key: 'placeholder',
                        type: 'VARIABLE',
                      },
                      {
                        value: [],
                        label: 'Helper text',
                        key: 'helperText',
                        type: 'VARIABLE',
                      },
                      {
                        label: 'Variant',
                        key: 'variant',
                        value: 'outlined',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Standard',
                              value: 'standard',
                            },
                            {
                              name: 'Outlined',
                              value: 'outlined',
                            },
                            {
                              name: 'Filled',
                              value: 'filled',
                            },
                          ],
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Full width',
                        key: 'fullWidth',
                        value: true,
                      },
                      {
                        label: 'Size',
                        key: 'size',
                        value: 'medium',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            {
                              name: 'Medium',
                              value: 'medium',
                            },
                            { name: 'Small', value: 'small' },
                          ],
                        },
                      },
                      {
                        label: 'Margin',
                        key: 'margin',
                        value: 'normal',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Dense', value: 'dense' },
                            {
                              name: 'Normal',
                              value: 'normal',
                            },
                          ],
                        },
                      },
                      {
                        label: 'Adornment',
                        key: 'adornmentIcon',
                        value: 'none',
                        type: 'ICON',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Position',
                        key: 'adornmentPosition',
                        value: 'start',
                        configuration: {
                          condition: {
                            type: 'HIDE',
                            option: 'adornmentIcon',
                            comparator: 'EQ',
                            value: '',
                          },
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Background color',
                        key: 'backgroundColor',
                        value: 'White',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color',
                        key: 'borderColor',
                        value: 'Accent1',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (hover)',
                        key: 'borderHoverColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Border color (focus)',
                        key: 'borderFocusColor',
                        value: 'Primary',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Hide label',
                        key: 'hideLabel',
                        type: 'TOGGLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Label color',
                        key: 'labelColor',
                        value: 'Accent3',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Placeholder color',
                        key: 'placeholderColor',
                        value: 'Light',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Helper color',
                        key: 'helperColor',
                        value: 'Accent2',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'COLOR',
                        label: 'Error color',
                        key: 'errorColor',
                        value: 'Danger',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Advanced settings',
                        key: 'advancedSettings',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'VARIABLE',
                        label: 'name attribute',
                        key: 'nameAttribute',
                        value: [],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'VARIABLE',
                        label: 'Test attribute',
                        key: 'dataComponentAttribute',
                        value: ['TextField'],
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'advancedSettings',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  };
              }
            });

            const alertSuccessDescendant = [
              {
                name: 'Alert',
                ref: {
                  id: '#alertSuccessId',
                },
                options: [
                  {
                    value: false,
                    label: 'Toggle visibility',
                    key: 'visible',
                    type: 'TOGGLE',
                    configuration: {
                      as: 'VISIBILITY',
                    },
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Body text',
                    key: 'bodyText',
                    value: ['Record successfully updated'],
                    configuration: {
                      dependsOn: 'model',
                    },
                  },
                  {
                    label: 'Allow to overwrite by the server response',
                    key: 'allowTextServerResponse',
                    value: false,
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Title text',
                    key: 'titleText',
                    value: ['Success'],
                  },
                  {
                    label: 'Allow to overwrite by the server response',
                    key: 'allowTitleServerResponse',
                    value: false,
                    type: 'TOGGLE',
                  },
                  {
                    value: 'White',
                    label: 'Text color',
                    key: 'textColor',
                    type: 'COLOR',
                  },
                  {
                    value: 'White',
                    label: 'Icon color',
                    key: 'iconColor',
                    type: 'COLOR',
                  },
                  {
                    value: 'Success',
                    label: 'Background color',
                    key: 'background',
                    type: 'COLOR',
                  },
                  {
                    value: 'Transparent',
                    label: 'Border color',
                    key: 'borderColor',
                    type: 'COLOR',
                  },
                  {
                    label: 'Icon',
                    key: 'icon',
                    value: 'CheckCircle',
                    type: 'ICON',
                  },
                  {
                    value: true,
                    label: 'Collapsable',
                    key: 'collapsable',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Horizontal Alignment',
                    key: 'horizontalAlignment',
                    value: 'flex-start',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Left', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'flex-end' },
                      ],
                      condition: {
                        type: 'HIDE',
                        option: 'collapsable',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Vertical Alignment',
                    key: 'verticalAlignment',
                    value: 'stretch',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Top', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Bottom', value: 'flex-end' },
                        { name: 'Justified', value: 'stretch' },
                      ],
                    },
                  },
                  {
                    value: ['0rem', '0rem', 'M', '0rem'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    value: false,
                    label: 'Advanced settings',
                    key: 'advancedSettings',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Test attribute',
                    key: 'dataComponentAttribute',
                    value: ['Alert'],
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'advancedSettings',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                ],
                descendants: [],
              },
            ];

            const alertErrorDescendant = [
              {
                name: 'Alert',
                ref: {
                  id: '#alertErrorId',
                },
                options: [
                  {
                    value: false,
                    label: 'Toggle visibility',
                    key: 'visible',
                    type: 'TOGGLE',
                    configuration: {
                      as: 'VISIBILITY',
                    },
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Body text',
                    key: 'bodyText',
                    value: ['*Dynamic value from the Action response*'],
                    configuration: {
                      dependsOn: 'model',
                    },
                  },
                  {
                    label: 'Allow to overwrite by the server response',
                    key: 'allowTextServerResponse',
                    value: true,
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Title text',
                    key: 'titleText',
                    value: ['Error'],
                  },
                  {
                    label: 'Allow to overwrite by the server response',
                    key: 'allowTitleServerResponse',
                    value: false,
                    type: 'TOGGLE',
                  },
                  {
                    value: 'White',
                    label: 'Text color',
                    key: 'textColor',
                    type: 'COLOR',
                  },
                  {
                    value: 'White',
                    label: 'Icon color',
                    key: 'iconColor',
                    type: 'COLOR',
                  },
                  {
                    value: 'Danger',
                    label: 'Background color',
                    key: 'background',
                    type: 'COLOR',
                  },
                  {
                    value: 'Transparent',
                    label: 'Border color',
                    key: 'borderColor',
                    type: 'COLOR',
                  },
                  {
                    label: 'Icon',
                    key: 'icon',
                    value: 'Error',
                    type: 'ICON',
                  },
                  {
                    value: true,
                    label: 'Collapsable',
                    key: 'collapsable',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Horizontal Alignment',
                    key: 'horizontalAlignment',
                    value: 'flex-start',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Left', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'flex-end' },
                      ],
                      condition: {
                        type: 'HIDE',
                        option: 'collapsable',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Vertical Alignment',
                    key: 'verticalAlignment',
                    value: 'stretch',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Top', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Bottom', value: 'flex-end' },
                        { name: 'Justified', value: 'stretch' },
                      ],
                    },
                  },
                  {
                    value: ['0rem', '0rem', 'M', '0rem'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    value: false,
                    label: 'Advanced settings',
                    key: 'advancedSettings',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Test attribute',
                    key: 'dataComponentAttribute',
                    value: ['Alert'],
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'advancedSettings',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                ],
                descendants: [],
              },
            ];

            const titleDescendant = [
              {
                name: 'Text',
                options: [
                  {
                    type: 'VARIABLE',
                    label: 'Content',
                    key: 'content',
                    value: ['Update record'],
                    configuration: {
                      as: 'MULTILINE',
                    },
                  },
                  {
                    value: 'Title2',
                    label: 'Type',
                    key: 'type',
                    type: 'FONT',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Text Alignment',
                    key: 'textAlignment',
                    value: 'left',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Left', value: 'left' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'right' },
                      ],
                    },
                  },
                  {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    value: false,
                    label: 'Styles',
                    key: 'styles',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'COLOR',
                    label: 'Text color',
                    key: 'textColor',
                    value: 'Black',
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'styles',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Font weight',
                    key: 'fontWeight',
                    value: '400',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: '100', value: '100' },
                        { name: '200', value: '200' },
                        { name: '300', value: '300' },
                        { name: '400', value: '400' },
                        { name: '500', value: '500' },
                        { name: '600', value: '600' },
                        { name: '700', value: '700' },
                        { name: '800', value: '800' },
                        { name: '900', value: '900' },
                      ],
                      condition: {
                        type: 'SHOW',
                        option: 'styles',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                  {
                    value: false,
                    label: 'Advanced settings',
                    key: 'advancedSettings',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Test attribute',
                    key: 'dataComponentAttribute',
                    value: ['Text'],
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'advancedSettings',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                ],
                descendants: [],
              },
            ];

            newPrefab.structure[0].descendants = [
              ...titleDescendant,
              ...alertSuccessDescendant,
              ...alertErrorDescendant,
              ...descendantsArray,
              ...newPrefab.structure[0].descendants,
            ];

            save(newPrefab);
          }}
        />
      </>
    );
  },
  variables: [
    {
      kind: 'construct',
      name: 'form_data',
      ref: {
        id: '#customModelVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
        ref: {
          customModelId: '#customModelId',
        },
      },
    },
    {
      kind: 'object',
      name: 'form_object',
      ref: {
        id: '#objectVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
      },
    },
  ],
  actions: [
    {
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'update',
          options: {
            ref: {
              object: '#objectVariableId',
            },
            assign: [],
          },
        },
      ],
    },
  ],
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'onActionError',
      ref: {
        targetComponentId: '#alertErrorId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#alertSuccessId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#btnId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onActionDone',
      ref: {
        targetComponentId: '#btnId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#alertSuccessId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#alertErrorId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
  ],
  structure: [
    {
      name: 'Form',
      ref: {
        id: '#formId',
      },
      options: [
        {
          value: {
            modelId: '',
            ref: {
              customModelId: '#customModelId',
              actionId: '#actionId',
              variableId: '#customModelVariableId',
              objectVariableId: '#objectVariableId',
            },
          },
          label: 'Action',
          key: 'formData',
          type: 'FORM_DATA',
          configuration: {
            apiVersion: 'v1',
          },
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'formData',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: 'interaction',
          label: 'Success message',
          key: 'showSuccess',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          value: 'Thanks for submitting the form!',
          label: 'Success message',
          key: 'formSuccessMessage',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showSuccess',
              comparator: 'EQ',
              value: 'built-in',
            },
          },
        },
        {
          value: 'interaction',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          value: 'Failed to submit the form!',
          label: 'Error message',
          key: 'formErrorMessage',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'showError',
              comparator: 'EQ',
              value: 'built-in',
            },
          },
        },
        {
          value: 'default',
          label: 'Show on load',
          key: 'loadingType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Message', value: 'default' },
              { name: 'Content', value: 'showChildren' },
            ],
          },
        },
        {
          value: ['Loading...'],
          label: 'Loading text',
          key: 'loadingText',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'loadingType',
              comparator: 'EQ',
              value: 'default',
            },
          },
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: '',
          label: 'Redirect after succesful submit',
          key: 'redirect',
          type: 'ENDPOINT',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Form'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [
        {
          name: 'Box',
          options: [
            {
              value: 'flex-start',
              label: 'Alignment',
              key: 'alignment',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'none' },
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                  { name: 'Justified', value: 'space-between' },
                ],
              },
            },
            {
              value: false,
              label: 'Stretch (when in flex container)',
              key: 'stretch',
              type: 'TOGGLE',
            },
            {
              value: false,
              label: 'Transparent',
              key: 'transparent',
              type: 'TOGGLE',
            },
            {
              type: 'SIZE',
              label: 'Height',
              key: 'height',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Inner space',
              key: 'innerSpacing',
              type: 'SIZES',
            },
            {
              value: false,
              label: 'Show positioning options',
              key: 'positioningOptions',
              type: 'TOGGLE',
            },
            {
              value: 'static',
              label: 'Position',
              key: 'position',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Static', value: 'static' },
                  { name: 'Relative', value: 'relative' },
                  { name: 'Absolute', value: 'absolute' },
                  { name: 'Fixed', value: 'fixed' },
                  { name: 'Sticky', value: 'sticky' },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'positioningOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Top position',
              key: 'top',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'positioningOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Right position',
              key: 'right',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'positioningOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Bottom position',
              key: 'bottom',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'positioningOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Left position',
              key: 'left',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'positioningOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: false,
              label: 'Show background options',
              key: 'backgroundOptions',
              type: 'TOGGLE',
            },
            {
              value: 'Transparent',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: 100,
              label: 'Background color opacity',
              key: 'backgroundColorAlpha',
              type: 'NUMBER',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: [''],
              label: 'Background url',
              key: 'backgroundUrl',
              type: 'VARIABLE',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: 'initial',
              label: 'Background size',
              key: 'backgroundSize',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Initial', value: 'initial' },
                  { name: 'Contain', value: 'contain' },
                  { name: 'Cover', value: 'cover' },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: 'no-repeat',
              label: 'Background repeat',
              key: 'backgroundRepeat',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'no-repeat' },
                  { name: 'X', value: 'repeat-x' },
                  { name: 'Y', value: 'repeat-y' },
                  { name: 'All', value: 'repeat' },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: 'Transparent',
              label: 'Border color',
              key: 'borderColor',
              type: 'COLOR',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Border thickness',
              key: 'borderWidth',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: 'solid',
              label: 'Border style',
              key: 'borderStyle',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'none' },
                  { name: 'Solid', value: 'solid' },
                  { name: 'Dashed', value: 'dashed' },
                  { name: 'Dotted', value: 'dotted' },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Border radius',
              key: 'borderRadius',
              value: '',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'backgroundOptions',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              value: false,
              label: 'Advanced settings',
              key: 'advancedSettings',
              type: 'TOGGLE',
            },
            {
              type: 'VARIABLE',
              label: 'Test attribute',
              key: 'dataComponentAttribute',
              value: ['Box'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'advancedSettings',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
          ],
          descendants: [
            {
              name: 'Button',
              ref: {
                id: '#btnId',
              },
              options: [
                {
                  label: 'Toggle visibility',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'type',
                  key: 'type',
                  value: 'submit',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Submit', value: 'submit' },
                      { name: 'Reset', value: 'reset' },
                    ],
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Send'],
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
                },
                {
                  label: 'Icon',
                  key: 'icon',
                  value: 'None',
                  type: 'ICON',
                },
                {
                  value: 'small',
                  label: 'Icon size',
                  key: 'size',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Large', value: 'large' },
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
                    ],
                    condition: {
                      type: 'HIDE',
                      option: 'icon',
                      comparator: 'EQ',
                      value: 'None',
                    },
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'Icon position',
                  key: 'iconPosition',
                  value: 'start',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    condition: {
                      type: 'HIDE',
                      option: 'icon',
                      comparator: 'EQ',
                      value: 'None',
                    },
                    allowedInput: [
                      { name: 'Start', value: 'start' },
                      { name: 'End', value: 'end' },
                    ],
                  },
                },
                {
                  value: ['0rem', 'M', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                  type: 'TOGGLE',
                },
                {
                  label: 'Add Tooltip',
                  key: 'addTooltip',
                  value: false,
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                  },
                },
                {
                  label: 'Toggle tooltip visibility',
                  key: 'hasVisibleTooltip',
                  value: true,
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                    condition: {
                      type: 'SHOW',
                      option: 'addTooltip',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Tooltip Content',
                  key: 'tooltipContent',
                  value: ['Tips'],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'addTooltip',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  label: 'Tooltip Placement',
                  key: 'tooltipPlacement',
                  value: 'bottom',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Top Start',
                        value: 'top-start',
                      },
                      {
                        name: 'Top',
                        value: 'top',
                      },
                      {
                        name: 'Top End',
                        value: 'top-end',
                      },
                      {
                        name: 'Right',
                        value: 'right',
                      },
                      {
                        name: 'Left',
                        value: 'left',
                      },
                      {
                        name: 'Botttom Start',
                        value: 'bottom-start',
                      },
                      {
                        name: 'Bottom',
                        value: 'bottom',
                      },
                      {
                        name: 'Bottom End',
                        value: 'bottom-end',
                      },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'addTooltip',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Tooltip Background',
                  key: 'tooltipBackground',
                  value: 'Medium',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'addTooltip',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Tooltip Text',
                  key: 'tooltipText',
                  value: 'Black',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'addTooltip',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: false,
                  label: 'Advanced settings',
                  key: 'advancedSettings',
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Test attribute',
                  key: 'dataComponentAttribute',
                  value: ['Button'],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'advancedSettings',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
