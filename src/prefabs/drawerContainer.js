(() => ({
  name: 'Drawer Container',
  icon: 'RowColumnIcon',
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'container', 'drawercontainer'],
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
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
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
