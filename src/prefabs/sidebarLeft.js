(() => ({
  name: 'Sidebar Left',
  icon: 'SidebarLeftIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'PageBody',
      options: [],
      descendants: [
        {
          name: 'SideNavigation',
          options: [
            {
              type: 'VARIABLE',
              label: 'Title',
              key: 'title',
              value: ['Sidebar Title'],
            },
            {
              type: 'TOGGLE',
              label: 'Collapsed',
              key: 'collapsed',
              value: false,
            },
          ],
          descendants: [
            {
              name: 'SideNavItem',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'navigationContent',
                  value: ['Side Nav Item 1'],
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
              name: 'SideNavItem',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'navigationContent',
                  value: ['Side Nav Item 2'],
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
        {
          name: 'PageContent',
          options: [],
          descendants: [],
        },
      ],
    },
  ],
}))();
