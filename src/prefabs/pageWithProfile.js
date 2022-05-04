(() => ({
  name: 'Profile details',
  icon: 'NavbarIcon',
  type: 'page',
  description: 'Page with profile details',
  detail: 'Bla bla bla bla',
  previewUrl: 'https://preview.betty.app/header-and-footer',
  previewImage:
    'https://www.cdn-2.discus.nl/image/aa48bb3d-d088-4d47-8aba-a81245a4af84/6ab9ff80-de7a-11e7-8c26-88a08bd89a7b/false/jongenmetpoesje.jpg?rev=1588857951&widthParam=1002&heightParam=564&extension=webp',
  category: 'LAYOUT',
  beforeCreate: ({
    helpers: { useModelQuery, camelToSnakeCase },
    prefab,
    save,
    close,
    components: {
      Header,
      Content,
      Footer,
      Field,
      Text,
      Box,
      CheckBox,
      AuthenticationProfileSelector,
      PropertySelector,
      PropertiesSelector,
    },
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [profileProperties, setProfileProperties] = React.useState([]);
    const [passwordProperty, setPasswordProperty] = React.useState('');
    const [validationMessage, setValidationMessage] = React.useState('');
    const [loggedInUserState, setLoggedInUserState] = React.useState({
      authenticationProfile: null,
    });
    const [hasProfilePictureProperty, setHasProfilePictureProperty] =
      React.useState(false);
    const [profilePictureProperty, setProfilePictureProperty] =
      React.useState('');
    const [profileNameProperty, setProfileNameProperty] = React.useState('');
    const passwordFieldsLabels = [
      'Current password',
      'New password',
      'Confirm password',
    ];

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    const enrichVarObj = (obj, authProp = false) => {
      const returnObj = obj;
      if (data && data.model) {
        const property = data.model.properties.find(
          (prop) => prop.id === obj.id[0],
        );
        if (property) {
          returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
          if (authProp) {
            returnObj.type = 'ME_PROPERTY';
          }
        }
      }
      return returnObj;
    };

    const enrichPasswordProp = (passwordProp) => {
      const returnObj = passwordProp;
      returnObj.type = 'PROPERTY';
      returnObj.id = [passwordProp.id];
      return returnObj;
    };

    const getDescendantByRef = (refValue, structure) =>
      structure.reduce((acc, component) => {
        if (acc) return acc;
        if (
          // eslint-disable-next-line no-prototype-builtins
          component.hasOwnProperty('ref') &&
          Object.values(component.ref).indexOf(refValue) > -1
        ) {
          return component;
        }
        return getDescendantByRef(refValue, component.descendants);
      }, null);

    const inputBox = (property, label = null) => {
      const input = () => {
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                    label: label ? [label] : [property.label],
                    value: label
                      ? []
                      : [
                          {
                            id: property.id,
                            type: property.type,
                          },
                        ],
                    propertyIds: property.id,
                    ref: {
                      id: label
                        ? `#attribute_${property.id[0]}_${camelToSnakeCase(
                            label,
                          )}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  label: 'Margin',
                  key: 'margin',
                  value: 'none',
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
                  value: true,
                  label: 'Styles',
                  key: 'styles',
                  type: 'TOGGLE',
                },
                {
                  value: true,
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
                  style: {
                    overwrite: {
                      backgroundColor: {
                        type: 'THEME_COLOR',
                        value: 'primary',
                      },
                      boxShadow: 'none',
                      color: {
                        type: 'THEME_COLOR',
                        value: 'white',
                      },
                      fontFamily: 'Roboto',
                      fontSize: '0.875rem',
                      fontStyle: 'none',
                      fontWeight: '400',
                      padding: ['0.6875rem', '1.375rem'],
                      textDecoration: 'none',
                      textTransform: 'none',
                    },
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
                      type: 'VARIABLE',
                      label: 'Button text',
                      key: 'buttonText',
                      value: ['Upload'],
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  type: 'MODEL_AND_RELATION',
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
                    apiVersion: 'v1',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
                      id: label
                        ? `#attribute_${property.id[0]}_${label}`
                        : `#attribute_${property.id[0]}`,
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
                  value: true,
                  label: 'Spellcheck',
                  key: 'spellCheck',
                  type: 'TOGGLE',
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
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
                  value: 'none',
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
                  value: true,
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
                  value: true,
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
      };
      const inputStructure = {
        name: 'Box',
        options: [
          {
            value: 'none',
            label: 'Alignment',
            key: 'alignment',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                {
                  name: 'None',
                  value: 'none',
                },
                {
                  name: 'Left',
                  value: 'flex-start',
                },
                {
                  name: 'Center',
                  value: 'center',
                },
                {
                  name: 'Right',
                  value: 'flex-end',
                },
                {
                  name: 'Justified',
                  value: 'space-between',
                },
              ],
            },
          },
          {
            value: 'none',
            label: 'Vertical alignment',
            key: 'valignment',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                {
                  name: 'None',
                  value: 'none',
                },
                {
                  name: 'Top',
                  value: 'flex-start',
                },
                {
                  name: 'Center',
                  value: 'center',
                },
                {
                  name: 'Bottom',
                  value: 'flex-end',
                },
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
            value: ['M', '0rem', '0rem', '0rem'],
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
                {
                  name: 'Static',
                  value: 'static',
                },
                {
                  name: 'Relative',
                  value: 'relative',
                },
                {
                  name: 'Absolute',
                  value: 'absolute',
                },
                {
                  name: 'Fixed',
                  value: 'fixed',
                },
                {
                  name: 'Sticky',
                  value: 'sticky',
                },
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
                {
                  name: 'Initial',
                  value: 'initial',
                },
                {
                  name: 'Contain',
                  value: 'contain',
                },
                {
                  name: 'Cover',
                  value: 'cover',
                },
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
            value: 'center center',
            label: 'Background position',
            key: 'backgroundPosition',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                {
                  name: 'Left top',
                  value: 'left top',
                },
                {
                  name: 'Left center',
                  value: 'left center',
                },
                {
                  name: 'Left bottom',
                  value: 'left bottom',
                },
                {
                  name: 'Center top',
                  value: 'center top',
                },
                {
                  name: 'Center center',
                  value: 'center center',
                },
                {
                  name: 'Center bottom',
                  value: 'center bottom',
                },
                {
                  name: 'Right top',
                  value: 'right top',
                },
                {
                  name: 'Right center',
                  value: 'right center',
                },
                {
                  name: 'Right bottom',
                  value: 'right bottom',
                },
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
                {
                  name: 'None',
                  value: 'no-repeat',
                },
                {
                  name: 'X',
                  value: 'repeat-x',
                },
                {
                  name: 'Y',
                  value: 'repeat-y',
                },
                {
                  name: 'All',
                  value: 'repeat',
                },
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
            value: 'inherit',
            label: 'Background attachment',
            key: 'backgroundAttachment',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                {
                  name: 'Inherit',
                  value: 'inherit',
                },
                {
                  name: 'Scroll',
                  value: 'scroll',
                },
                {
                  name: 'Fixed',
                  value: 'fixed',
                },
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
                {
                  name: 'None',
                  value: 'none',
                },
                {
                  name: 'Solid',
                  value: 'solid',
                },
                {
                  name: 'Dashed',
                  value: 'dashed',
                },
                {
                  name: 'Dotted',
                  value: 'dotted',
                },
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
            name: 'Text',
            options: [
              {
                type: 'VARIABLE',
                label: 'Content',
                key: 'content',
                value: label ? [label] : [property.label],
                configuration: {
                  as: 'MULTILINE',
                },
              },
              {
                type: 'TOGGLE',
                label: 'Display Rich Text',
                key: 'useInnerHtml',
                value: false,
              },
              {
                value: 'Body1',
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
                    {
                      name: 'Left',
                      value: 'left',
                    },
                    {
                      name: 'Center',
                      value: 'center',
                    },
                    {
                      name: 'Right',
                      value: 'right',
                    },
                  ],
                },
              },
              {
                value: ['0rem', '0rem', 'S', '0rem'],
                label: 'Outer space',
                key: 'outerSpacing',
                type: 'SIZES',
              },
              {
                type: 'CUSTOM',
                label: 'Link to',
                key: 'linkType',
                value: 'internal',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Internal page',
                      value: 'internal',
                    },
                    {
                      name: 'External page',
                      value: 'external',
                    },
                  ],
                },
              },
              {
                value: '_self',
                label: 'Open in',
                key: 'linkTarget',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Current Tab',
                      value: '_self',
                    },
                    {
                      name: 'New Tab',
                      value: '_blank',
                    },
                  ],
                },
              },
              {
                value: '',
                label: 'Page',
                key: 'linkTo',
                type: 'ENDPOINT',
                configuration: {
                  condition: {
                    type: 'SHOW',
                    option: 'linkType',
                    comparator: 'EQ',
                    value: 'internal',
                  },
                },
              },
              {
                value: [''],
                label: 'URL',
                key: 'linkToExternal',
                type: 'VARIABLE',
                configuration: {
                  placeholder: 'Starts with https:// or http://',
                  condition: {
                    type: 'SHOW',
                    option: 'linkType',
                    comparator: 'EQ',
                    value: 'external',
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
                    {
                      name: '100',
                      value: '100',
                    },
                    {
                      name: '200',
                      value: '200',
                    },
                    {
                      name: '300',
                      value: '300',
                    },
                    {
                      name: '400',
                      value: '400',
                    },
                    {
                      name: '500',
                      value: '500',
                    },
                    {
                      name: '600',
                      value: '600',
                    },
                    {
                      name: '700',
                      value: '700',
                    },
                    {
                      name: '800',
                      value: '800',
                    },
                    {
                      name: '900',
                      value: '900',
                    },
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
          input(),
        ],
      };
      return inputStructure;
    };

    const editProfileDetailsForm = {
      name: 'Form',
      ref: {
        id: '#editProfileDetailsForm',
      },
      options: [
        {
          value: {
            modelId,
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
          value: modelId,
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
              {
                name: 'Built in',
                value: 'built-in',
              },
              {
                name: 'Interaction',
                value: 'interaction',
              },
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
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Built in',
                value: 'built-in',
              },
              {
                name: 'Interaction',
                value: 'interaction',
              },
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
              {
                name: 'Message',
                value: 'default',
              },
              {
                name: 'Content',
                value: 'showChildren',
              },
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
      descendants: [],
    };

    const updatePasswordForm = {
      name: 'Form',
      ref: {
        id: '#updatePasswordForm',
      },
      options: [
        {
          value: {
            modelId,
            ref: {
              customModelId: '#updatePasswordCustomModelId',
              actionId: '#updatePasswordActionId',
              variableId: '#updatePasswordModelVariableId',
              objectVariableId: '#updatePasswordVariableId',
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
          value: modelId,
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
              {
                name: 'Built in',
                value: 'built-in',
              },
              {
                name: 'Interaction',
                value: 'interaction',
              },
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
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Built in',
                value: 'built-in',
              },
              {
                name: 'Interaction',
                value: 'interaction',
              },
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
              {
                name: 'Message',
                value: 'default',
              },
              {
                name: 'Content',
                value: 'showChildren',
              },
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
      descendants: [],
    };

    const submitButton = (label, id) => ({
      name: 'Box',
      options: [
        {
          value: 'flex-end',
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
          value: 'none',
          label: 'Vertical alignment',
          key: 'valignment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Top', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Bottom', value: 'flex-end' },
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
          value: ['M', '0rem', '0rem', '0rem'],
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
          value: 'center center',
          label: 'Background position',
          key: 'backgroundPosition',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Left top', value: 'left top' },
              { name: 'Left center', value: 'left center' },
              { name: 'Left bottom', value: 'left bottom' },
              { name: 'Center top', value: 'center top' },
              { name: 'Center center', value: 'center center' },
              { name: 'Center bottom', value: 'center bottom' },
              { name: 'Right top', value: 'right top' },
              { name: 'Right center', value: 'right center' },
              { name: 'Right bottom', value: 'right bottom' },
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
          value: 'inherit',
          label: 'Background attachment',
          key: 'backgroundAttachment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Inherit', value: 'inherit' },
              { name: 'Scroll', value: 'scroll' },
              { name: 'Fixed', value: 'fixed' },
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
            id,
          },
          style: {
            overwrite: {
              backgroundColor: {
                type: 'THEME_COLOR',
                value: 'primary',
              },
              boxShadow: 'none',
              color: {
                type: 'THEME_COLOR',
                value: 'white',
              },
              fontFamily: 'Roboto',
              fontSize: '0.875rem',
              fontStyle: 'none',
              fontWeight: '400',
              padding: ['0.6875rem', '1.375rem'],
              textDecoration: 'none',
              textTransform: 'none',
            },
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
                  {
                    name: 'Submit',
                    value: 'submit',
                  },
                  {
                    name: 'Reset',
                    value: 'reset',
                  },
                ],
              },
            },
            {
              type: 'VARIABLE',
              label: 'Button text',
              key: 'buttonText',
              value: [label],
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
              value: 'medium',
              label: 'Icon size',
              key: 'size',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Large',
                    value: 'large',
                  },
                  {
                    name: 'Medium',
                    value: 'medium',
                  },
                  {
                    name: 'Small',
                    value: 'small',
                  },
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
                  {
                    name: 'Start',
                    value: 'start',
                  },
                  {
                    name: 'End',
                    value: 'end',
                  },
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
    });

    const prefabStructure = [
      {
        name: 'Row',
        options: [
          {
            type: 'CUSTOM',
            label: 'Width',
            key: 'maxRowWidth',
            value: 'XL',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'S', value: 'S' },
                { name: 'M', value: 'M' },
                { name: 'L', value: 'L' },
                { name: 'XL', value: 'XL' },
                { name: 'Full', value: 'Full' },
              ],
            },
          },
          {
            value: '',
            label: 'Height',
            key: 'rowHeight',
            type: 'TEXT',
            configuration: {
              as: 'UNIT',
            },
          },
          {
            value: 'transparent',
            label: 'Background color',
            key: 'backgroundColor',
            type: 'COLOR',
          },
          {
            value: ['0rem', '0rem', '0rem', '0rem'],
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
            value: ['Row'],
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
            name: 'Column',
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
                value: 'flexible',
                label: 'Column width',
                key: 'columnWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              },
              {
                value: 'flexible',
                label: 'Column width (tablet landscape)',
                key: 'columnWidthTabletLandscape',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              },
              {
                value: 'flexible',
                label: 'Column width (tablet portrait)',
                key: 'columnWidthTabletPortrait',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              },
              {
                value: 'flexible',
                label: 'Column width (mobile)',
                key: 'columnWidthMobile',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              },
              {
                value: '',
                label: 'Height',
                key: 'columnHeight',
                type: 'TEXT',
                configuration: {
                  as: 'UNIT',
                },
              },
              {
                value: 'transparent',
                label: 'Background color',
                key: 'backgroundColor',
                type: 'COLOR',
              },
              {
                type: 'CUSTOM',
                label: 'Horizontal Alignment',
                key: 'horizontalAlignment',
                value: 'inherit',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'None', value: 'inherit' },
                    { name: 'Left', value: 'flex-start' },
                    { name: 'Center', value: 'center' },
                    { name: 'Right', value: 'flex-end' },
                  ],
                },
              },
              {
                type: 'CUSTOM',
                label: 'Vertical Alignment',
                key: 'verticalAlignment',
                value: 'inherit',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'None', value: 'inherit' },
                    { name: 'Top', value: 'flex-start' },
                    { name: 'Center', value: 'center' },
                    { name: 'Bottom', value: 'flex-end' },
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
                value: ['M', 'M', 'M', 'M'],
                label: 'Inner space',
                key: 'innerSpacing',
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
                value: ['Column'],
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
                name: 'Text',
                options: [
                  {
                    type: 'VARIABLE',
                    label: 'Content',
                    key: 'content',
                    value: ['My account'],
                    configuration: {
                      as: 'MULTILINE',
                    },
                  },
                  {
                    type: 'TOGGLE',
                    label: 'Display Rich Text',
                    key: 'useInnerHtml',
                    value: false,
                  },
                  {
                    value: 'Title4',
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
                    value: ['0rem', '0rem', 'M', 'M'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Link to',
                    key: 'linkType',
                    value: 'internal',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Internal page',
                          value: 'internal',
                        },
                        {
                          name: 'External page',
                          value: 'external',
                        },
                      ],
                    },
                  },
                  {
                    value: '_self',
                    label: 'Open in',
                    key: 'linkTarget',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Current Tab',
                          value: '_self',
                        },
                        { name: 'New Tab', value: '_blank' },
                      ],
                    },
                  },
                  {
                    value: '',
                    label: 'Page',
                    key: 'linkTo',
                    type: 'ENDPOINT',
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'linkType',
                        comparator: 'EQ',
                        value: 'internal',
                      },
                    },
                  },
                  {
                    value: [''],
                    label: 'URL',
                    key: 'linkToExternal',
                    type: 'VARIABLE',
                    configuration: {
                      placeholder: 'Starts with https:// or http://',
                      condition: {
                        type: 'SHOW',
                        option: 'linkType',
                        comparator: 'EQ',
                        value: 'external',
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
              {
                name: 'DataContainer',
                ref: {
                  id: '#authenticationDataContainer',
                },
                options: [
                  {
                    value: '',
                    label: 'Authentication Profile',
                    key: 'authProfile',
                    type: 'AUTHENTICATION_PROFILE',
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'model',
                        comparator: 'EQ',
                        value: '',
                      },
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
                        option: 'authProfile',
                        comparator: 'EQ',
                        value: '',
                      },
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
                    value: {},
                    label: 'Filter',
                    key: 'filter',
                    type: 'FILTER',
                    configuration: {
                      dependsOn: 'model',
                      condition: {
                        type: 'SHOW',
                        option: 'authProfile',
                        comparator: 'EQ',
                        value: '',
                      },
                    },
                  },
                  {
                    value: '',
                    label: 'Redirect when no result',
                    key: 'redirectWithoutResult',
                    type: 'ENDPOINT',
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
                        {
                          name: 'Built in',
                          value: 'built-in',
                        },
                        {
                          name: 'Interaction',
                          value: 'interaction',
                        },
                      ],
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
                        {
                          name: 'Content',
                          value: 'showChildren',
                        },
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
                    value: false,
                    label: 'Advanced settings',
                    key: 'advancedSettings',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Test attribute',
                    key: 'dataComponentAttribute',
                    value: ['DataContainer'],
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
                    name: 'Row',
                    options: [
                      {
                        type: 'CUSTOM',
                        label: 'Width',
                        key: 'maxRowWidth',
                        value: 'XL',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'S', value: 'S' },
                            { name: 'M', value: 'M' },
                            { name: 'L', value: 'L' },
                            { name: 'XL', value: 'XL' },
                            { name: 'Full', value: 'Full' },
                          ],
                        },
                      },
                      {
                        value: '',
                        label: 'Height',
                        key: 'rowHeight',
                        type: 'TEXT',
                        configuration: {
                          as: 'UNIT',
                        },
                      },
                      {
                        value: 'transparent',
                        label: 'Background color',
                        key: 'backgroundColor',
                        type: 'COLOR',
                      },
                      {
                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                        value: ['Row'],
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
                        name: 'Column',
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
                            value: '3',
                            label: 'Column width',
                            key: 'columnWidth',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '3',
                            label: 'Column width (tablet landscape)',
                            key: 'columnWidthTabletLandscape',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '12',
                            label: 'Column width (tablet portrait)',
                            key: 'columnWidthTabletPortrait',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '12',
                            label: 'Column width (mobile)',
                            key: 'columnWidthMobile',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '',
                            label: 'Height',
                            key: 'columnHeight',
                            type: 'TEXT',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            value: 'transparent',
                            label: 'Background color',
                            key: 'backgroundColor',
                            type: 'COLOR',
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Horizontal Alignment',
                            key: 'horizontalAlignment',
                            value: 'inherit',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'None',
                                  value: 'inherit',
                                },
                                {
                                  name: 'Left',
                                  value: 'flex-start',
                                },
                                {
                                  name: 'Center',
                                  value: 'center',
                                },
                                {
                                  name: 'Right',
                                  value: 'flex-end',
                                },
                              ],
                            },
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Vertical Alignment',
                            key: 'verticalAlignment',
                            value: 'inherit',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'None',
                                  value: 'inherit',
                                },
                                {
                                  name: 'Top',
                                  value: 'flex-start',
                                },
                                {
                                  name: 'Center',
                                  value: 'center',
                                },
                                {
                                  name: 'Bottom',
                                  value: 'flex-end',
                                },
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
                            value: ['M', 'M', 'M', 'M'],
                            label: 'Inner space',
                            key: 'innerSpacing',
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
                            value: ['Column'],
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
                                value: 'none',
                                label: 'Alignment',
                                key: 'alignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Left',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Right',
                                      value: 'flex-end',
                                    },
                                    {
                                      name: 'Justified',
                                      value: 'space-between',
                                    },
                                  ],
                                },
                              },
                              {
                                value: 'none',
                                label: 'Vertical alignment',
                                key: 'valignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Top',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Bottom',
                                      value: 'flex-end',
                                    },
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
                                value: ['M', 'M', 'M', 'M'],
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
                                    {
                                      name: 'Static',
                                      value: 'static',
                                    },
                                    {
                                      name: 'Relative',
                                      value: 'relative',
                                    },
                                    {
                                      name: 'Absolute',
                                      value: 'absolute',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
                                    {
                                      name: 'Sticky',
                                      value: 'sticky',
                                    },
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
                                value: true,
                                label: 'Show background options',
                                key: 'backgroundOptions',
                                type: 'TOGGLE',
                              },
                              {
                                value: 'White',
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
                                    {
                                      name: 'Initial',
                                      value: 'initial',
                                    },
                                    {
                                      name: 'Contain',
                                      value: 'contain',
                                    },
                                    {
                                      name: 'Cover',
                                      value: 'cover',
                                    },
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
                                value: 'center center',
                                label: 'Background position',
                                key: 'backgroundPosition',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'DROPDOWN',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Left top',
                                      value: 'left top',
                                    },
                                    {
                                      name: 'Left center',
                                      value: 'left center',
                                    },
                                    {
                                      name: 'Left bottom',
                                      value: 'left bottom',
                                    },
                                    {
                                      name: 'Center top',
                                      value: 'center top',
                                    },
                                    {
                                      name: 'Center center',
                                      value: 'center center',
                                    },
                                    {
                                      name: 'Center bottom',
                                      value: 'center bottom',
                                    },
                                    {
                                      name: 'Right top',
                                      value: 'right top',
                                    },
                                    {
                                      name: 'Right center',
                                      value: 'right center',
                                    },
                                    {
                                      name: 'Right bottom',
                                      value: 'right bottom',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'no-repeat',
                                    },
                                    {
                                      name: 'X',
                                      value: 'repeat-x',
                                    },
                                    {
                                      name: 'Y',
                                      value: 'repeat-y',
                                    },
                                    {
                                      name: 'All',
                                      value: 'repeat',
                                    },
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
                                value: 'inherit',
                                label: 'Background attachment',
                                key: 'backgroundAttachment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Inherit',
                                      value: 'inherit',
                                    },
                                    {
                                      name: 'Scroll',
                                      value: 'scroll',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Solid',
                                      value: 'solid',
                                    },
                                    {
                                      name: 'Dashed',
                                      value: 'dashed',
                                    },
                                    {
                                      name: 'Dotted',
                                      value: 'dotted',
                                    },
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
                                name: 'Grid',
                                options: [
                                  {
                                    value: true,
                                    label: 'Toggle visibility',
                                    key: 'visibility',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    value: '',
                                    label: 'Model',
                                    key: 'model',
                                    type: 'MODEL',
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
                                    value: '5',
                                    label: 'Repeated items (preview)',
                                    key: 'repeatedItems',
                                    type: 'NUMBER',
                                    configuration: {
                                      condition: {
                                        type: 'HIDE',
                                        option: 'model',
                                        comparator: 'EQ',
                                        value: '',
                                      },
                                    },
                                  },
                                  {
                                    value: 'container',
                                    label: 'Type',
                                    key: 'type',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Container',
                                          value: 'container',
                                        },
                                        {
                                          name: 'Item',
                                          value: 'item',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    value: 'column',
                                    label: 'Direction',
                                    key: 'direction',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Horizontal',
                                          value: 'row',
                                        },
                                        {
                                          name: 'Vertical',
                                          value: 'column',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'type',
                                        comparator: 'EQ',
                                        value: 'container',
                                      },
                                    },
                                  },
                                  {
                                    value: false,
                                    label: 'Reverse',
                                    key: 'reverse',
                                    type: 'TOGGLE',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'type',
                                        comparator: 'EQ',
                                        value: 'container',
                                      },
                                    },
                                  },
                                  {
                                    value: 'center',
                                    label: 'Align items',
                                    key: 'alignItems',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Start',
                                          value: 'flex-start',
                                        },
                                        {
                                          name: 'Center',
                                          value: 'center',
                                        },
                                        {
                                          name: 'End',
                                          value: 'flex-end',
                                        },
                                        {
                                          name: 'Stretch',
                                          value: 'stretch',
                                        },
                                        {
                                          name: 'Baseline',
                                          value: 'baseline',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'type',
                                        comparator: 'EQ',
                                        value: 'container',
                                      },
                                    },
                                  },
                                  {
                                    value: 'center',
                                    label: 'Align content',
                                    key: 'alignContent',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Stretch',
                                          value: 'stretch',
                                        },
                                        {
                                          name: 'Center',
                                          value: 'center',
                                        },
                                        {
                                          name: 'Start',
                                          value: 'flex-start',
                                        },
                                        {
                                          name: 'End',
                                          value: 'flex-end',
                                        },
                                        {
                                          name: 'Space around',
                                          value: 'space-around',
                                        },
                                        {
                                          name: 'Space between',
                                          value: 'space-between',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'type',
                                        comparator: 'EQ',
                                        value: 'container',
                                      },
                                    },
                                  },
                                  {
                                    value: 'flex-start',
                                    label: 'Justify',
                                    key: 'justify',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Start',
                                          value: 'flex-start',
                                        },
                                        {
                                          name: 'Center',
                                          value: 'center',
                                        },
                                        {
                                          name: 'End',
                                          value: 'flex-end',
                                        },
                                        {
                                          name: 'Space between',
                                          value: 'space-between',
                                        },
                                        {
                                          name: 'Space around',
                                          value: 'space-around',
                                        },
                                        {
                                          name: 'Space evenly',
                                          value: 'space-evenly',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'type',
                                        comparator: 'EQ',
                                        value: 'container',
                                      },
                                    },
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
                                    value: 'Transparent',
                                    label: 'Background color',
                                    key: 'backgroundColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: '0',
                                    label: 'Spacing',
                                    key: 'spacing',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: '0',
                                          value: '0',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    value: 'wrap',
                                    label: 'Wrap',
                                    key: 'wrap',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'No wrap',
                                          value: 'nowrap',
                                        },
                                        {
                                          name: 'Wrap',
                                          value: 'wrap',
                                        },
                                        {
                                          name: 'Wrap reverse',
                                          value: 'wrap-reverse',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    value: false,
                                    label: 'Zero min width',
                                    key: 'zeroMinWidth',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: false,
                                    label: 'Show responsive options',
                                    key: 'responsiveOptions',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'true',
                                    label: 'XS width',
                                    key: 'xsWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Not set',
                                          value: 'false',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'true',
                                        },
                                        {
                                          name: 'Fit content',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                        {
                                          name: '11',
                                          value: '11',
                                        },
                                        {
                                          name: '12',
                                          value: '12',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'responsiveOptions',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    value: 'false',
                                    label: 'SM width',
                                    key: 'smWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Not set',
                                          value: 'false',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'true',
                                        },
                                        {
                                          name: 'Fit content',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                        {
                                          name: '11',
                                          value: '11',
                                        },
                                        {
                                          name: '12',
                                          value: '12',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'responsiveOptions',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    value: 'false',
                                    label: 'MD width',
                                    key: 'mdWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Not set',
                                          value: 'false',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'true',
                                        },
                                        {
                                          name: 'Fit content',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                        {
                                          name: '11',
                                          value: '11',
                                        },
                                        {
                                          name: '12',
                                          value: '12',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'responsiveOptions',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    value: 'false',
                                    label: 'LG width',
                                    key: 'lgWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Not set',
                                          value: 'false',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'true',
                                        },
                                        {
                                          name: 'Fit content',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                        {
                                          name: '11',
                                          value: '11',
                                        },
                                        {
                                          name: '12',
                                          value: '12',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'responsiveOptions',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    value: 'false',
                                    label: 'XL width',
                                    key: 'xlWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Not set',
                                          value: 'false',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'true',
                                        },
                                        {
                                          name: 'Fit content',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
                                        {
                                          name: '1',
                                          value: '1',
                                        },
                                        {
                                          name: '2',
                                          value: '2',
                                        },
                                        {
                                          name: '3',
                                          value: '3',
                                        },
                                        {
                                          name: '4',
                                          value: '4',
                                        },
                                        {
                                          name: '5',
                                          value: '5',
                                        },
                                        {
                                          name: '6',
                                          value: '6',
                                        },
                                        {
                                          name: '7',
                                          value: '7',
                                        },
                                        {
                                          name: '8',
                                          value: '8',
                                        },
                                        {
                                          name: '9',
                                          value: '9',
                                        },
                                        {
                                          name: '10',
                                          value: '10',
                                        },
                                        {
                                          name: '11',
                                          value: '11',
                                        },
                                        {
                                          name: '12',
                                          value: '12',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'responsiveOptions',
                                        comparator: 'EQ',
                                        value: true,
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
                                        {
                                          name: 'Built in',
                                          value: 'built-in',
                                        },
                                        {
                                          name: 'Interaction',
                                          value: 'interaction',
                                        },
                                      ],
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
                                    value: ['Grid'],
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
                                    name: 'Avatar',
                                    options: [
                                      {
                                        type: 'CUSTOM',
                                        label: 'Type',
                                        key: 'type',
                                        value: 'img',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Image',
                                              value: 'img',
                                            },
                                            {
                                              name: 'Letter',
                                              value: 'letter',
                                            },
                                            {
                                              name: 'Icon',
                                              value: 'icon',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: [],
                                        label: 'Image url',
                                        key: 'imgUrl',
                                        type: 'VARIABLE',
                                        configuration: {
                                          condition: {
                                            type: 'SHOW',
                                            option: 'type',
                                            comparator: 'EQ',
                                            value: 'img',
                                          },
                                        },
                                      },
                                      {
                                        value: [],
                                        label: 'Image alternative text',
                                        key: 'imgAlt',
                                        type: 'VARIABLE',
                                        configuration: {
                                          condition: {
                                            type: 'SHOW',
                                            option: 'type',
                                            comparator: 'EQ',
                                            value: 'img',
                                          },
                                        },
                                      },
                                      {
                                        value: [],
                                        label: 'Letter',
                                        key: 'letter',
                                        type: 'VARIABLE',
                                        configuration: {
                                          condition: {
                                            type: 'SHOW',
                                            option: 'type',
                                            comparator: 'EQ',
                                            value: 'letter',
                                          },
                                        },
                                      },
                                      {
                                        label: 'Icon',
                                        key: 'icon',
                                        value: 'Person',
                                        type: 'ICON',
                                        configuration: {
                                          condition: {
                                            type: 'SHOW',
                                            option: 'type',
                                            comparator: 'EQ',
                                            value: 'icon',
                                          },
                                        },
                                      },
                                      {
                                        type: 'CUSTOM',
                                        label: 'Variant',
                                        key: 'variant',
                                        value: 'circle',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Circle',
                                              value: 'circle',
                                            },
                                            {
                                              name: 'Rounded',
                                              value: 'rounded',
                                            },
                                            {
                                              name: 'Square',
                                              value: 'square',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        type: 'COLOR',
                                        label: 'Background color',
                                        key: 'backgroundColor',
                                        value: 'Accent1',
                                        configuration: {
                                          condition: {
                                            type: 'HIDE',
                                            option: 'type',
                                            comparator: 'EQ',
                                            value: 'img',
                                          },
                                        },
                                      },
                                      {
                                        type: 'SIZE',
                                        label: 'Width',
                                        key: 'width',
                                        value: '80px',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      },
                                      {
                                        type: 'SIZE',
                                        label: 'Height',
                                        key: 'height',
                                        value: '80px',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      },
                                      {
                                        type: 'SIZES',
                                        label: 'Outer Space',
                                        key: 'margin',
                                        value: ['M', 'M', 'M', 'M'],
                                      },
                                      {
                                        value: false,
                                        label: 'Styles',
                                        key: 'styles',
                                        type: 'TOGGLE',
                                      },
                                      {
                                        value: '1.25rem',
                                        label: 'Font Size',
                                        key: 'fontSize',
                                        type: 'TEXT',
                                        configuration: {
                                          as: 'UNIT',
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
                                        type: 'CUSTOM',
                                        label: 'Font weight',
                                        key: 'fontWeight',
                                        value: '400',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: '100',
                                              value: '100',
                                            },
                                            {
                                              name: '200',
                                              value: '200',
                                            },
                                            {
                                              name: '300',
                                              value: '300',
                                            },
                                            {
                                              name: '400',
                                              value: '400',
                                            },
                                            {
                                              name: '500',
                                              value: '500',
                                            },
                                            {
                                              name: '600',
                                              value: '600',
                                            },
                                            {
                                              name: '700',
                                              value: '700',
                                            },
                                            {
                                              name: '800',
                                              value: '800',
                                            },
                                            {
                                              name: '900',
                                              value: '900',
                                            },
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
                                        value: ['Avatar'],
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
                                  {
                                    name: 'Text',
                                    options: [
                                      {
                                        type: 'VARIABLE',
                                        label: 'Content',
                                        key: 'content',
                                        value: ['Profile name'],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      },
                                      {
                                        value: 'Title5',
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
                                            {
                                              name: 'Left',
                                              value: 'left',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'right',
                                            },
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
                                        type: 'CUSTOM',
                                        label: 'Link to',
                                        key: 'linkType',
                                        value: 'internal',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Internal page',
                                              value: 'internal',
                                            },
                                            {
                                              name: 'External page',
                                              value: 'external',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: '_self',
                                        label: 'Open in',
                                        key: 'linkTarget',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Current Tab',
                                              value: '_self',
                                            },
                                            {
                                              name: 'New Tab',
                                              value: '_blank',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: '',
                                        label: 'Page',
                                        key: 'linkTo',
                                        type: 'ENDPOINT',
                                        configuration: {
                                          condition: {
                                            type: 'SHOW',
                                            option: 'linkType',
                                            comparator: 'EQ',
                                            value: 'internal',
                                          },
                                        },
                                      },
                                      {
                                        value: [''],
                                        label: 'URL',
                                        key: 'linkToExternal',
                                        type: 'VARIABLE',
                                        configuration: {
                                          placeholder:
                                            'Starts with https:// or http://',
                                          condition: {
                                            type: 'SHOW',
                                            option: 'linkType',
                                            comparator: 'EQ',
                                            value: 'external',
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
                                            {
                                              name: '100',
                                              value: '100',
                                            },
                                            {
                                              name: '200',
                                              value: '200',
                                            },
                                            {
                                              name: '300',
                                              value: '300',
                                            },
                                            {
                                              name: '400',
                                              value: '400',
                                            },
                                            {
                                              name: '500',
                                              value: '500',
                                            },
                                            {
                                              name: '600',
                                              value: '600',
                                            },
                                            {
                                              name: '700',
                                              value: '700',
                                            },
                                            {
                                              name: '800',
                                              value: '800',
                                            },
                                            {
                                              name: '900',
                                              value: '900',
                                            },
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
                                  {
                                    name: 'Box',
                                    options: [
                                      {
                                        value: 'none',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'None', value: 'none' },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
                                            {
                                              name: 'Justified',
                                              value: 'space-between',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: 'none',
                                        label: 'Vertical alignment',
                                        key: 'valignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'None', value: 'none' },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
                                            {
                                              name: 'Bottom',
                                              value: 'flex-end',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
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
                                        value: 'center center',
                                        label: 'Background position',
                                        key: 'backgroundPosition',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left top',
                                              value: 'left top',
                                            },
                                            {
                                              name: 'Left center',
                                              value: 'left center',
                                            },
                                            {
                                              name: 'Left bottom',
                                              value: 'left bottom',
                                            },
                                            {
                                              name: 'Center top',
                                              value: 'center top',
                                            },
                                            {
                                              name: 'Center center',
                                              value: 'center center',
                                            },
                                            {
                                              name: 'Center bottom',
                                              value: 'center bottom',
                                            },
                                            {
                                              name: 'Right top',
                                              value: 'right top',
                                            },
                                            {
                                              name: 'Right center',
                                              value: 'right center',
                                            },
                                            {
                                              name: 'Right bottom',
                                              value: 'right bottom',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
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
                                        value: 'inherit',
                                        label: 'Background attachment',
                                        key: 'backgroundAttachment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Inherit',
                                              value: 'inherit',
                                            },
                                            { name: 'Scroll', value: 'scroll' },
                                            { name: 'Fixed', value: 'fixed' },
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
                                        name: 'FileUpload',
                                        ref: {
                                          id: '#profileImageUpload',
                                        },
                                        options: [
                                          {
                                            value: {
                                              label: ['Select image(s)...'],
                                            },
                                            label: 'Label',
                                            key: 'customModelAttribute',
                                            type: 'CUSTOM_MODEL_ATTRIBUTE',
                                            configuration: {
                                              allowedTypes: ['file'],
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Type',
                                            key: 'type',
                                            value: 'list',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'List',
                                                  value: 'list',
                                                },
                                                {
                                                  name: 'Grid',
                                                  value: 'grid',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'TOGGLE',
                                            label: 'Show Image preview',
                                            value: false,
                                            key: 'showImagePreview',
                                          },
                                          {
                                            type: 'SIZE',
                                            label: 'Image preview width',
                                            key: 'imagePreviewWidth',
                                            value: '200px',
                                            configuration: {
                                              as: 'UNIT',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'showImagePreview',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            type: 'SIZE',
                                            label: 'Image preview height',
                                            key: 'imagePreviewHeight',
                                            value: '112px',
                                            configuration: {
                                              as: 'UNIT',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'showImagePreview',
                                                comparator: 'EQ',
                                                value: true,
                                              },
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
                                            label: 'Margin',
                                            key: 'margin',
                                            value: 'normal',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Dense',
                                                  value: 'dense',
                                                },
                                                {
                                                  name: 'Normal',
                                                  value: 'normal',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: true,
                                            label: 'Styles',
                                            key: 'styles',
                                            type: 'TOGGLE',
                                          },
                                          {
                                            value: true,
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
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'THEME_COLOR',
                                                  value: 'primary',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'white',
                                                },
                                                fontFamily: 'Roboto',
                                                fontSize: '0.875rem',
                                                fontStyle: 'none',
                                                fontWeight: '400',
                                                padding: [
                                                  '0.6875rem',
                                                  '1.375rem',
                                                ],
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                              },
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
                                                type: 'VARIABLE',
                                                label: 'Button text',
                                                key: 'buttonText',
                                                value: ['Upload profile image'],
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
                                                value: 'CloudUpload',
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
                                                    {
                                                      name: 'Small',
                                                      value: 'small',
                                                    },
                                                    {
                                                      name: 'Medium',
                                                      value: 'medium',
                                                    },
                                                    {
                                                      name: 'Large',
                                                      value: 'large',
                                                    },
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
                                                    {
                                                      name: 'Start',
                                                      value: 'start',
                                                    },
                                                    {
                                                      name: 'End',
                                                      value: 'end',
                                                    },
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
                                                value: [
                                                  '0rem',
                                                  '0rem',
                                                  '0rem',
                                                  '0rem',
                                                ],
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
                                                label:
                                                  'Toggle tooltip visibility',
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
                              },
                            ],
                          },
                          {
                            name: 'Box',
                            options: [
                              {
                                value: 'none',
                                label: 'Alignment',
                                key: 'alignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Left',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Right',
                                      value: 'flex-end',
                                    },
                                    {
                                      name: 'Justified',
                                      value: 'space-between',
                                    },
                                  ],
                                },
                              },
                              {
                                value: 'none',
                                label: 'Vertical alignment',
                                key: 'valignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Top',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Bottom',
                                      value: 'flex-end',
                                    },
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
                                value: ['M', '0rem', '0rem', '0rem'],
                                label: 'Outer space',
                                key: 'outerSpacing',
                                type: 'SIZES',
                              },
                              {
                                value: ['M', 'M', 'M', 'M'],
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
                                    {
                                      name: 'Static',
                                      value: 'static',
                                    },
                                    {
                                      name: 'Relative',
                                      value: 'relative',
                                    },
                                    {
                                      name: 'Absolute',
                                      value: 'absolute',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
                                    {
                                      name: 'Sticky',
                                      value: 'sticky',
                                    },
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
                                value: true,
                                label: 'Show background options',
                                key: 'backgroundOptions',
                                type: 'TOGGLE',
                              },
                              {
                                value: 'White',
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
                                    {
                                      name: 'Initial',
                                      value: 'initial',
                                    },
                                    {
                                      name: 'Contain',
                                      value: 'contain',
                                    },
                                    {
                                      name: 'Cover',
                                      value: 'cover',
                                    },
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
                                value: 'center center',
                                label: 'Background position',
                                key: 'backgroundPosition',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'DROPDOWN',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Left top',
                                      value: 'left top',
                                    },
                                    {
                                      name: 'Left center',
                                      value: 'left center',
                                    },
                                    {
                                      name: 'Left bottom',
                                      value: 'left bottom',
                                    },
                                    {
                                      name: 'Center top',
                                      value: 'center top',
                                    },
                                    {
                                      name: 'Center center',
                                      value: 'center center',
                                    },
                                    {
                                      name: 'Center bottom',
                                      value: 'center bottom',
                                    },
                                    {
                                      name: 'Right top',
                                      value: 'right top',
                                    },
                                    {
                                      name: 'Right center',
                                      value: 'right center',
                                    },
                                    {
                                      name: 'Right bottom',
                                      value: 'right bottom',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'no-repeat',
                                    },
                                    {
                                      name: 'X',
                                      value: 'repeat-x',
                                    },
                                    {
                                      name: 'Y',
                                      value: 'repeat-y',
                                    },
                                    {
                                      name: 'All',
                                      value: 'repeat',
                                    },
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
                                value: 'inherit',
                                label: 'Background attachment',
                                key: 'backgroundAttachment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Inherit',
                                      value: 'inherit',
                                    },
                                    {
                                      name: 'Scroll',
                                      value: 'scroll',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Solid',
                                      value: 'solid',
                                    },
                                    {
                                      name: 'Dashed',
                                      value: 'dashed',
                                    },
                                    {
                                      name: 'Dotted',
                                      value: 'dotted',
                                    },
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
                                  id: '#activePersonalDetailsButton',
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['1.25rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
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
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Personal details'],
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
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
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
                                        {
                                          name: 'Start',
                                          value: 'start',
                                        },
                                        {
                                          name: 'End',
                                          value: 'end',
                                        },
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
                              {
                                name: 'Button',
                                ref: {
                                  id: '#personalDetailsButton',
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['1.25rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                                options: [
                                  {
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    value: false,
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Personal details'],
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
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
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
                                        {
                                          name: 'Start',
                                          value: 'start',
                                        },
                                        {
                                          name: 'End',
                                          value: 'end',
                                        },
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
                              {
                                name: 'Divider',
                                options: [
                                  {
                                    value: 'S',
                                    label: 'Thickness',
                                    key: 'thickness',
                                    type: 'SIZE',
                                  },
                                  {
                                    value: 'Light',
                                    label: 'Color',
                                    key: 'color',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: ['S', '0rem', 'S', '0rem'],
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
                                    value: ['Divider'],
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
                              {
                                name: 'Button',
                                ref: {
                                  id: '#activeChangePasswordButton',
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['1.25rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                                options: [
                                  {
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    value: false,
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Change password'],
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
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
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
                                        {
                                          name: 'Start',
                                          value: 'start',
                                        },
                                        {
                                          name: 'End',
                                          value: 'end',
                                        },
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
                              {
                                name: 'Button',
                                ref: {
                                  id: '#changePasswordButton',
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['1.25rem', '1.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
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
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Change password'],
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
                                        {
                                          name: 'Small',
                                          value: 'small',
                                        },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        {
                                          name: 'Large',
                                          value: 'large',
                                        },
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
                                        {
                                          name: 'Start',
                                          value: 'start',
                                        },
                                        {
                                          name: 'End',
                                          value: 'end',
                                        },
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
                          },
                        ],
                      },
                      {
                        name: 'Column',
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
                            value: '9',
                            label: 'Column width',
                            key: 'columnWidth',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '9',
                            label: 'Column width (tablet landscape)',
                            key: 'columnWidthTabletLandscape',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '12',
                            label: 'Column width (tablet portrait)',
                            key: 'columnWidthTabletPortrait',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '12',
                            label: 'Column width (mobile)',
                            key: 'columnWidthMobile',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'Fit content',
                                  value: 'fitContent',
                                },
                                {
                                  name: 'Flexible',
                                  value: 'flexible',
                                },
                                {
                                  name: 'Hidden',
                                  value: 'hidden',
                                },
                                { name: '1', value: '1' },
                                { name: '2', value: '2' },
                                { name: '3', value: '3' },
                                { name: '4', value: '4' },
                                { name: '5', value: '5' },
                                { name: '6', value: '6' },
                                { name: '7', value: '7' },
                                { name: '8', value: '8' },
                                { name: '9', value: '9' },
                                { name: '10', value: '10' },
                                { name: '11', value: '11' },
                                { name: '12', value: '12' },
                              ],
                            },
                          },
                          {
                            value: '',
                            label: 'Height',
                            key: 'columnHeight',
                            type: 'TEXT',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            value: 'transparent',
                            label: 'Background color',
                            key: 'backgroundColor',
                            type: 'COLOR',
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Horizontal Alignment',
                            key: 'horizontalAlignment',
                            value: 'inherit',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'None',
                                  value: 'inherit',
                                },
                                {
                                  name: 'Left',
                                  value: 'flex-start',
                                },
                                {
                                  name: 'Center',
                                  value: 'center',
                                },
                                {
                                  name: 'Right',
                                  value: 'flex-end',
                                },
                              ],
                            },
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Vertical Alignment',
                            key: 'verticalAlignment',
                            value: 'inherit',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                {
                                  name: 'None',
                                  value: 'inherit',
                                },
                                {
                                  name: 'Top',
                                  value: 'flex-start',
                                },
                                {
                                  name: 'Center',
                                  value: 'center',
                                },
                                {
                                  name: 'Bottom',
                                  value: 'flex-end',
                                },
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
                            value: ['M', 'M', 'M', 'M'],
                            label: 'Inner space',
                            key: 'innerSpacing',
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
                            value: ['Column'],
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
                                value: 'none',
                                label: 'Alignment',
                                key: 'alignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Left',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Right',
                                      value: 'flex-end',
                                    },
                                    {
                                      name: 'Justified',
                                      value: 'space-between',
                                    },
                                  ],
                                },
                              },
                              {
                                value: 'none',
                                label: 'Vertical alignment',
                                key: 'valignment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Top',
                                      value: 'flex-start',
                                    },
                                    {
                                      name: 'Center',
                                      value: 'center',
                                    },
                                    {
                                      name: 'Bottom',
                                      value: 'flex-end',
                                    },
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
                                value: ['M', 'M', 'M', 'M'],
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
                                    {
                                      name: 'Static',
                                      value: 'static',
                                    },
                                    {
                                      name: 'Relative',
                                      value: 'relative',
                                    },
                                    {
                                      name: 'Absolute',
                                      value: 'absolute',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
                                    {
                                      name: 'Sticky',
                                      value: 'sticky',
                                    },
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
                                value: true,
                                label: 'Show background options',
                                key: 'backgroundOptions',
                                type: 'TOGGLE',
                              },
                              {
                                value: 'White',
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
                                    {
                                      name: 'Initial',
                                      value: 'initial',
                                    },
                                    {
                                      name: 'Contain',
                                      value: 'contain',
                                    },
                                    {
                                      name: 'Cover',
                                      value: 'cover',
                                    },
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
                                value: 'center center',
                                label: 'Background position',
                                key: 'backgroundPosition',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'DROPDOWN',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Left top',
                                      value: 'left top',
                                    },
                                    {
                                      name: 'Left center',
                                      value: 'left center',
                                    },
                                    {
                                      name: 'Left bottom',
                                      value: 'left bottom',
                                    },
                                    {
                                      name: 'Center top',
                                      value: 'center top',
                                    },
                                    {
                                      name: 'Center center',
                                      value: 'center center',
                                    },
                                    {
                                      name: 'Center bottom',
                                      value: 'center bottom',
                                    },
                                    {
                                      name: 'Right top',
                                      value: 'right top',
                                    },
                                    {
                                      name: 'Right center',
                                      value: 'right center',
                                    },
                                    {
                                      name: 'Right bottom',
                                      value: 'right bottom',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'no-repeat',
                                    },
                                    {
                                      name: 'X',
                                      value: 'repeat-x',
                                    },
                                    {
                                      name: 'Y',
                                      value: 'repeat-y',
                                    },
                                    {
                                      name: 'All',
                                      value: 'repeat',
                                    },
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
                                value: 'inherit',
                                label: 'Background attachment',
                                key: 'backgroundAttachment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Inherit',
                                      value: 'inherit',
                                    },
                                    {
                                      name: 'Scroll',
                                      value: 'scroll',
                                    },
                                    {
                                      name: 'Fixed',
                                      value: 'fixed',
                                    },
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
                                    {
                                      name: 'None',
                                      value: 'none',
                                    },
                                    {
                                      name: 'Solid',
                                      value: 'solid',
                                    },
                                    {
                                      name: 'Dashed',
                                      value: 'dashed',
                                    },
                                    {
                                      name: 'Dotted',
                                      value: 'dotted',
                                    },
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
                                name: 'Tabs',
                                options: [
                                  {
                                    label: 'Selected tab index',
                                    key: 'defaultValue',
                                    value: '1',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Details tab',
                                          value: '1',
                                        },
                                        {
                                          name: 'Password tab',
                                          value: '2',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Show design tab',
                                    key: 'selectedDesignTabIndex',
                                    value: '1',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Details tab',
                                          value: '1',
                                        },
                                        {
                                          name: 'Password tab',
                                          value: '2',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Show all tabs',
                                    key: 'showAllTabs',
                                    value: false,
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
                                    value: 'top',
                                    label: 'Alignment',
                                    key: 'alignment',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Left',
                                          value: 'left',
                                        },
                                        {
                                          name: 'Top',
                                          value: 'top',
                                        },
                                        {
                                          name: 'Right',
                                          value: 'right',
                                        },
                                        {
                                          name: 'Bottom',
                                          value: 'bottom',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Variant',
                                    key: 'variant',
                                    value: 'standard',
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
                                          name: 'Scrollable',
                                          value: 'scrollable',
                                        },
                                        {
                                          name: 'Full width',
                                          value: 'fullWidth',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Scrollbuttons',
                                    key: 'scrollButtons',
                                    value: 'auto',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Auto',
                                          value: 'auto',
                                        },
                                        {
                                          name: 'Desktop',
                                          value: 'desktop',
                                        },
                                        {
                                          name: 'Always',
                                          value: 'on',
                                        },
                                        {
                                          name: 'Never',
                                          value: 'off',
                                        },
                                      ],
                                      condition: {
                                        type: 'SHOW',
                                        option: 'variant',
                                        comparator: 'EQ',
                                        value: 'scrollable',
                                      },
                                    },
                                  },
                                  {
                                    type: 'TOGGLE',
                                    label: 'Centered',
                                    key: 'centered',
                                    value: false,
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'orientation',
                                        comparator: 'EQ',
                                        value: 'horizontal',
                                      },
                                    },
                                  },
                                  {
                                    label: 'Bar color',
                                    key: 'appBarColor',
                                    value: 'Primary',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Text color',
                                    key: 'textColor',
                                    value: 'White',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Indicator color',
                                    key: 'indicatorColor',
                                    value: 'Success',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Hide visual tabs',
                                    key: 'hideTabs',
                                    value: true,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: false,
                                    label: 'Advanced settings',
                                    key: 'advancedSettings',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    label: 'Preload data in all tabs',
                                    key: 'preLoadTabs',
                                    value: true,
                                    type: 'TOGGLE',
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
                                    value: ['Tabs'],
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
                                    name: 'Tab',
                                    ref: {
                                      id: '#personalDetailsTab',
                                    },
                                    options: [
                                      {
                                        label: 'Tab label',
                                        key: 'label',
                                        value: ['Personal details'],
                                        type: 'VARIABLE',
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
                                        label: 'Icon',
                                        key: 'icon',
                                        value: 'None',
                                        type: 'ICON',
                                      },
                                      {
                                        label: 'Icon Alignment',
                                        key: 'iconAlignment',
                                        value: 'top',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left',
                                              value: 'left',
                                            },
                                            {
                                              name: 'Top',
                                              value: 'top',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'right',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'bottom',
                                            },
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
                                        type: 'TOGGLE',
                                        label: 'Disabled',
                                        key: 'disabled',
                                        value: false,
                                      },
                                      {
                                        type: 'TOGGLE',
                                        label: 'Disable ripple',
                                        key: 'disableRipple',
                                        value: false,
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
                                        value: ['Tab'],
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
                                        name: 'Text',
                                        options: [
                                          {
                                            type: 'VARIABLE',
                                            label: 'Content',
                                            key: 'content',
                                            value: ['Personal details'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                          },
                                          {
                                            value: 'Title5',
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
                                                {
                                                  name: 'Left',
                                                  value: 'left',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'right',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Link to',
                                            key: 'linkType',
                                            value: 'internal',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Internal page',
                                                  value: 'internal',
                                                },
                                                {
                                                  name: 'External page',
                                                  value: 'external',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: '_self',
                                            label: 'Open in',
                                            key: 'linkTarget',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Current Tab',
                                                  value: '_self',
                                                },
                                                {
                                                  name: 'New Tab',
                                                  value: '_blank',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Page',
                                            key: 'linkTo',
                                            type: 'ENDPOINT',
                                            configuration: {
                                              condition: {
                                                type: 'SHOW',
                                                option: 'linkType',
                                                comparator: 'EQ',
                                                value: 'internal',
                                              },
                                            },
                                          },
                                          {
                                            value: [''],
                                            label: 'URL',
                                            key: 'linkToExternal',
                                            type: 'VARIABLE',
                                            configuration: {
                                              placeholder:
                                                'Starts with https:// or http://',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'linkType',
                                                comparator: 'EQ',
                                                value: 'external',
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
                                                {
                                                  name: '100',
                                                  value: '100',
                                                },
                                                {
                                                  name: '200',
                                                  value: '200',
                                                },
                                                {
                                                  name: '300',
                                                  value: '300',
                                                },
                                                {
                                                  name: '400',
                                                  value: '400',
                                                },
                                                {
                                                  name: '500',
                                                  value: '500',
                                                },
                                                {
                                                  name: '600',
                                                  value: '600',
                                                },
                                                {
                                                  name: '700',
                                                  value: '700',
                                                },
                                                {
                                                  name: '800',
                                                  value: '800',
                                                },
                                                {
                                                  name: '900',
                                                  value: '900',
                                                },
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
                                      {
                                        name: 'Divider',
                                        options: [
                                          {
                                            value: 'S',
                                            label: 'Thickness',
                                            key: 'thickness',
                                            type: 'SIZE',
                                          },
                                          {
                                            value: 'Light',
                                            label: 'Color',
                                            key: 'color',
                                            type: 'COLOR',
                                          },
                                          {
                                            value: [
                                              'M',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                            value: ['Divider'],
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
                                      {
                                        name: 'Alert',
                                        ref: {
                                          id: '#personalDetailsSuccessAlert',
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
                                            value: [
                                              'Updates saved successfully',
                                            ],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
                                            key: 'allowTextServerResponse',
                                            value: false,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Title text',
                                            key: 'titleText',
                                            value: [''],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
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
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
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
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'stretch',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                      {
                                        name: 'Alert',
                                        ref: {
                                          id: '#personalDetailsErrorAlert',
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
                                            value: [
                                              'Something went wrong while updating your details',
                                            ],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
                                            key: 'allowTextServerResponse',
                                            value: true,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Title text',
                                            key: 'titleText',
                                            value: [''],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
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
                                            value: 'Warning',
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
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
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
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'stretch',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                    ],
                                  },
                                  {
                                    name: 'Tab',
                                    ref: {
                                      id: '#changePasswordTab',
                                    },
                                    options: [
                                      {
                                        label: 'Tab label',
                                        key: 'label',
                                        value: ['Change password'],
                                        type: 'VARIABLE',
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
                                        label: 'Icon',
                                        key: 'icon',
                                        value: 'None',
                                        type: 'ICON',
                                      },
                                      {
                                        label: 'Icon Alignment',
                                        key: 'iconAlignment',
                                        value: 'top',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left',
                                              value: 'left',
                                            },
                                            {
                                              name: 'Top',
                                              value: 'top',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'right',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'bottom',
                                            },
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
                                        type: 'TOGGLE',
                                        label: 'Disabled',
                                        key: 'disabled',
                                        value: false,
                                      },
                                      {
                                        type: 'TOGGLE',
                                        label: 'Disable ripple',
                                        key: 'disableRipple',
                                        value: false,
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
                                        value: ['Tab'],
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
                                        name: 'Text',
                                        options: [
                                          {
                                            type: 'VARIABLE',
                                            label: 'Content',
                                            key: 'content',
                                            value: ['Change password'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                          },
                                          {
                                            value: 'Title5',
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
                                                {
                                                  name: 'Left',
                                                  value: 'left',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'right',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Link to',
                                            key: 'linkType',
                                            value: 'internal',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Internal page',
                                                  value: 'internal',
                                                },
                                                {
                                                  name: 'External page',
                                                  value: 'external',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: '_self',
                                            label: 'Open in',
                                            key: 'linkTarget',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Current Tab',
                                                  value: '_self',
                                                },
                                                {
                                                  name: 'New Tab',
                                                  value: '_blank',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Page',
                                            key: 'linkTo',
                                            type: 'ENDPOINT',
                                            configuration: {
                                              condition: {
                                                type: 'SHOW',
                                                option: 'linkType',
                                                comparator: 'EQ',
                                                value: 'internal',
                                              },
                                            },
                                          },
                                          {
                                            value: [''],
                                            label: 'URL',
                                            key: 'linkToExternal',
                                            type: 'VARIABLE',
                                            configuration: {
                                              placeholder:
                                                'Starts with https:// or http://',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'linkType',
                                                comparator: 'EQ',
                                                value: 'external',
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
                                                {
                                                  name: '100',
                                                  value: '100',
                                                },
                                                {
                                                  name: '200',
                                                  value: '200',
                                                },
                                                {
                                                  name: '300',
                                                  value: '300',
                                                },
                                                {
                                                  name: '400',
                                                  value: '400',
                                                },
                                                {
                                                  name: '500',
                                                  value: '500',
                                                },
                                                {
                                                  name: '600',
                                                  value: '600',
                                                },
                                                {
                                                  name: '700',
                                                  value: '700',
                                                },
                                                {
                                                  name: '800',
                                                  value: '800',
                                                },
                                                {
                                                  name: '900',
                                                  value: '900',
                                                },
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
                                      {
                                        name: 'Divider',
                                        options: [
                                          {
                                            value: 'S',
                                            label: 'Thickness',
                                            key: 'thickness',
                                            type: 'SIZE',
                                          },
                                          {
                                            value: 'Light',
                                            label: 'Color',
                                            key: 'color',
                                            type: 'COLOR',
                                          },
                                          {
                                            value: [
                                              'M',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                            value: ['Divider'],
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
                                      {
                                        name: 'Alert',
                                        ref: {
                                          id: '#passwordSuccessAlert',
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
                                            value: [
                                              'Password updated successfully',
                                            ],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
                                            key: 'allowTextServerResponse',
                                            value: false,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Title text',
                                            key: 'titleText',
                                            value: [''],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
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
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
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
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'stretch',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                      {
                                        name: 'Alert',
                                        ref: {
                                          id: '#passwordErrorAlert',
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
                                            value: [
                                              'Something went wrong while updating your password',
                                            ],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
                                            key: 'allowTextServerResponse',
                                            value: true,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Title text',
                                            key: 'titleText',
                                            value: [''],
                                          },
                                          {
                                            label:
                                              'Allow to overwrite by the server response',
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
                                            value: 'Warning',
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
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
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
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'stretch',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const validate = () => {
      if (!loggedInUserState.authenticationProfile) {
        setValidationMessage('Authentication Profile is required.');
        return false;
      }
      return true;
    };

    const onSaveHandler = () => {
      setValidationMessage('');
      if (validate()) {
        const newPrefab = { ...prefab };

        const authProfileOption = getDescendantByRef(
          '#authenticationDataContainer',
          prefabStructure,
        ).options.find((o) => o.key === 'authProfile');

        authProfileOption.value = loggedInUserState.authenticationProfile.id;

        const profileDetailsInputs = profileProperties.map((p) =>
          inputBox(enrichVarObj(p, true)),
        );

        const personalDetailsTab = getDescendantByRef(
          '#personalDetailsTab',
          prefabStructure,
        );
        const idProperty = data.model.properties.find(
          (property) => property.name === 'id',
        );
        editProfileDetailsForm.options[2].value = {
          _and: [
            {
              [idProperty.id]: {
                eq: {
                  id: [idProperty.id],
                  type: 'ME_PROPERTY',
                },
              },
            },
          ],
        };
        editProfileDetailsForm.descendants = [
          ...profileDetailsInputs,
          ...submitButton('Save changes', '#saveProfileDetailsButton'),
        ];
        personalDetailsTab.descendants = [
          ...personalDetailsTab.descendants,
          ...editProfileDetailsForm,
        ];

        const enrichedPasswordProperty = enrichPasswordProp(
          data.model.properties.find((p) => p.id === passwordProperty.id[0]),
        );
        const passwordInputs = passwordFieldsLabels.map((label) =>
          inputBox(enrichedPasswordProperty, label),
        );
        updatePasswordForm.options[2].value = {
          _and: [
            {
              [idProperty.id]: {
                eq: {
                  id: [idProperty.id],
                  type: 'ME_PROPERTY',
                },
              },
            },
          ],
        };
        updatePasswordForm.descendants = [
          ...passwordInputs,
          ...submitButton('Update password', '#savePasswordButton'),
        ];

        const changePasswordTab = getDescendantByRef(
          '#changePasswordTab',
          prefabStructure,
        );
        changePasswordTab.descendants = [
          ...changePasswordTab.descendants,
          ...updatePasswordForm,
        ];

        getDescendantByRef('#contentBox', newPrefab.structure).descendants =
          prefabStructure;

        const newActions = [
          {
            name: 'Update form action',
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
                  assign: profileProperties.map((p) => ({
                    leftHandSide: p.id[0],
                    ref: {
                      path: ['#customModelVariableId', `#attribute_${p.id[0]}`],
                    },
                  })),
                },
              },
            ],
          },
          {
            name: 'Update password form action',
            ref: {
              id: '#updatePasswordActionId',
              endpointId: '#updatePasswordEndpointId',
            },
            useNewRuntime: false,
            events: [
              {
                kind: 'update',
                options: {
                  ref: {
                    object: '#updatePasswordVariableId',
                  },
                  assign: [
                    {
                      leftHandSide: passwordProperty.id[0],
                      ref: {
                        path: [
                          '#updatePasswordModelVariableId',
                          `#attribute_${passwordProperty.id[0]}_new_password`,
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        ];

        const variables = [
          {
            kind: 'construct',
            name: 'form_data',
            ref: {
              id: '#customModelVariableId',
              endpointId: '#endpointId',
            },
            options: {
              modelId,
              ref: {
                customModelId: '#customModelId',
              },
            },
          },
          {
            kind: 'object',
            name: camelToSnakeCase(data.model.label),
            ref: {
              id: '#objectVariableId',
              endpointId: '#endpointId',
            },
            options: {
              modelId,
            },
          },
          {
            kind: 'construct',
            name: 'update_password_form_data',
            ref: {
              id: '#updatePasswordModelVariableId',
              endpointId: '#updatePasswordEndpointId',
            },
            options: {
              modelId,
              ref: {
                customModelId: '#updatePasswordCustomModelId',
              },
            },
          },
          {
            kind: 'object',
            name: 'update_password_form_object',
            ref: {
              id: '#updatePasswordVariableId',
              endpointId: '#updatePasswordEndpointId',
            },
            options: {
              modelId,
            },
          },
        ];

        // newPrefab.actions[0].events[0].options.assign =
        //       editFormProperties.map((property) => ({
        //         leftHandSide: property.id[0],
        //         ref: {
        //           path: [
        //             '#customModelVariableId',
        //             `#attribute_${property.id[0]}`,
        //           ],
        //         },
        //       }));

        newPrefab.actions = [...newActions];
        newPrefab.variables = [...variables];

        save(newPrefab);
      }
    };

    return (
      <>
        <Header onClose={close} title="Configure profile page" />
        <Content>
          <Field
            label="Authentication Profile"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select the Authentication Profile of which you want to show the
                data of.
              </Text>
            }
          >
            <AuthenticationProfileSelector
              onChange={(id, authProfileObject) => {
                setLoggedInUserState((prevState) => ({
                  ...prevState,
                  authenticationProfile: authProfileObject,
                }));
                if (authProfileObject) {
                  setModelId(authProfileObject.loginModel);
                  const authPasswordProperty =
                    authProfileObject.properties.find(
                      (p) => p.kind === 'PASSWORD',
                    );
                  setPasswordProperty({
                    id: [authPasswordProperty.id],
                    type: 'PROPERTY',
                  });
                }
              }}
              value={
                loggedInUserState.authenticationProfile
                  ? loggedInUserState.authenticationProfile.id
                  : ''
              }
            />
          </Field>
          <Field label="Profile picture selector">
            <Box pad={{ bottom: 'medium' }}>
              <CheckBox
                label="Model has profile picture"
                checked={hasProfilePictureProperty}
                onChange={() => {
                  setHasProfilePictureProperty(!hasProfilePictureProperty);
                }}
              />
            </Box>
            {hasProfilePictureProperty && (
              <PropertySelector
                modelId={modelId}
                onChange={(value) => {
                  setProfilePictureProperty(value);
                }}
                value={profilePictureProperty}
                disabled={!hasProfilePictureProperty}
              />
            )}
          </Field>
          <Field label="(full) name property">
            <PropertySelector
              modelId={modelId}
              onChange={(value) => {
                setProfileNameProperty(value);
              }}
              value={profileNameProperty}
              disabled={!modelId}
            />
            <Field label="Input fields in the personal details tab">
              <PropertiesSelector
                modelId={modelId}
                value={profileProperties}
                disabledNames={['created_at', 'updated_at', 'id']}
                // disabledKinds={disabledKinds}
                onChange={(value) => {
                  // setEditPropertiesValidation(!value.length);
                  setProfileProperties(value);
                }}
              />
            </Field>
          </Field>
        </Content>
        <Footer onClose={close} onSave={onSaveHandler} />
      </>
    );
  },
  structure: [
    {
      name: 'Row',
      options: [
        {
          type: 'CUSTOM',
          label: 'Width',
          key: 'maxRowWidth',
          value: 'Full',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'S', value: 'S' },
              { name: 'M', value: 'M' },
              { name: 'L', value: 'L' },
              { name: 'XL', value: 'XL' },
              { name: 'Full', value: 'Full' },
            ],
          },
        },
        {
          value: '100%',
          label: 'Height',
          key: 'rowHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
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
          value: ['Row'],
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
          name: 'Column',
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
              value: '12',
              label: 'Column width',
              key: 'columnWidth',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (tablet landscape)',
              key: 'columnWidthTabletLandscape',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (tablet portrait)',
              key: 'columnWidthTabletPortrait',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (mobile)',
              key: 'columnWidthMobile',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '100%',
              label: 'Height',
              key: 'columnHeight',
              type: 'TEXT',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: 'transparent',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
            {
              type: 'CUSTOM',
              label: 'Horizontal Alignment',
              key: 'horizontalAlignment',
              value: 'inherit',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'inherit' },
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                ],
              },
            },
            {
              type: 'CUSTOM',
              label: 'Vertical Alignment',
              key: 'verticalAlignment',
              value: 'inherit',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'inherit' },
                  { name: 'Top', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Bottom', value: 'flex-end' },
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
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Inner space',
              key: 'innerSpacing',
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
              value: ['Column'],
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
              name: 'Grid',
              options: [
                {
                  value: true,
                  label: 'Toggle visibility',
                  key: 'visibility',
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                  },
                },
                {
                  value: '',
                  label: 'Model',
                  key: 'model',
                  type: 'MODEL',
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
                  value: '5',
                  label: 'Repeated items (preview)',
                  key: 'repeatedItems',
                  type: 'NUMBER',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'model',
                      comparator: 'EQ',
                      value: '',
                    },
                  },
                },
                {
                  value: 'container',
                  label: 'Type',
                  key: 'type',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Container', value: 'container' },
                      { name: 'Item', value: 'item' },
                    ],
                  },
                },
                {
                  value: 'row',
                  label: 'Direction',
                  key: 'direction',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Horizontal', value: 'row' },
                      { name: 'Vertical', value: 'column' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Reverse',
                  key: 'reverse',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'stretch',
                  label: 'Align items',
                  key: 'alignItems',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Stretch', value: 'stretch' },
                      { name: 'Baseline', value: 'baseline' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'stretch',
                  label: 'Align content',
                  key: 'alignContent',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Stretch', value: 'stretch' },
                      { name: 'Center', value: 'center' },
                      { name: 'Start', value: 'flex-start' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Space around', value: 'space-around' },
                      { name: 'Space between', value: 'space-between' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'flex-start',
                  label: 'Justify',
                  key: 'justify',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Space between', value: 'space-between' },
                      { name: 'Space around', value: 'space-around' },
                      { name: 'Space evenly', value: 'space-evenly' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  type: 'SIZE',
                  label: 'Height',
                  key: 'height',
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                },
                {
                  value: 'Transparent',
                  label: 'Background color',
                  key: 'backgroundColor',
                  type: 'COLOR',
                },
                {
                  value: '0',
                  label: 'Spacing',
                  key: 'spacing',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: '0', value: '0' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                    ],
                  },
                },
                {
                  value: 'wrap',
                  label: 'Wrap',
                  key: 'wrap',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'No wrap', value: 'nowrap' },
                      { name: 'Wrap', value: 'wrap' },
                      { name: 'Wrap reverse', value: 'wrap-reverse' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Zero min width',
                  key: 'zeroMinWidth',
                  type: 'TOGGLE',
                },
                {
                  value: false,
                  label: 'Show responsive options',
                  key: 'responsiveOptions',
                  type: 'TOGGLE',
                },
                {
                  value: 'true',
                  label: 'XS width',
                  key: 'xsWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'SM width',
                  key: 'smWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'MD width',
                  key: 'mdWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'LG width',
                  key: 'lgWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'XL width',
                  key: 'xlWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
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
                  value: ['Grid'],
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
                  name: 'Grid',
                  options: [
                    {
                      value: true,
                      label: 'Toggle visibility',
                      key: 'visibility',
                      type: 'TOGGLE',
                      configuration: {
                        as: 'VISIBILITY',
                      },
                    },
                    {
                      value: '',
                      label: 'Model',
                      key: 'model',
                      type: 'MODEL',
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
                      value: '5',
                      label: 'Repeated items (preview)',
                      key: 'repeatedItems',
                      type: 'NUMBER',
                      configuration: {
                        condition: {
                          type: 'HIDE',
                          option: 'model',
                          comparator: 'EQ',
                          value: '',
                        },
                      },
                    },
                    {
                      value: 'container',
                      label: 'Type',
                      key: 'type',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Container', value: 'container' },
                          { name: 'Item', value: 'item' },
                        ],
                      },
                    },
                    {
                      value: 'column',
                      label: 'Direction',
                      key: 'direction',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Horizontal', value: 'row' },
                          { name: 'Vertical', value: 'column' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: false,
                      label: 'Reverse',
                      key: 'reverse',
                      type: 'TOGGLE',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'stretch',
                      label: 'Align items',
                      key: 'alignItems',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Start', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Stretch', value: 'stretch' },
                          { name: 'Baseline', value: 'baseline' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'stretch',
                      label: 'Align content',
                      key: 'alignContent',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Stretch', value: 'stretch' },
                          { name: 'Center', value: 'center' },
                          { name: 'Start', value: 'flex-start' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Space around', value: 'space-around' },
                          { name: 'Space between', value: 'space-between' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'flex-start',
                      label: 'Justify',
                      key: 'justify',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Start', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Space between', value: 'space-between' },
                          { name: 'Space around', value: 'space-around' },
                          { name: 'Space evenly', value: 'space-evenly' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
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
                      value: 'Transparent',
                      label: 'Background color',
                      key: 'backgroundColor',
                      type: 'COLOR',
                    },
                    {
                      value: '0',
                      label: 'Spacing',
                      key: 'spacing',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: '0', value: '0' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                        ],
                      },
                    },
                    {
                      value: 'wrap',
                      label: 'Wrap',
                      key: 'wrap',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'No wrap', value: 'nowrap' },
                          { name: 'Wrap', value: 'wrap' },
                          { name: 'Wrap reverse', value: 'wrap-reverse' },
                        ],
                      },
                    },
                    {
                      value: false,
                      label: 'Zero min width',
                      key: 'zeroMinWidth',
                      type: 'TOGGLE',
                    },
                    {
                      value: false,
                      label: 'Show responsive options',
                      key: 'responsiveOptions',
                      type: 'TOGGLE',
                    },
                    {
                      value: 'true',
                      label: 'XS width',
                      key: 'xsWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'SM width',
                      key: 'smWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'MD width',
                      key: 'mdWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'LG width',
                      key: 'lgWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'XL width',
                      key: 'xlWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
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
                      value: ['Grid'],
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
                          value: 'none',
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
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
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
                          value: '100%',
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
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
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
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
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
                          name: 'Row',
                          options: [
                            {
                              type: 'CUSTOM',
                              label: 'Width',
                              key: 'maxRowWidth',
                              value: 'Full',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'S', value: 'S' },
                                  { name: 'M', value: 'M' },
                                  { name: 'L', value: 'L' },
                                  { name: 'XL', value: 'XL' },
                                  { name: 'Full', value: 'Full' },
                                ],
                              },
                            },
                            {
                              value: '',
                              label: 'Height',
                              key: 'rowHeight',
                              type: 'TEXT',
                              configuration: {
                                as: 'UNIT',
                              },
                            },
                            {
                              value: 'transparent',
                              label: 'Background color',
                              key: 'backgroundColor',
                              type: 'COLOR',
                            },
                            {
                              value: ['0rem', '0rem', '0rem', '0rem'],
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
                              value: ['Row'],
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
                              name: 'Column',
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
                                  value: 'flexible',
                                  label: 'Column width',
                                  key: 'columnWidth',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (tablet landscape)',
                                  key: 'columnWidthTabletLandscape',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (tablet portrait)',
                                  key: 'columnWidthTabletPortrait',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (mobile)',
                                  key: 'columnWidthMobile',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '',
                                  label: 'Height',
                                  key: 'columnHeight',
                                  type: 'TEXT',
                                  configuration: {
                                    as: 'UNIT',
                                  },
                                },
                                {
                                  value: 'transparent',
                                  label: 'Background color',
                                  key: 'backgroundColor',
                                  type: 'COLOR',
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Horizontal Alignment',
                                  key: 'horizontalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Vertical Alignment',
                                  key: 'verticalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Top', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Bottom', value: 'flex-end' },
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
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                  label: 'Inner space',
                                  key: 'innerSpacing',
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
                                  value: ['Column'],
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
                                      value: 'none',
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
                                          {
                                            name: 'Justified',
                                            value: 'space-between',
                                          },
                                        ],
                                      },
                                    },
                                    {
                                      value: 'none',
                                      label: 'Vertical alignment',
                                      key: 'valignment',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'None', value: 'none' },
                                          { name: 'Top', value: 'flex-start' },
                                          { name: 'Center', value: 'center' },
                                          { name: 'Bottom', value: 'flex-end' },
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
                                          {
                                            name: 'Relative',
                                            value: 'relative',
                                          },
                                          {
                                            name: 'Absolute',
                                            value: 'absolute',
                                          },
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
                                      value: true,
                                      label: 'Show background options',
                                      key: 'backgroundOptions',
                                      type: 'TOGGLE',
                                    },
                                    {
                                      value: 'Primary',
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
                                      value: 'center center',
                                      label: 'Background position',
                                      key: 'backgroundPosition',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          {
                                            name: 'Left top',
                                            value: 'left top',
                                          },
                                          {
                                            name: 'Left center',
                                            value: 'left center',
                                          },
                                          {
                                            name: 'Left bottom',
                                            value: 'left bottom',
                                          },
                                          {
                                            name: 'Center top',
                                            value: 'center top',
                                          },
                                          {
                                            name: 'Center center',
                                            value: 'center center',
                                          },
                                          {
                                            name: 'Center bottom',
                                            value: 'center bottom',
                                          },
                                          {
                                            name: 'Right top',
                                            value: 'right top',
                                          },
                                          {
                                            name: 'Right center',
                                            value: 'right center',
                                          },
                                          {
                                            name: 'Right bottom',
                                            value: 'right bottom',
                                          },
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
                                      value: 'inherit',
                                      label: 'Background attachment',
                                      key: 'backgroundAttachment',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Inherit', value: 'inherit' },
                                          { name: 'Scroll', value: 'scroll' },
                                          { name: 'Fixed', value: 'fixed' },
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
                                      name: 'Row',
                                      options: [
                                        {
                                          type: 'CUSTOM',
                                          label: 'Width',
                                          key: 'maxRowWidth',
                                          value: 'XL',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: 'S', value: 'S' },
                                              { name: 'M', value: 'M' },
                                              { name: 'L', value: 'L' },
                                              { name: 'XL', value: 'XL' },
                                              { name: 'Full', value: 'Full' },
                                            ],
                                          },
                                        },
                                        {
                                          value: '',
                                          label: 'Height',
                                          key: 'rowHeight',
                                          type: 'TEXT',
                                          configuration: {
                                            as: 'UNIT',
                                          },
                                        },
                                        {
                                          value: 'transparent',
                                          label: 'Background color',
                                          key: 'backgroundColor',
                                          type: 'COLOR',
                                        },
                                        {
                                          value: [
                                            '0rem',
                                            '0rem',
                                            '0rem',
                                            '0rem',
                                          ],
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
                                          value: ['Row'],
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
                                          name: 'Column',
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
                                              value: 'flexible',
                                              label: 'Column width',
                                              key: 'columnWidth',
                                              type: 'CUSTOM',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'Fit content',
                                                    value: 'fitContent',
                                                  },
                                                  {
                                                    name: 'Flexible',
                                                    value: 'flexible',
                                                  },
                                                  {
                                                    name: 'Hidden',
                                                    value: 'hidden',
                                                  },
                                                  { name: '1', value: '1' },
                                                  { name: '2', value: '2' },
                                                  { name: '3', value: '3' },
                                                  { name: '4', value: '4' },
                                                  { name: '5', value: '5' },
                                                  { name: '6', value: '6' },
                                                  { name: '7', value: '7' },
                                                  { name: '8', value: '8' },
                                                  { name: '9', value: '9' },
                                                  { name: '10', value: '10' },
                                                  { name: '11', value: '11' },
                                                  { name: '12', value: '12' },
                                                ],
                                              },
                                            },
                                            {
                                              value: 'flexible',
                                              label:
                                                'Column width (tablet landscape)',
                                              key: 'columnWidthTabletLandscape',
                                              type: 'CUSTOM',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'Fit content',
                                                    value: 'fitContent',
                                                  },
                                                  {
                                                    name: 'Flexible',
                                                    value: 'flexible',
                                                  },
                                                  {
                                                    name: 'Hidden',
                                                    value: 'hidden',
                                                  },
                                                  { name: '1', value: '1' },
                                                  { name: '2', value: '2' },
                                                  { name: '3', value: '3' },
                                                  { name: '4', value: '4' },
                                                  { name: '5', value: '5' },
                                                  { name: '6', value: '6' },
                                                  { name: '7', value: '7' },
                                                  { name: '8', value: '8' },
                                                  { name: '9', value: '9' },
                                                  { name: '10', value: '10' },
                                                  { name: '11', value: '11' },
                                                  { name: '12', value: '12' },
                                                ],
                                              },
                                            },
                                            {
                                              value: 'flexible',
                                              label:
                                                'Column width (tablet portrait)',
                                              key: 'columnWidthTabletPortrait',
                                              type: 'CUSTOM',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'Fit content',
                                                    value: 'fitContent',
                                                  },
                                                  {
                                                    name: 'Flexible',
                                                    value: 'flexible',
                                                  },
                                                  {
                                                    name: 'Hidden',
                                                    value: 'hidden',
                                                  },
                                                  { name: '1', value: '1' },
                                                  { name: '2', value: '2' },
                                                  { name: '3', value: '3' },
                                                  { name: '4', value: '4' },
                                                  { name: '5', value: '5' },
                                                  { name: '6', value: '6' },
                                                  { name: '7', value: '7' },
                                                  { name: '8', value: '8' },
                                                  { name: '9', value: '9' },
                                                  { name: '10', value: '10' },
                                                  { name: '11', value: '11' },
                                                  { name: '12', value: '12' },
                                                ],
                                              },
                                            },
                                            {
                                              value: 'flexible',
                                              label: 'Column width (mobile)',
                                              key: 'columnWidthMobile',
                                              type: 'CUSTOM',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'Fit content',
                                                    value: 'fitContent',
                                                  },
                                                  {
                                                    name: 'Flexible',
                                                    value: 'flexible',
                                                  },
                                                  {
                                                    name: 'Hidden',
                                                    value: 'hidden',
                                                  },
                                                  { name: '1', value: '1' },
                                                  { name: '2', value: '2' },
                                                  { name: '3', value: '3' },
                                                  { name: '4', value: '4' },
                                                  { name: '5', value: '5' },
                                                  { name: '6', value: '6' },
                                                  { name: '7', value: '7' },
                                                  { name: '8', value: '8' },
                                                  { name: '9', value: '9' },
                                                  { name: '10', value: '10' },
                                                  { name: '11', value: '11' },
                                                  { name: '12', value: '12' },
                                                ],
                                              },
                                            },
                                            {
                                              value: '',
                                              label: 'Height',
                                              key: 'columnHeight',
                                              type: 'TEXT',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            },
                                            {
                                              value: 'transparent',
                                              label: 'Background color',
                                              key: 'backgroundColor',
                                              type: 'COLOR',
                                            },
                                            {
                                              type: 'CUSTOM',
                                              label: 'Horizontal Alignment',
                                              key: 'horizontalAlignment',
                                              value: 'inherit',
                                              configuration: {
                                                as: 'BUTTONGROUP',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'None',
                                                    value: 'inherit',
                                                  },
                                                  {
                                                    name: 'Left',
                                                    value: 'flex-start',
                                                  },
                                                  {
                                                    name: 'Center',
                                                    value: 'center',
                                                  },
                                                  {
                                                    name: 'Right',
                                                    value: 'flex-end',
                                                  },
                                                ],
                                              },
                                            },
                                            {
                                              type: 'CUSTOM',
                                              label: 'Vertical Alignment',
                                              key: 'verticalAlignment',
                                              value: 'inherit',
                                              configuration: {
                                                as: 'BUTTONGROUP',
                                                dataType: 'string',
                                                allowedInput: [
                                                  {
                                                    name: 'None',
                                                    value: 'inherit',
                                                  },
                                                  {
                                                    name: 'Top',
                                                    value: 'flex-start',
                                                  },
                                                  {
                                                    name: 'Center',
                                                    value: 'center',
                                                  },
                                                  {
                                                    name: 'Bottom',
                                                    value: 'flex-end',
                                                  },
                                                ],
                                              },
                                            },
                                            {
                                              value: [
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                              ],
                                              label: 'Outer space',
                                              key: 'outerSpacing',
                                              type: 'SIZES',
                                            },
                                            {
                                              value: [
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                              ],
                                              label: 'Inner space',
                                              key: 'innerSpacing',
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
                                              value: ['Column'],
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
                                              name: 'AppBar',
                                              options: [
                                                {
                                                  label: 'Background color',
                                                  key: 'backgroundColor',
                                                  value: 'Primary',
                                                  type: 'COLOR',
                                                },
                                                {
                                                  label: 'Text color',
                                                  key: 'color',
                                                  value: 'White',
                                                  type: 'COLOR',
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
                                                  label: 'Position',
                                                  key: 'position',
                                                  value: 'static',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'DROPDOWN',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Fixed',
                                                        value: 'fixed',
                                                      },
                                                      {
                                                        name: 'Absolute',
                                                        value: 'absolute',
                                                      },
                                                      {
                                                        name: 'Sticky',
                                                        value: 'sticky',
                                                      },

                                                      {
                                                        name: 'Static',
                                                        value: 'static',
                                                      },
                                                      {
                                                        name: 'Relative',
                                                        value: 'relative',
                                                      },
                                                    ],
                                                  },
                                                },
                                                {
                                                  label: 'Title',
                                                  key: 'title',
                                                  value: [''],
                                                  type: 'VARIABLE',
                                                },
                                                {
                                                  label: 'Logo',
                                                  key: 'logoSource',
                                                  value: [
                                                    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                                  ],
                                                  type: 'VARIABLE',
                                                },
                                                {
                                                  type: 'SIZE',
                                                  label: 'Logo Width',
                                                  key: 'logoWidth',
                                                  value: '150px',
                                                  configuration: {
                                                    as: 'UNIT',
                                                  },
                                                },
                                                {
                                                  label: 'Align items',
                                                  key: 'alignItems',
                                                  value: 'right',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Left',
                                                        value: 'left',
                                                      },
                                                      {
                                                        name: 'Right',
                                                        value: 'right',
                                                      },
                                                    ],
                                                  },
                                                },
                                                {
                                                  label: 'Page',
                                                  key: 'endpoint',
                                                  value: '',
                                                  type: 'ENDPOINT',
                                                },
                                                {
                                                  label: 'Variant',
                                                  key: 'appBarVariant',
                                                  value: 'flat',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Flat',
                                                        value: 'flat',
                                                      },
                                                      {
                                                        name: 'Elevation',
                                                        value: 'elevation',
                                                      },
                                                      {
                                                        name: 'Outlined',
                                                        value: 'outlined',
                                                      },
                                                    ],
                                                  },
                                                },
                                                {
                                                  label: 'Elevation',
                                                  key: 'elevation',
                                                  value: '1',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'DROPDOWN',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                      {
                                                        name: '13',
                                                        value: '13',
                                                      },
                                                      {
                                                        name: '14',
                                                        value: '14',
                                                      },
                                                      {
                                                        name: '15',
                                                        value: '15',
                                                      },
                                                      {
                                                        name: '16',
                                                        value: '16',
                                                      },
                                                      {
                                                        name: '17',
                                                        value: '17',
                                                      },
                                                      {
                                                        name: '18',
                                                        value: '18',
                                                      },
                                                      {
                                                        name: '19',
                                                        value: '19',
                                                      },
                                                      {
                                                        name: '20',
                                                        value: '20',
                                                      },
                                                      {
                                                        name: '21',
                                                        value: '21',
                                                      },
                                                      {
                                                        name: '22',
                                                        value: '22',
                                                      },
                                                      {
                                                        name: '23',
                                                        value: '23',
                                                      },
                                                      {
                                                        name: '24',
                                                        value: '24',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option: 'appBarVariant',
                                                      comparator: 'EQ',
                                                      value: 'elevation',
                                                    },
                                                  },
                                                },
                                                {
                                                  label: 'Square',
                                                  key: 'square',
                                                  value: true,
                                                  type: 'TOGGLE',
                                                },
                                                {
                                                  label: 'Size',
                                                  key: 'toolbarVariant',
                                                  value: 'regular',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'DROPDOWN',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Regular',
                                                        value: 'regular',
                                                      },
                                                      {
                                                        name: 'Dense',
                                                        value: 'dense',
                                                      },
                                                    ],
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
                                                  value: ['AppBar'],
                                                  configuration: {
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'advancedSettings',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                              ],
                                              descendants: [
                                                {
                                                  name: 'Button',
                                                  style: {
                                                    overwrite: {
                                                      backgroundColor: {
                                                        type: 'STATIC',
                                                        value: 'transparent',
                                                      },
                                                      boxShadow: 'none',
                                                      color: {
                                                        type: 'THEME_COLOR',
                                                        value: 'white',
                                                      },
                                                      fontFamily: 'Roboto',
                                                      fontSize: '0.875rem',
                                                      fontStyle: 'none',
                                                      fontWeight: '400',
                                                      padding: ['0rem', '0rem'],
                                                      textDecoration: 'none',
                                                      textTransform: 'none',
                                                    },
                                                  },
                                                  options: [
                                                    {
                                                      label:
                                                        'Toggle visibility',
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
                                                      value: ['Menu 1'],
                                                    },
                                                    {
                                                      type: 'CUSTOM',
                                                      label: 'Link to',
                                                      key: 'linkType',
                                                      value: 'internal',
                                                      configuration: {
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Internal page',
                                                            value: 'internal',
                                                          },
                                                          {
                                                            name: 'External page',
                                                            value: 'external',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                    {
                                                      value: '',
                                                      label: 'Page',
                                                      key: 'linkTo',
                                                      type: 'ENDPOINT',
                                                      configuration: {
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'internal',
                                                        },
                                                      },
                                                    },
                                                    {
                                                      value: [''],
                                                      label: 'URL',
                                                      key: 'linkToExternal',
                                                      type: 'VARIABLE',
                                                      configuration: {
                                                        placeholder:
                                                          'Starts with https:// or http://',
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'external',
                                                        },
                                                      },
                                                    },
                                                    {
                                                      value: '_self',
                                                      label: 'Open in',
                                                      key: 'openLinkToExternal',
                                                      type: 'CUSTOM',
                                                      configuration: {
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'external',
                                                        },
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Current Tab',
                                                            value: '_self',
                                                          },
                                                          {
                                                            name: 'New Tab',
                                                            value: '_blank',
                                                          },
                                                        ],
                                                      },
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
                                                          {
                                                            name: 'Large',
                                                            value: 'large',
                                                          },
                                                          {
                                                            name: 'Medium',
                                                            value: 'medium',
                                                          },
                                                          {
                                                            name: 'Small',
                                                            value: 'small',
                                                          },
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
                                                          {
                                                            name: 'Start',
                                                            value: 'start',
                                                          },
                                                          {
                                                            name: 'End',
                                                            value: 'end',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                    {
                                                      value: [
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                        'M',
                                                      ],
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
                                                      label:
                                                        'Toggle tooltip visibility',
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
                                                      label:
                                                        'Tooltip Placement',
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
                                                            value:
                                                              'bottom-start',
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
                                                      label:
                                                        'Tooltip Background',
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
                                                      label:
                                                        'Advanced settings',
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
                                                          option:
                                                            'advancedSettings',
                                                          comparator: 'EQ',
                                                          value: true,
                                                        },
                                                      },
                                                    },
                                                  ],
                                                  descendants: [],
                                                },
                                                {
                                                  name: 'Button',
                                                  style: {
                                                    overwrite: {
                                                      backgroundColor: {
                                                        type: 'STATIC',
                                                        value: 'transparent',
                                                      },
                                                      boxShadow: 'none',
                                                      color: {
                                                        type: 'THEME_COLOR',
                                                        value: 'white',
                                                      },
                                                      fontFamily: 'Roboto',
                                                      fontSize: '0.875rem',
                                                      fontStyle: 'none',
                                                      fontWeight: '400',
                                                      padding: ['0rem', '0rem'],
                                                      textDecoration: 'none',
                                                      textTransform: 'none',
                                                    },
                                                  },
                                                  options: [
                                                    {
                                                      label:
                                                        'Toggle visibility',
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
                                                      value: ['Menu 2'],
                                                    },
                                                    {
                                                      type: 'CUSTOM',
                                                      label: 'Link to',
                                                      key: 'linkType',
                                                      value: 'internal',
                                                      configuration: {
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Internal page',
                                                            value: 'internal',
                                                          },
                                                          {
                                                            name: 'External page',
                                                            value: 'external',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                    {
                                                      value: '',
                                                      label: 'Page',
                                                      key: 'linkTo',
                                                      type: 'ENDPOINT',
                                                      configuration: {
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'internal',
                                                        },
                                                      },
                                                    },
                                                    {
                                                      value: [''],
                                                      label: 'URL',
                                                      key: 'linkToExternal',
                                                      type: 'VARIABLE',
                                                      configuration: {
                                                        placeholder:
                                                          'Starts with https:// or http://',
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'external',
                                                        },
                                                      },
                                                    },
                                                    {
                                                      value: '_self',
                                                      label: 'Open in',
                                                      key: 'openLinkToExternal',
                                                      type: 'CUSTOM',
                                                      configuration: {
                                                        condition: {
                                                          type: 'SHOW',
                                                          option: 'linkType',
                                                          comparator: 'EQ',
                                                          value: 'external',
                                                        },
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Current Tab',
                                                            value: '_self',
                                                          },
                                                          {
                                                            name: 'New Tab',
                                                            value: '_blank',
                                                          },
                                                        ],
                                                      },
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
                                                          {
                                                            name: 'Large',
                                                            value: 'large',
                                                          },
                                                          {
                                                            name: 'Medium',
                                                            value: 'medium',
                                                          },
                                                          {
                                                            name: 'Small',
                                                            value: 'small',
                                                          },
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
                                                          {
                                                            name: 'Start',
                                                            value: 'start',
                                                          },
                                                          {
                                                            name: 'End',
                                                            value: 'end',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                        'M',
                                                      ],
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
                                                      label:
                                                        'Toggle tooltip visibility',
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
                                                      label:
                                                        'Tooltip Placement',
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
                                                            value:
                                                              'bottom-start',
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
                                                      label:
                                                        'Tooltip Background',
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
                                                      label:
                                                        'Advanced settings',
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
                                                          option:
                                                            'advancedSettings',
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
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'Box',
                      ref: {
                        id: '#contentBox',
                      },
                      options: [
                        {
                          value: 'none',
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
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
                            ],
                          },
                        },
                        {
                          value: true,
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
                          value: '100%',
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
                          value: true,
                          label: 'Show background options',
                          key: 'backgroundOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'Light',
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
                          value: 20,
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
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
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
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
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
                      descendants: [],
                    },
                    {
                      name: 'Box',
                      options: [
                        {
                          value: 'none',
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
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
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
                          value: '100%',
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
                          value: true,
                          label: 'Show background options',
                          key: 'backgroundOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'Light',
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
                          value: 20,
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
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
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
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
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
                          name: 'Text',
                          options: [
                            {
                              type: 'VARIABLE',
                              label: 'Content',
                              key: 'content',
                              value: ['Powered by Betty Blocks'],
                              configuration: {
                                as: 'MULTILINE',
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Display Rich Text',
                              key: 'useInnerHtml',
                              value: false,
                            },
                            {
                              value: 'Body1',
                              label: 'Type',
                              key: 'type',
                              type: 'FONT',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Text Alignment',
                              key: 'textAlignment',
                              value: 'center',
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
                              value: ['L', 'L', 'L', 'L'],
                              label: 'Outer space',
                              key: 'outerSpacing',
                              type: 'SIZES',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Link to',
                              key: 'linkType',
                              value: 'internal',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Internal page', value: 'internal' },
                                  { name: 'External page', value: 'external' },
                                ],
                              },
                            },
                            {
                              value: '_self',
                              label: 'Open in',
                              key: 'linkTarget',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Current Tab', value: '_self' },
                                  { name: 'New Tab', value: '_blank' },
                                ],
                              },
                            },
                            {
                              value: '',
                              label: 'Page',
                              key: 'linkTo',
                              type: 'ENDPOINT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'linkType',
                                  comparator: 'EQ',
                                  value: 'internal',
                                },
                              },
                            },
                            {
                              value: [''],
                              label: 'URL',
                              key: 'linkToExternal',
                              type: 'VARIABLE',
                              configuration: {
                                placeholder: 'Starts with https:// or http://',
                                condition: {
                                  type: 'SHOW',
                                  option: 'linkType',
                                  comparator: 'EQ',
                                  value: 'external',
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Styles',
                              key: 'styles',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'COLOR',
                              label: 'Text color',
                              key: 'textColor',
                              value: 'Medium',
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
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variables: [],
  actions: [],
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#activeChangePasswordButton',
        sourceComponentId: '#changePasswordButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#activePersonalDetailsButton',
        sourceComponentId: '#changePasswordButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#changePasswordButton',
        sourceComponentId: '#changePasswordButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#personalDetailsButton',
        sourceComponentId: '#changePasswordButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#changePasswordButton',
        sourceComponentId: '#personalDetailsButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#activeChangePasswordButton',
        sourceComponentId: '#personalDetailsButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#personalDetailsButton',
        sourceComponentId: '#personalDetailsButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#activePersonalDetailsButton',
        sourceComponentId: '#personalDetailsButton',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#personalDetailsTab',
        sourceComponentId: '#personalDetailsButton',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#changePasswordTab',
        sourceComponentId: '#changePasswordButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#personalDetailsSuccessAlert',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onActionError',
      ref: {
        targetComponentId: '#personalDetailsErrorAlert',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#personalDetailsSuccessAlert',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#personalDetailsErrorAlert',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#saveProfileDetailsButton',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onActionDone',
      ref: {
        targetComponentId: '#saveProfileDetailsButton',
        sourceComponentId: '#editProfileDetailsForm',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#passwordSuccessAlert',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onActionError',
      ref: {
        targetComponentId: '#passwordErrorAlert',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#passwordSuccessAlert',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#passwordErrorAlert',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#savePasswordButton',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onActionDone',
      ref: {
        targetComponentId: '#savePasswordButton',
        sourceComponentId: '#updatePasswordForm',
      },
      type: 'Custom',
    },
  ],
}))();
