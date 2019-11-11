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
          label: 'Post endpoint',
          key: 'resourceUrl',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Redirect after submit',
          key: 'redirect',
          type: 'ENDPOINT',
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
              value: '',
              label: 'Name',
              key: 'formComponentName',
              type: 'TEXT',
            },
            {
              value: 'Label text',
              label: 'Label text',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: '',
              label: 'Input text',
              key: 'formComponentValue',
              type: 'TEXT',
            },
            {
              value: false,
              label: 'Required',
              key: 'formComponentRequired',
              type: 'TOGGLE',
            },
          ],
          descendants: [],
        },
        {
          name: 'TextInput',
          options: [
            {
              value: '',
              label: 'Name',
              key: 'formComponentName',
              type: 'TEXT',
            },
            {
              value: 'Label text',
              label: 'Label text',
              key: 'formComponentLabel',
              type: 'TEXT',
            },
            {
              value: '',
              label: 'Input text',
              key: 'formComponentValue',
              type: 'TEXT',
            },
            {
              value: false,
              label: 'Required',
              key: 'formComponentRequired',
              type: 'TOGGLE',
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
}))();
