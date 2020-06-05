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
        {
          value: false,
          label: 'Required',
          key: 'required',
          type: 'TOGGLE',
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
      ],
      descendants: [],
    },
  ],
}))();
