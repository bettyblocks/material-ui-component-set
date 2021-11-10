(() => ({
  name: 'Rating',
  icon: 'RatingIcon',
  category: 'FORM',
  keywords: ['form', 'input', 'rating'],
  structure: [
    {
      name: 'Rating',
      options: [
        {
          value: { label: ['Rating'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['decimal'],
          },
        },
        {
          value: false,
          label: 'Hide label',
          key: 'hideLabel',
          type: 'TOGGLE',
        },
        {
          type: 'CUSTOM',
          label: 'Number of icons',
          key: 'numberOfIcons',
          value: '5',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
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
          value: false,
          label: 'Is read only',
          key: 'readonly',
          type: 'TOGGLE',
        },
        {
          type: 'CUSTOM',
          label: 'Precision',
          key: 'precision',
          value: '1',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Half',
                value: '0.5',
              },
              {
                name: 'Full',
                value: '1',
              },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Size',
          key: 'size',
          value: 'medium',
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
              {
                name: 'Custom',
                value: 'custom',
              },
            ],
          },
        },
        {
          type: 'SIZE',
          label: 'Custom size',
          key: 'customSize',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'size',
              comparator: 'EQ',
              value: 'custom',
            },
          },
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
        },
        {
          label: 'Icon',
          key: 'icon',
          value: 'Star',
          type: 'ICON',
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
          label: 'Empty icon color',
          key: 'emptyColor',
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
          label: 'Filled icon color',
          key: 'filledColor',
          value: 'Warning',
          configuration: {
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
          value: ['Rating'],
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
}))();
