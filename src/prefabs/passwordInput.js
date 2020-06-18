(() => ({
  name: 'PasswordInput',
  icon: 'PasswordInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'TextField',
      options: [
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          value: ['Password'],
          label: 'Label',
          key: 'label',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'property',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: [],
          label: 'Label',
          key: 'propertyLabelOverride',
          type: 'VARIABLE',
          configuration: {
            placeholder: 'Label of property',
            condition: {
              type: 'HIDE',
              option: 'property',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
        },
        {
          value: '',
          label: 'Input',
          key: 'actionInputId',
          type: 'ACTION_INPUT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'property',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: false,
          label: 'Required',
          key: 'required',
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
      ],
      descendants: [],
    },
  ],
}))();
