(() => ({
  category: 'FORM',
  icon: 'HiddenInputIcon',
  name: 'HiddenInput',
  structure: [
    {
      name: 'HiddenInput',
      options: [
        {
          key: 'actionVariableId',
          label: 'Name',
          type: 'ACTION_JS_VARIABLE',
          value: '',
        },
        {
          key: 'value',
          label: 'Value',
          type: 'PROPERTY',
          value: '',
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
              ref: ['options', 'name'],
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
