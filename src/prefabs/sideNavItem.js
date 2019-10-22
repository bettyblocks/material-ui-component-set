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
      ],
      descendants: [],
    },
  ],
}))();
