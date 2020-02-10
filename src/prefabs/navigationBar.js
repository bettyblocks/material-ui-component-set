(() => ({
  name: 'Navigation Bar',
  icon: 'NavbarIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'NavigationBar',
      options: [
        {
          value: '',
          label: 'Logo URL',
          key: 'logoUrl',
          type: 'TEXT',
        },
        {
          value: 'Brand name',
          label: 'Brand name',
          key: 'brandName',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Link to',
          key: 'endpoint',
          type: 'ENDPOINT',
        },
      ],
      descendants: [
        {
          name: 'NavigationItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Button text',
              key: 'navigationContent',
              value: ['Item 1'],
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
              key: 'endpoint',
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
        {
          name: 'NavigationItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Button text',
              key: 'navigationContent',
              value: ['Item 2'],
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
              key: 'endpoint',
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
        {
          name: 'NavigationItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Button text',
              key: 'navigationContent',
              value: ['Item 3'],
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
              key: 'endpoint',
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
    },
  ],
}))();
