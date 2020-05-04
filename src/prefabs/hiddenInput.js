(() => ({
  name: 'HiddenInput',
  icon: 'HiddenInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'HiddenInput',
      options: [
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
      ],
      descendants: [],
    },
  ],
}))();
