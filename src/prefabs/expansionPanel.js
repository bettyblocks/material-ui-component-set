(() => ({
  name: 'ExpansionPanel',
  icon: 'AccordionItemIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'ExpansionPanel',
      options: [
        {
          value: 'Expansion Panel',
          label: 'Title',
          key: 'title',
          type: 'TEXT',
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
