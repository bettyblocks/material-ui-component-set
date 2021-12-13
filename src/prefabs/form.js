(() => ({
  category: 'FORM',
  icon: 'CreateFormIcon',
  name: 'Form',
  beforeCreate: ({ close, components: { CreateFormWizard }, prefab, save }) => (
    <CreateFormWizard close={close} prefab={prefab} save={save} />
  ),
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
