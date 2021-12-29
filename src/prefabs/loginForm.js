(() => ({
  category: 'FORM',
  icon: 'LoginFormIcon',
  name: 'Login Form',
  beforeCreate: ({
    close,
    components: { CreateLoginFormWizard },
    prefab,
    prefabs,
    save,
  }) => {
    return (
      <CreateLoginFormWizard
        close={close}
        prefab={prefab}
        prefabs={prefabs}
        save={save}
      />
    );
  },
  structure: [
    {
      name: 'Form',
      options: [
        {
          key: 'actionId',
          label: 'Action',
          type: 'ACTION_JS',
          value: '',
        },
      ],
      descendants: [],
    },
  ],
}))();
