(() => ({
  name: 'Sidenav Item',
  icon: 'NavItemIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'SideNavItem',
      options: [
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'navigationContent',
          value: ['Side Nav Item'],
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
