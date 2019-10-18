(() => ({
  name: 'DataTable',
  icon: 'DataTable',
  category: 'DATA',
  structure: [
    {
      name: 'DataTable',
      options: [
        {
          value: '',
          label: 'Title',
          key: 'title',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: [],
          label: 'Properties',
          key: 'properties',
          type: 'PROPERTIES',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: ['', 'eq', ''],
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Search on property',
          key: 'searchProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: 15,
          label: 'Rows per page (max 50)',
          key: 'take',
          type: 'NUMBER',
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
