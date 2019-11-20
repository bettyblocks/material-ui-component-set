(() => ({
  name: 'Button',
  icon: 'ButtonIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Button',
      options: [
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button'],
        },
        {
          type: 'CUSTOM',
          label: 'Link type',
          key: 'linkType',
          value: 'Internal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Internal', value: 'Internal' },
              { name: 'External', value: 'External' },
            ],
          },
        },
        {
          value: '',
          label: 'Link to Page',
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
          label: 'URL (overrides internal link)',
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
          value: 'Primary',
          label: 'Button Color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', 'M', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
