(() => ({
  name: 'recaptcha',
  icon: 'FormIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Recaptcha',
      options: [
        {
          value: '',
          label: 'Site key',
          key: 'sitekey',
          type: 'TEXT',
        },
      ],
      descendants: [],
    },
  ],
}))();
