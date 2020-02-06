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
          name: 'SubmitButton',
          options: [
            {
              value: 'Submit',
              label: 'Button text',
              key: 'submitButtonText',
              type: 'TEXT',
            },
            {
              value: 'Primary',
              label: 'Button Color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
