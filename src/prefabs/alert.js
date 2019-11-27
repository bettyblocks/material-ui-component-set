(() => ({
  name: 'Alert',
  icon: 'AlertIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Alert',
      options: [
        {
          type: 'VARIABLE',
          label: 'Title text',
          key: 'titleText',
          value: ['Type your content here...'],
        },
        {
          type: 'VARIABLE',
          label: 'Body text',
          key: 'bodyText',
          value: ['Type your content here...'],
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Icon',
          key: 'icon',
          type: 'TEXT',
        },
        {
          value: 'Primary',
          label: 'Color',
          key: 'color',
          type: 'COLOR',
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button text'],
          configuration: {
            dependsOn: 'model',
          },
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
            ],
          },
        },
        {
          value: '',
          label: 'Page',
          key: 'buttonLink',
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
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
