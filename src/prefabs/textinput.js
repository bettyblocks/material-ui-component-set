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
        {
          value: false,
          label: 'Required',
          key: 'required',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Validation options',
          key: 'validationOptions',
          type: 'TOGGLE',
        },
        {
          label: 'Validation pattern',
          key: 'pattern',
          value: '',
          type: 'TEXT',
          configuration: {
            placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Min length',
          key: 'minlength',
          value: '',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Max length',
          key: 'maxlength',
          value: '',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
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
