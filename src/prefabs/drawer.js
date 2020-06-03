(() => ({
  name: 'Drawer',
  icon: 'DrawerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Drawer',
      options: [
        {
          type: 'TOGGLE',
          label: 'Responsive',
          key: 'isResponsive',
          value: false,
        },
        {
          type: 'SIZE',
          label: 'Drawer Width',
          key: 'drawerWidth',
          value: '200px',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'left',
          label: 'Alignment',
          key: 'anchor',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Top', value: 'top' },
              { name: 'Right', value: 'right' },
              { name: 'Bottom', value: 'bottom' },
            ],
          },
        },
      ],
      descendants: [
        {
          name: 'DrawerBar',
          options: [],
          descendants: [],
        },
        {
          name: 'DrawerContainer',
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
              name: 'AppBar',
              options: [
                {
                  label: 'Background color',
                  key: 'backgroundColor',
                  value: 'Primary',
                  type: 'COLOR',
                },
                {
                  label: 'Text color',
                  key: 'color',
                  value: 'White',
                  type: 'COLOR',
                },
                {
                  label: 'Position',
                  key: 'position',
                  value: 'static',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Fixed',
                        value: 'fixed',
                      },
                      {
                        name: 'Absolute',
                        value: 'absolute',
                      },
                      {
                        name: 'Sticky',
                        value: 'sticky',
                      },

                      {
                        name: 'Static',
                        value: 'static',
                      },
                      {
                        name: 'Relative',
                        value: 'relative',
                      },
                    ],
                  },
                },
                {
                  label: 'Title',
                  key: 'title',
                  value: ['App Bar'],
                  type: 'VARIABLE',
                },
                {
                  label: 'Logo',
                  key: 'logoSource',
                  value: [],
                  type: 'VARIABLE',
                },
                {
                  label: 'Align items',
                  key: 'alignItems',
                  value: 'right',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Left',
                        value: 'left',
                      },
                      {
                        name: 'Right',
                        value: 'right',
                      },
                    ],
                  },
                },
                {
                  label: 'Page',
                  key: 'endpoint',
                  value: '',
                  type: 'ENDPOINT',
                },
                {
                  label: 'Variant',
                  key: 'appBarVariant',
                  value: 'elevation',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Elevation',
                        value: 'elevation',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
                    ],
                  },
                },
                {
                  label: 'Elevation',
                  key: 'elevation',
                  value: '1',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                      { name: '13', value: '13' },
                      { name: '14', value: '14' },
                      { name: '15', value: '15' },
                      { name: '16', value: '16' },
                      { name: '17', value: '17' },
                      { name: '18', value: '18' },
                      { name: '19', value: '19' },
                      { name: '20', value: '20' },
                      { name: '21', value: '21' },
                      { name: '22', value: '22' },
                      { name: '23', value: '23' },
                      { name: '24', value: '24' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'appBarVariant',
                      comparator: 'EQ',
                      value: 'elevation',
                    },
                  },
                },
                {
                  label: 'Square',
                  key: 'square',
                  value: true,
                  type: 'TOGGLE',
                },
                {
                  label: 'Size',
                  key: 'toolbarVariant',
                  value: 'regular',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Regular',
                        value: 'regular',
                      },
                      {
                        name: 'Dense',
                        value: 'dense',
                      },
                    ],
                  },
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
