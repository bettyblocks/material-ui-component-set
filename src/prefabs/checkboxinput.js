(() => ({
  category: 'FORM',
  icon: 'CheckboxIcon',
  name: 'CheckboxInput',
  beforeCreate: ({
    close,
    components: { CreateFormInputWizard },
    prefab,
    save,
  }) => {
    return (
      <CreateFormInputWizard
        actionVariableOption="actionVariableId"
        actionVariableType="Boolean"
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
          label: 'Action variable',
          type: 'ACTION_JS_VARIABLE',
          value: '',
        },
      ],
<<<<<<< HEAD
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
=======
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
>>>>>>> 831f7cf817a2245d034caee4b57978de30a9acdc
      descendants: [],
    },
  ],
}))();
