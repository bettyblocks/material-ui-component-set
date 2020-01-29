(() => ({
  name: 'TextInput',
  icon: 'TextInputIcon',
  category: 'FORM',
  structure: [
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
  ],
}))();
