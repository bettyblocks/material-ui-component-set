(() => ({
  name: 'DrawerContainer',
  icon: 'RowColumnIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'DrawerContainer',
      options: [
        {
          type: 'COLOR',
          label: 'Theme background color',
          key: 'themeBgColor',
          value: 'Transparent',
        },
        {
          type: 'TEXT',
          label: 'Background color overwrite',
          key: 'bgColor',
          value: '',
        },
      ],
      descendants: [],
    },
  ],
}))();
