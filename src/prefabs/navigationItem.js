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
}))();
