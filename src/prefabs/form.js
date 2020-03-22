(() => ({
  name: 'Form',
  icon: 'FormIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Form',
      options: [
        {
          value: '',
          label: 'Action',
          key: 'actionId',
          type: 'ACTION',
          configuration: {
            apiVersion: 'v1',
          },
        },
        {
          value: 'Thanks for submitting the form!',
          label: 'Success message',
          key: 'formSuccessMessage',
          type: 'TEXT',
        },
        {
          value: 'Failed to submit the form!',
          label: 'Error message',
          key: 'formErrorMessage',
          type: 'TEXT',
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [
        {
          name: 'DataContainer',
          options: [
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
          ],
          descendants: [
            {
              name: 'TextField',
              options: [
                {
                  value: 'label',
                  label: 'Label',
                  key: 'label',
                  type: 'TEXT',
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
                  value: '',
                  label: 'Placeholder',
                  key: 'placeholder',
                  type: 'TEXT',
                },
                {
                  value: '',
                  label: 'Helper text',
                  key: 'helperText',
                  type: 'TEXT',
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
              ],
              descendants: [],
            },
          ],
        },
        {
          name: 'ButtonGroup',
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
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                  { name: 'Justified', value: 'space-between' },
                ],
              },
            },
          ],
          descendants: [
            {
              name: 'Button',
              options: [
                {
                  label: 'Visible',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
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
                  value: ['Button'],
                },
                {
                  type: 'CUSTOM',
                  label: 'variant',
                  key: 'variant',
                  value: 'contained',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      { name: 'Outlined', value: 'outlined' },
                      { name: 'Contained', value: 'contained' },
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
                  value: 'medium',
                  label: 'Size',
                  key: 'size',
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
                  label: 'StartIcon',
                  key: 'startIcon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: '',
                        value: 'None',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                    ],
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Text color',
                  key: 'textColor',
                  value: 'White',
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'background',
                  value: 'Success',
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
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
