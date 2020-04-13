(() => ({
  name: 'ListSubheader',
  icon: 'OrderedListIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'ListSubheader',
      options: [
        {
          type: 'TEXT',
          key: 'text',
          label: 'Sub header',
          value: 'Header',
        },
        {
          type: 'TOGGLE',
          key: 'inset',
          label: 'Inset',
          value: true,
        },
      ],
      descendants: [],
    },
  ],
}))();
