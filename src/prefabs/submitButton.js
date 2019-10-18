(() => ({
  name: 'SubmitButton',
  icon: 'SubmitButtonIcon',
  category: 'FORM',
  structure: [
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
}))();
