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
                      type: 'CUSTOM',
                      label: 'Link to',
                      key: 'linkType',
                      value: 'internal',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Internal page', value: 'internal' },
                          { name: 'External page', value: 'external' },
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
                          value: 'internal',
                        },
                      },
                    },
                    {
                      value: [''],
                      label: 'URL',
                      key: 'linkToExternal',
                      type: 'VARIABLE',
                      configuration: {
                        placeholder: 'Starts with https:// or http://',
                        condition: {
                          type: 'SHOW',
                          option: 'linkType',
                          comparator: 'EQ',
                          value: 'external',
                        },
                      },
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
                      type: 'CUSTOM',
                      label: 'Visual',
                      key: 'avatarOrIcon',
                      value: 'none',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'none' },
                          { name: 'Icon', value: 'icon' },
                          { name: 'Avatar', value: 'avatar' },
                        ],
                      },
                    },
                    {
                      label: 'Icon',
                      key: 'icon',
                      value: 'Person',
                      type: 'ICON',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'avatarOrIcon',
                          comparator: 'EQ',
                          value: 'icon',
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Icon color',
                      key: 'iconColor',
                      value: 'Black',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'avatarOrIcon',
                          comparator: 'EQ',
                          value: 'icon',
                        },
                      },
                    },
                    {
                      value: false,
                      label: 'Show icon as avatar',
                      key: 'avatar',
                      type: 'TOGGLE',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'avatarOrIcon',
                          comparator: 'EQ',
                          value: 'icon',
                        },
                      },
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Avatar URL',
                      key: 'avatarUrl',
                      value: [''],
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'avatarOrIcon',
                          comparator: 'EQ',
                          value: 'avatar',
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
                      label: 'Styles',
                      key: 'styles',
                      type: 'TOGGLE',
                    },
                    {
                      value: '1rem',
                      label: 'Title Font Size',
                      key: 'titleSize',
                      type: 'TEXT',
                      configuration: {
                        as: 'UNIT',
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Title color',
                      key: 'titleColor',
                      value: 'Black',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'CUSTOM',
                      label: 'Title Font weight',
                      key: 'titleWeight',
                      value: '400',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: '100', value: '100' },
                          { name: '200', value: '200' },
                          { name: '300', value: '300' },
                          { name: '400', value: '400' },
                          { name: '500', value: '500' },
                          { name: '600', value: '600' },
                          { name: '700', value: '700' },
                          { name: '800', value: '800' },
                          { name: '900', value: '900' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: '0.875rem',
                      label: 'Subtitle Font Size',
                      key: 'subtitleSize',
                      type: 'TEXT',
                      configuration: {
                        as: 'UNIT',
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Subtitle color',
                      key: 'subtitleColor',
                      value: 'Secondary',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'CUSTOM',
                      label: 'Subtitle Font weight',
                      key: 'subtitleWeight',
                      value: '400',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: '100', value: '100' },
                          { name: '200', value: '200' },
                          { name: '300', value: '300' },
                          { name: '400', value: '400' },
                          { name: '500', value: '500' },
                          { name: '600', value: '600' },
                          { name: '700', value: '700' },
                          { name: '800', value: '800' },
                          { name: '900', value: '900' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'styles',
                          comparator: 'EQ',
                          value: true,
                        },
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
