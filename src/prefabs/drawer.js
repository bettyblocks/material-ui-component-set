(() => ({
  name: 'Drawer',
  icon: 'PanelIcon',
  category: 'DRAWER & LIST',
  structure: [
    {
      name: 'Drawer',
      options: [
        {
          value: true,
          label: 'Open on start?',
          key: 'isOpenOnStart',
          type: 'TOGGLE',
        },
        {
          value: true,
          label: 'Visible in dev?',
          key: 'isVisibleInDev',
          type: 'TOGGLE',
        },
        {
          type: 'CUSTOM',
          label: 'Anchor',
          key: 'anchor',
          value: 'left',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Right', value: 'right' },
              { name: 'Top', value: 'top' },
              { name: 'Bottom', value: 'bottom' },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Title',
          key: 'panelTitle',
          value: ['Title'],
        },
        {
          value: 'White',
          label: 'Title Color',
          key: 'color',
          type: 'COLOR',
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
