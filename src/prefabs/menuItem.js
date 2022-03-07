(() => ({
  name: 'Menu Item',
  icon: 'MenuItemIcon',
  category: 'NAVIGATION',
  keywords: ['Navigation', 'menu', 'item', 'menuitem', 'dropdown item'],
  structure: [
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
          type: 'CUSTOM',
          label: 'Button state',
          key: 'defaultState',
          value: 'basis',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Basis',
                value: 'basis',
              },
              {
                name: 'Selected',
                value: 'selected',
              },
              {
                name: 'Disabled',
                value: 'disabled',
              },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Selected by URL',
          key: 'urlPath',
          value: [''],
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
}))();
