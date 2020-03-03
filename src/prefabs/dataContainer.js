(() => ({
  name: 'DataContainer',
  icon: 'DataContainer',
  category: 'DATA',
  structure: [
    {
      name: 'DataContainer',
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
