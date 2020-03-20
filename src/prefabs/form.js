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
          name: 'TextInput',
          options: [
            {
              value: 'Label',
              label: 'Label',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: 'text',
              label: 'Content format',
              key: 'formComponentType',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
                  { name: 'Number', value: 'number' },
                  { name: 'Password', value: 'password' },
                  { name: 'Email', value: 'email' },
                ],
              },
            },
            {
              value: false,
              label: 'Required',
              key: 'formComponentRequired',
              type: 'TOGGLE',
            },
            {
              value: '',
              label: 'Input',
              key: 'actionInputId',
              type: 'ACTION_INPUT',
            },
          ],
          descendants: [],
        },
        {
          name: 'TextInput',
          options: [
            {
              value: 'Label',
              label: 'Label',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: 'text',
              label: 'Content format',
              key: 'formComponentType',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
                  { name: 'Number', value: 'number' },
                  { name: 'Password', value: 'password' },
                  { name: 'Email', value: 'email' },
                ],
              },
            },
            {
              value: false,
              label: 'Required',
              key: 'formComponentRequired',
              type: 'TOGGLE',
            },
            {
              value: '',
              label: 'Input',
              key: 'actionInputId',
              type: 'ACTION_INPUT',
            },
          ],
          descendants: [],
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
              name: 'SubmitButton',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Button'],
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
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
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
