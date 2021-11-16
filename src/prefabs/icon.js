(() => ({
  name: 'Icon',
  icon: 'IconIcon',
  category: 'CONTENT',
  keywords: ['Content', 'icon', 'symbol'],
  structure: [
    {
      name: 'Icon',
      options: [
        {
          label: 'Icon',
          key: 'icon',
          value: 'AcUnit',
          type: 'ICON',
        },
        {
          value: 'S',
          label: 'Size',
          key: 'size',
          type: 'SIZE',
        },
        {
          type: 'COLOR',
          label: 'Color',
          key: 'color',
          value: 'Black',
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
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          type: 'TOGGLE',
          label: 'Add Badge',
          key: 'addBadge',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Hide Badge if value is 0',
          key: 'hideBadge',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addBadge',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Content',
          key: 'content',
          value: ['1'],
          configuration: {
            as: 'MULTILINE',
            condition: {
              type: 'SHOW',
              option: 'addBadge',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Badge Color',
          key: 'badgeColor',
          value: 'Secondary',
          type: 'COLOR',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addBadge',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Anchor Origin',
          key: 'anchorOrigin',
          value: 'right,top',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top Right',
                value: 'right,top',
              },
              {
                name: 'Top Left',
                value: 'left,top',
              },
              {
                name: 'Bottom Right',
                value: 'right,bottom',
              },
              {
                name: 'Bottom Left',
                value: 'left,bottom',
              },
            ],
            condition: {
              type: 'SHOW',
              option: 'addBadge',
              comparator: 'EQ',
              value: true,
            },
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
              { name: 'Dot', value: 'dot' },
            ],
            condition: {
              type: 'SHOW',
              option: 'addBadge',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZES',
          label: 'Outer Space',
          key: 'margin',
          value: ['S', 'S', 'S', 'S'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addBadge',
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
          value: ['Icon'],
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
