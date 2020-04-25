(() => ({
  name: 'Modal',
  icon: 'PanelIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Modal',
      options: [
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
      descendants: [
        {
          name: 'Row',
          options: [
            {
              type: 'CUSTOM',
              label: 'Width',
              key: 'maxRowWidth',
              value: 'XL',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'S', value: 'S' },
                  { name: 'M', value: 'M' },
                  { name: 'L', value: 'L' },
                  { name: 'XL', value: 'XL' },
                  { name: 'Full', value: 'Full' },
                ],
              },
            },
            {
              value: '',
              label: 'Height',
              key: 'rowHeight',
              type: 'TEXT',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: 'transparent',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
          ],
          descendants: [
          ],
        },
      ],
    },
  ],
}))();
