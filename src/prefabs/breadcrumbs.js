(() => ({
  name: 'Breadcrumbs',
  icon: 'BreadcrumbIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Breadcrumbs',
      options: [
        {
          type: 'TEXT',
          label: 'Separator',
          key: 'separator',
          value: '/',
        },
      ],
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
              label: 'Page',
              key: 'endpoint',
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
              label: 'Page',
              key: 'endpoint',
              type: 'ENDPOINT',
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
