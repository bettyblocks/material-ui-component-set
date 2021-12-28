(() => ({
  category: 'FORM',
  icon: 'CheckboxIcon',
  name: 'CheckboxInput',
  structure: [
    {
      name: 'CheckboxInput',
      options: [
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Checkbox',
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
      //         ref: ['options', 'label'],
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
