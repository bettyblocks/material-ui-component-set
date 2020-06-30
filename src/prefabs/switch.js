(() => ({
  name: 'Switch',
  icon: 'CheckboxIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Switch',
      options: [
        {
          value: false,
          label: 'Disabled?',
          key: 'isDisabled',
          type: 'TOGGLE',
          configuration: {},
        },
        {
          value: false,
          label: 'Required?',
          key: 'isRequired',
          type: 'TOGGLE',
          configuration: {},
        },
        {
          value: false,
          label: 'Checked?',
          key: 'isChecked',
          type: 'TOGGLE',
          configuration: {},
        },
        {
          label: 'Label?',
          key: 'hasLabel',
          value: false,
          type: 'TOGGLE',
          configuration: {},
        },
        {
          value: ['Label name'],
          label: 'Label name',
          key: 'label',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'hasLabel',
              comparator: 'EQ',
              value: false,
            },
          },
        },
        {
          label: 'Label placement',
          key: 'labelPlacement',
          value: 'start',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'Top', value: 'top' },
              { name: 'End', value: 'end' },
              { name: 'Bottom', value: 'bottom' },
            ],
            condition: {
              type: 'HIDE',
              option: 'hasLabel',
              comparator: 'EQ',
              value: false,
            },
          },
        },
        {
          value: ['Name'],
          label: 'Name',
          key: 'name',
          type: 'VARIABLE',
          configuration: {},
        },
        {
          value: ['Value'],
          label: 'Value',
          key: 'value',
          type: 'VARIABLE',
          configuration: {},
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
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
            ],
          },
        },
        {
          label: 'Color',
          key: 'color',
          value: 'default',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Primary', value: 'primary' },
              { name: 'Secondary', value: 'secondary' },
              { name: 'Default', value: 'default' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
