(() => ({
  category: 'FORM',
  icon: 'CheckboxIcon',
  name: 'CheckboxInput',
  structure: [
    {
      name: 'CheckboxInput',
      options: [
        {
          key: 'name',
          label: 'Name',
          type: 'TEXT',
          value: 'CheckboxInput',
        },
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Checkbox',
        },
        {
          key: 'actionVariableId',
          label: 'Action Variable Id',
          type: 'TEXT',
          value: '',
        },
      ],
      $onUpdate: [
        {
          query: 'UpdateActionVariable',
          input: {
            id: {
              ref: ['options', 'actionVariableId'],
            },
            name: {
              ref: ['options', 'label'],
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
