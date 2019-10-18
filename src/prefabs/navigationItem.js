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
      ],
      descendants: [],
    },
  ],
}))();
