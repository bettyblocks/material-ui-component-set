(() => ({
  name: 'Checkbox',
  icon: 'CheckboxIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Checkbox',
      options: [
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          value: { label: ['Label'] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['boolean'],
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
      ],
      descendants: [],
    },
  ],
}))();
