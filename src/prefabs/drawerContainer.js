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
          value: ['M', 'M', 'M', 'M'],
          label: 'Inner space',
          key: 'innerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
