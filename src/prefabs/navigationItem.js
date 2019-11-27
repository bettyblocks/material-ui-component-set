(() => ({
  name: 'Navigation Item',
  icon: 'NavItemIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'NavigationItem',
      options: [
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'navigationContent',
          value: ['Item'],
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
          key: 'endpointId',
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
      ],
      descendants: [],
    },
  ],
}))();
