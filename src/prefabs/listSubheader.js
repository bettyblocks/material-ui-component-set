(() => ({
  name: 'List Subheader',
  icon: 'OrderedListIcon',
  category: 'LIST',
  keywords: ['List', 'sub', 'header', 'subheader', 'listsubheader'],
  structure: [
    {
      name: 'ListSubheader',
      options: [
        {
          type: 'VARIABLE',
          key: 'text',
          label: 'Sub header',
          value: ['Header'],
        },
        {
          type: 'TOGGLE',
          key: 'inset',
          label: 'Inset',
          value: true,
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'Transparent',
        },
        {
          type: 'COLOR',
          label: 'Text color',
          key: 'textColor',
          value: 'Black',
        },
      ],
      descendants: [],
    },
  ],
}))();
