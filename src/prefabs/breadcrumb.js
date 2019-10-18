(() => ({
  name: 'Breadcrumb',
  icon: 'BreadcrumbIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Breadcrumb',
      options: [],
      descendants: [
        {
          name: 'BreadcrumbItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'breadcrumbContent',
              value: ['Breadcrumb Item'],
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
        {
          name: 'BreadcrumbItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'breadcrumbContent',
              value: ['Breadcrumb Item'],
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
        {
          name: 'BreadcrumbItem',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'breadcrumbContent',
              value: ['Breadcrumb Item'],
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
    },
  ],
}))();
