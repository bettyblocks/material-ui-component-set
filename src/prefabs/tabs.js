(() => ({
  name: 'Tabs',
  icon: 'TabsIcon',
  category: 'NAVIGATION',
  keywords: ['Navigation', 'tabs'],
  structure: [
    {
      name: 'Tabs',
      options: [
        {
          label: 'Selected tab index',
          key: 'defaultValue',
          value: '1',
          type: 'NUMBER',
        },
        {
          label: 'Show all tabs',
          key: 'showAllTabs',
          value: false,
          type: 'TOGGLE',
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'top',
          label: 'Alignment',
          key: 'alignment',
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
        {
          label: 'Variant',
          key: 'variant',
          value: 'standard',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Standard', value: 'standard' },
              { name: 'Scrollable', value: 'scrollable' },
              { name: 'Full width', value: 'fullWidth' },
            ],
          },
        },
        {
          label: 'Scrollbuttons',
          key: 'scrollButtons',
          value: 'auto',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Auto', value: 'auto' },
              { name: 'Desktop', value: 'desktop' },
              { name: 'Always', value: 'on' },
              { name: 'Never', value: 'off' },
            ],
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'scrollable',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Centered',
          key: 'centered',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'orientation',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          label: 'Bar color',
          key: 'appBarColor',
          value: 'Primary',
          type: 'COLOR',
        },
        {
          label: 'Text color',
          key: 'textColor',
          value: 'White',
          type: 'COLOR',
        },
        {
          label: 'Indicator color',
          key: 'indicatorColor',
          value: 'Success',
          type: 'COLOR',
        },
        {
          label: 'Hide visual tabs',
          key: 'hideTabs',
          value: false,
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          label: 'Preload data in all tabs',
          key: 'preLoadTabs',
          value: true,
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Tabs'],
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
          name: 'Tab',
          options: [
            {
              label: 'Tab label',
              key: 'label',
              value: ['TAB'],
              type: 'VARIABLE',
            },
            {
              type: 'SIZE',
              label: 'Height',
              key: 'height',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              label: 'Icon',
              key: 'icon',
              value: 'None',
              type: 'ICON',
            },
            {
              label: 'Icon Alignment',
              key: 'iconAlignment',
              value: 'top',
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
              label: 'Disable ripple',
              key: 'disableRipple',
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
              value: ['Tab'],
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
