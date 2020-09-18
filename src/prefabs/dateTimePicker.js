(() => ({
  name: 'DateTimePicker',
  icon: 'DateTimePickerIcon',
  category: 'FORM',
  structure: [
    {
      name: 'DateTimePicker',
      options: [
        {
          value: { label: ['Label'] },
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
          type: 'CUSTOM',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'label',
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
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
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
      ],
      descendants: [],
    },
  ],
}))();
