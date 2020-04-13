(() => ({
  name: 'AppBar',
  icon: 'NavbarIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'AppBar',
      options: [
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'Primary',
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
      ],
      descendants: [
        {
          name: 'Toolbar',
          options: [
            {
              label: 'Title',
              key: 'title',
              value: ['App Bar'],
              type: 'VARIABLE',
            },
            {
              label: 'Logo',
              key: 'logo',
              value: '',
              type: 'TEXT',
            },
            {
              label: 'Page',
              key: 'endpoint',
              value: '',
              type: 'ENDPOINT',
            },
          ],
          descendants: [
            {
              name: 'Button',
              options: [
                {
                  label: 'Visible',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Menu 1'],
                },
                {
                  type: 'CUSTOM',
                  label: 'Link to',
                  key: 'linkType',
                  value: 'Internal',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Internal page', value: 'Internal' },
                      { name: 'External page', value: 'External' },
                      { name: 'Action', value: 'Action' },
                    ],
                  },
                },
                {
                  value: '',
                  label: 'Page',
                  key: 'linkTo',
                  type: 'ENDPOINT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'Internal',
                    },
                  },
                },
                {
                  value: '',
                  label: 'URL',
                  key: 'linkToExternal',
                  type: 'TEXT',
                  configuration: {
                    placeholder: 'Starts with https:// or http://',
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'External',
                    },
                  },
                },
                {
                  value: '',
                  label: 'Action',
                  key: 'ActionId',
                  type: 'ACTION',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'Action',
                    },
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'variant',
                  key: 'text',
                  value: 'contained',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      { name: 'Outlined', value: 'outlined' },
                      { name: 'Contained', value: 'contained' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
                },
                {
                  value: 'medium',
                  label: 'Size',
                  key: 'size',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
                    ],
                  },
                },
                {
                  label: 'StartIcon',
                  key: 'startIcon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: '',
                        value: 'None',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                    ],
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Text color',
                  key: 'textColor',
                  value: 'White',
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'background',
                  value: 'Success',
                },
                {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                  type: 'TOGGLE',
                },
              ],
              descendants: [],
            },
            {
              name: 'Button',
              options: [
                {
                  label: 'Visible',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Menu 2'],
                },
                {
                  type: 'CUSTOM',
                  label: 'Link to',
                  key: 'linkType',
                  value: 'Internal',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Internal page', value: 'Internal' },
                      { name: 'External page', value: 'External' },
                      { name: 'Action', value: 'Action' },
                    ],
                  },
                },
                {
                  value: '',
                  label: 'Page',
                  key: 'linkTo',
                  type: 'ENDPOINT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'Internal',
                    },
                  },
                },
                {
                  value: '',
                  label: 'URL',
                  key: 'linkToExternal',
                  type: 'TEXT',
                  configuration: {
                    placeholder: 'Starts with https:// or http://',
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'External',
                    },
                  },
                },
                {
                  value: '',
                  label: 'Action',
                  key: 'ActionId',
                  type: 'ACTION',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'Action',
                    },
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'variant',
                  key: 'text',
                  value: 'contained',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      { name: 'Outlined', value: 'outlined' },
                      { name: 'Contained', value: 'contained' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
                },
                {
                  value: 'medium',
                  label: 'Size',
                  key: 'size',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
                    ],
                  },
                },
                {
                  label: 'StartIcon',
                  key: 'startIcon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: '',
                        value: 'None',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                    ],
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Text color',
                  key: 'textColor',
                  value: 'White',
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'background',
                  value: 'Success',
                },
                {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                  type: 'TOGGLE',
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
