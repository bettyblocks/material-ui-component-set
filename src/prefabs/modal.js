(() => ({
  name: 'Modal',
  icon: 'PanelIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Modal',
      options: [
        {
          value: true,
          label: 'Visible in dev?',
          key: 'isVisibleInDev',
          type: 'TOGGLE',
        },
        {
          value: 'Primary',
          label: 'Panel Color',
          key: 'panelColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
