(() => ({
  name: 'Drawer',
  icon: 'DrawerIcon',
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar'],
  structure: [
    {
      name: 'Drawer',
      options: [
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
          value: 'persistent',
          label: 'Drawer type',
          key: 'drawerType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Persistent', value: 'persistent' },
              { name: 'Temporary', value: 'temporary' },
            ],
          },
        },
        {
          value: 'sm',
          label: 'Responsively temporary on',
          key: 'breakpoint',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Permanent', value: 'xs' },
              { name: 'Mobile', value: 'sm' },
              { name: 'Tablet portrait', value: 'md' },
              { name: 'Tablet landscape', value: 'lg' },
            ],
            condition: {
              type: 'SHOW',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'persistent',
            },
          },
        },
        {
          value: 'left',
          label: 'Alignment',
          key: 'temporaryAnchor',
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
            condition: {
              type: 'SHOW',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'temporary',
            },
          },
        },
        {
          value: 'left',
          label: 'Alignment',
          key: 'persistentAnchor',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Right', value: 'right' },
            ],
            condition: {
              type: 'HIDE',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'temporary',
            },
          },
        },
        {
          label: 'Toggle visibility',
          key: 'visibility',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
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
          value: ['Drawer'],
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
              value: ['DrawerContainer'],
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
}))();
