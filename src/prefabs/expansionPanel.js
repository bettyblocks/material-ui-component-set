(() => ({
  name: 'ExpansionPanel',
  icon: 'AccordionItemIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'ExpansionPanel',
      options: [
        {
          key: 'title',
          label: 'Title',
          value: ['Title'],
          type: 'VARIABLE',
        },
        {
          value: false,
          label: 'Disabled',
          key: 'disabled',
          type: 'TOGGLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
