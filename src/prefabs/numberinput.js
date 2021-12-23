(() => ({
  category: 'FORM',
  icon: 'NumberInputIcon',
  name: 'NumberInput',
  beforeCreate: ({
    close,
    components: { CreateFormInputWizard },
    prefab,
    save,
  }) => {
    return (
      <CreateFormInputWizard
        actionVariableOption="actionVariableId"
        actionVariableType="Integer"
        close={close}
        labelOptionKey="label"
        nameOptionKey="name"
        prefab={prefab}
        save={save}
      />
    );
  },
  structure: [
    {
      name: 'NumberInput',
      options: [
        {
          key: 'name',
          label: 'Name',
          type: 'TEXT',
          value: 'NumberInput',
        },
        {
          key: 'label',
          label: 'Label',
          type: 'TEXT',
          value: 'Number',
        },
        {
          key: 'actionVariableId',
          label: 'Action variable',
          type: 'ACTION_JS_VARIABLE',
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
              ref: ['options', 'actionVariableId'],
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
