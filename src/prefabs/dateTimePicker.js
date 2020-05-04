(() => ({
  name: 'DateTimePicker',
  icon: 'DateTimePickerIcon',
  category: 'FORM',
  structure: [
    {
      name: 'DateTimePicker',
      options: [
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          value: ['Label'],
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
          label: 'Type',
          key: 'type',
          value: 'date',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Date', value: 'date' },
              { name: 'Time', value: 'time' },
              { name: 'DateTime', value: 'datetime' },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Disable Toolbar',
          key: 'disableToolbar',
          value: false,
        },
        {
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
        },
        {
          value: 'MM/dd/yyyy',
          label: 'Format',
          key: 'dateFormat',
          type: 'TEXT',
          configuration: {
            placeholder: 'MM/dd/yyyy',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'date',
            },
          },
        },
        {
          value: 'HH:mm:ss',
          label: 'Format',
          key: 'timeFormat',
          type: 'TEXT',
          configuration: {
            placeholder: 'HH:mm:ss',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'time',
            },
          },
        },
        {
          value: 'MM/dd/yyyy HH:mm:ss',
          label: 'Format',
          key: 'dateTimeFormat',
          type: 'TEXT',
          configuration: {
            placeholder: 'MM/dd/yyyy HH:mm:ss',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'datetime',
            },
          },
        },
        {
          value: '',
          label: 'Input',
          key: 'actionInputId',
          type: 'ACTION_INPUT',
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
      ],
      descendants: [],
    },
  ],
}))();
