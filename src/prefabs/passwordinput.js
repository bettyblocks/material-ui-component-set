(() => ({
  category: 'FORM',
  icon: 'PasswordInputIcon',
  name: 'PasswordInput',
  beforeCreate: ({
    close,
    components: { CreateFormInputWizard },
    prefab,
    save,
  }) => {
    return (
      <CreateFormInputWizard
        actionVariableOption="actionVariableId"
        actionVariableType="String"
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
