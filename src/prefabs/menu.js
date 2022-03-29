(() => ({
  name: 'Menu',
  icon: 'MenuIcon',
  category: 'NAVIGATION',
  keywords: ['Navigation', 'menu', 'dropdown'],
  structure: [
    {
      name: 'Menu',
      options: [
        {
          label: 'Toggle menu',
          key: 'isMenuListVisible',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'CUSTOM',
          label: 'Menu Button Variant',
          key: 'variant',
          value: 'contained',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: 'text' },
              { name: 'Outlined', value: 'outlined' },
              { name: 'Contain', value: 'contained' },
              { name: 'Icon', value: 'icon' },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Menu'],
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          value: false,
          label: 'Full width',
          key: 'fullWidth',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          value: 'medium',
          label: 'Button Size',
          key: 'size',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Large', value: 'large' },
              { name: 'Medium', value: 'medium' },
              { name: 'Small', value: 'small' },
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
          type: 'CUSTOM',
          label: 'Icon position',
          key: 'iconPosition',
          value: 'start',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'End', value: 'end' },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Button Text color',
          key: 'textColor',
          value: 'White',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Button Color',
          key: 'background',
          value: 'Primary',
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Button Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          type: 'COLOR',
          label: 'Menu color',
          key: 'menuColor',
          value: 'White',
        },
        {
          label: 'Menu Placement',
          key: 'placement',
          value: 'bottom-start',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            allowedInput: [
              {
                name: 'Bottom-End',
                value: 'bottom-end',
              },
              {
                name: 'Bottom-Start',
                value: 'bottom-start',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
              {
                name: 'Left-End',
                value: 'left-end',
              },
              {
                name: 'Left-Start',
                value: 'left-start',
              },
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Right-End',
                value: 'right-end',
              },
              {
                name: 'Right-Start',
                value: 'right-start',
              },
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Top-End',
                value: 'top-end',
              },
              {
                name: 'Top-Start',
                value: 'top-start',
              },
              {
                name: 'Top',
                value: 'top',
              },
            ],
          },
        },
        {
          label: 'Disabled',
          key: 'disabled',
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
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Menu'],
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
          name: 'MenuItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Primary text',
              key: 'primaryText',
              value: ['Menu Item'],
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
              value: [],
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
              value: '_self',
              label: 'Open in',
              key: 'openLinkToExternal',
              type: 'CUSTOM',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'linkType',
                  comparator: 'EQ',
                  value: 'external',
                },
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Current Tab', value: '_self' },
                  { name: 'New Tab', value: '_blank' },
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
              type: 'CUSTOM',
              label: 'Icon position',
              key: 'iconPosition',
              value: 'start',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                condition: {
                  type: 'HIDE',
                  option: 'icon',
                  comparator: 'EQ',
                  value: 'None',
                },
                allowedInput: [
                  { name: 'Start', value: 'start' },
                  { name: 'End', value: 'end' },
                ],
              },
            },
            {
              type: 'COLOR',
              label: 'Text color',
              key: 'textColor',
              value: 'Primary',
            },
            {
              type: 'TOGGLE',
              label: 'Disabled',
              key: 'disabled',
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
              value: false,
              label: 'Advanced settings',
              key: 'advancedSettings',
              type: 'TOGGLE',
            },
            {
              type: 'VARIABLE',
              label: 'Test attribute',
              key: 'dataComponentAttribute',
              value: ['MenuItem'],
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
