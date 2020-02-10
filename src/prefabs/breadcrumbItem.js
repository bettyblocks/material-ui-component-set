(() => ({
  name: 'BreadCrumb Item',
  icon: 'BreadcrumbItemIcon',
  category: 'NAVIGATION',
  structure: [
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
          key: 'endpoint',
          type: 'ENDPOINT',
        },
      ],
      descendants: [],
    },
  ],
}))();
