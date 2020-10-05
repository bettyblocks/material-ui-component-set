(() => ({
  name: 'Link',
  icon: 'RowColumnIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Link',
      options: [
        {
          type: 'COLOR',
          label: 'Color',
          key: 'color',
          value: 'Black',
        },
        {
          value: [],
          label: 'Name',
          key: 'linkName',
          type: 'VARIABLE',
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
              value: 'external',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Underline',
          key: 'underline',
          value: 'none',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Hover', value: 'hover' },
              { name: 'Always', value: 'always' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
