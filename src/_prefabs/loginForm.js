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
  interactions: [
    {
      name: 'login',
      sourceEvent: 'onActionSuccess',
      ref: {
        sourceComponentId: '#formId',
      },
      parameters: [],
      type: 'Global',
    },
  ],
  structure: [
    {
      name: 'LoginForm',
      ref: {
        id: '#formId',
      },
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
