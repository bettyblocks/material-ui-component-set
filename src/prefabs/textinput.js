(() => ({
  category: 'FORM',
  icon: 'TextInputIcon',
  name: 'TextInput',
  structure: [
    {
      name: 'TextInput',
      options: [
        {
          key: 'name',
          label: 'Name',
          type: 'TEXT',
          value: 'TextInput',
        },
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Text',
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
              ref: ['options', 'name'],
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
