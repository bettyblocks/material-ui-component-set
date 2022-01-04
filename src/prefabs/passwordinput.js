(() => ({
  category: 'FORM',
  icon: 'PasswordInputIcon',
  name: 'PasswordInput',
  structure: [
    {
      name: 'PasswordInput',
      options: [
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Password',
        },
        {
          key: 'actionVariableId',
          label: 'Name',
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
