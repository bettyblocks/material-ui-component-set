(() => ({
  category: 'FORM',
  icon: 'TextInputIcon',
  name: 'TextInput',
  structure: [
    {
      name: 'TextInput',
      options: [
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Text',
        },
        {
          key: 'name',
          label: 'Name',
          type: 'TEXT',
          value: 'TextInput',
        },
        {
          key: 'actionVariableId',
          label: 'Key',
          type: 'ACTION_JS_VARIABLE',
          value: '',
        },
        {
          key: 'value',
          label: 'Value',
          type: 'VARIABLE',
          value: [],
        },
      ],
      // $onUpdate: [
      //   {
      //     query: 'UpdateActionVariable',
      //     input: {
      //       id: {
      //         ref: ['options', 'actionVariableId'],
      //       },
      //       name: {
      //         ref: ['options', 'name'],
      //       },
      //     },
      //   },
      // ],
      $afterDelete: [
        {
          query: 'DeleteActionVariable',
          input: {
            id: {
              ref: ['options', 'actionVariableId'],
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
