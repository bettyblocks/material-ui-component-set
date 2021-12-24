(() => ({
  category: 'FORM',
  icon: 'CreateFormIcon',
  name: 'CreateForm',
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
        {
          key: 'modelId',
          label: 'Model',
          type: 'MODEL',
          value: '',
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'modelId',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
