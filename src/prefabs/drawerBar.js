(() => ({
  name: 'Drawer Sidebar',
  icon: 'RowColumnIcon',
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar', 'drawersidebar'],
  structure: [
    {
      name: 'DrawerSidebar',
      options: [
        {
          type: 'COLOR',
          label: 'Theme background color',
          key: 'themeBgColor',
          value: 'White',
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
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['DrawerSidebar'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [
        {
          name: 'List',
          options: [
            {
              value: '',
              label: 'Model',
              key: 'model',
              type: 'MODEL',
            },
            {
              value: {},
              label: 'Filter',
              key: 'filter',
              type: 'FILTER',
              configuration: {
                dependsOn: 'model',
              },
            },
            {
              type: 'COLOR',
              label: 'Background color',
              key: 'backgroundColor',
              value: 'Transparent',
            },
            {
              type: 'TOGGLE',
              label: 'Disable padding',
              key: 'disablePadding',
              value: false,
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              type: 'TOGGLE',
              label: 'Dense',
              key: 'dense',
              value: false,
            },
            {
              value: false,
              label: 'Advanced settings',
              key: 'advancedSettings',
              type: 'TOGGLE',
            },
            {
              type: 'VARIABLE',
              label: 'Test attribute',
              key: 'dataComponentAttribute',
              value: ['List'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'advancedSettings',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
          ],
          descendants: [
            {
              name: 'ListItem',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Primary text',
                  key: 'primaryText',
                  value: ['Title'],
                },
                {
                  type: 'VARIABLE',
                  label: 'Secondary text',
                  key: 'secondaryText',
                  value: ['Secondary text'],
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'backgroundColor',
                  value: 'Transparent',
                },
                {
                  type: 'COLOR',
                  label: 'Title color',
                  key: 'titleColor',
                  value: 'Black',
                },
                {
                  type: 'COLOR',
                  label: 'Icon color',
                  key: 'iconColor',
                  value: 'Black',
                },
                {
                  type: 'COLOR',
                  label: 'Subtitle color',
                  key: 'subtitleColor',
                  value: 'Secondary',
                },
                {
                  value: '',
                  label: 'Page',
                  key: 'linkTo',
                  type: 'ENDPOINT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Align items',
                  key: 'alignItems',
                  value: 'center',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                    ],
                  },
                },
                {
                  label: 'Icon',
                  key: 'icon',
                  value: 'None',
                  type: 'ICON',
                },
                {
                  value: false,
                  label: 'Show icon as avatar',
                  key: 'avatar',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'icon',
                      comparator: 'EQ',
                      value: 'None',
                    },
                  },
                },
                {
                  type: 'TOGGLE',
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable gutters',
                  key: 'disableGutters',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Dense',
                  key: 'dense',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Divider',
                  key: 'divider',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Selected',
                  key: 'selected',
                  value: false,
                },
                {
                  value: false,
                  label: 'Advanced settings',
                  key: 'advancedSettings',
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Test attribute',
                  key: 'dataComponentAttribute',
                  value: ['ListItem'],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'advancedSettings',
                      comparator: 'EQ',
                      value: true,
                    },
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
