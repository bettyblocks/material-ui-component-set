(() => ({
  category: 'FORM',
  icon: 'CreateFormIcon',
  name: 'Form',
  beforeCreate: ({
    close,
    components: { CreateFormWizard },
    prefab,
    prefabs,
    save,
  }) => {
    return (
      <CreateFormWizard
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
