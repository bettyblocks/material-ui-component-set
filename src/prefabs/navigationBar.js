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
          key: 'endpointId',
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
              value: '',
              label: 'Link to',
              key: 'endpointId',
              type: 'ENDPOINT',
            },
            {
              value: '',
              label: 'URL (overrides internal link)',
              key: 'linkToExternal',
              type: 'TEXT',
              configuration: {
                placeholder: 'Starts with https:// or http://',
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
              value: '',
              label: 'Link to',
              key: 'endpointId',
              type: 'ENDPOINT',
            },
            {
              value: '',
              label: 'URL (overrides internal link)',
              key: 'linkToExternal',
              type: 'TEXT',
              configuration: {
                placeholder: 'Starts with https:// or http://',
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
              value: '',
              label: 'Link to',
              key: 'endpointId',
              type: 'ENDPOINT',
            },
            {
              value: '',
              label: 'URL (overrides internal link)',
              key: 'linkToExternal',
              type: 'TEXT',
              configuration: {
                placeholder: 'Starts with https:// or http://',
              },
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
