(() => ({
  name: 'Drawer',
  icon: 'DrawerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Drawer',
      options: [],
      descendants: [
        {
          name: 'drawerBar',
          options: [
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '200px',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'COLOR',
              label: 'Background color',
              key: 'bgColor',
              value: 'Transparent',
            },
          ],
          descendants: [],
        },
        {
          name: 'drawerContainer',
          options: [
            {
              type: 'COLOR',
              label: 'Background color',
              key: 'bgColor',
              value: 'Transparent',
            },
            {
              type: 'SIZES',
              label: 'Padding',
              key: 'padding',
              value: ['None', 'M', 'M', 'M'],
            },
          ],
          descendants: [
            {
              name: 'drawerNav',
              options: [
                {
                  type: 'SIZE',
                  label: 'Height',
                  key: 'height',
                  value: '60px',
                  configuration: {
                    as: 'UNIT',
                  },
                },
                {
                  type: 'SIZES',
                  label: 'Margin',
                  key: 'margin',
                  value: ['0', '0', 'M', '0'],
                },
                {
                  type: 'SIZES',
                  label: 'Padding',
                  key: 'padding',
                  value: ['S', 'S', 'S', 'S'],
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'bgColor',
                  value: 'Primary',
                },
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
