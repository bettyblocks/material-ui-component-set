(() => ({
  name: 'LoginForm',
  icon: 'FormIcon',
  category: 'FORM',
  structure: [
    {
      name: 'LoginForm',
      options: [
        {
          value: '',
          label: 'Action',
          key: 'actionId',
          type: 'ACTION',
        },
        {
          type: 'ENDPOINT',
          label: 'Redirect to endpoint after success',
          key: 'formEndpoint',
          value: '',
        },
        {
          value: "You're logged in!",
          label: 'Success message',
          key: 'formSuccessMessage',
          type: 'TEXT',
        },
        {
          value: 'Failed to login!',
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
              value: 'Email',
              label: 'Label',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: 'email',
              label: 'Content format',
              key: 'formComponentType',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
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
              value: 'Password',
              label: 'Label',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: 'password',
              label: 'Content format',
              key: 'formComponentType',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
                  { name: 'Password', value: 'password' },
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
              value: 'Login',
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
