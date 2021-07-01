(() => ({
  name: 'Pie Chart',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'pieChart',
      options: [
        {
          type: 'TOGGLE',
          label: 'Legend',
          key: 'index',
          value: true,
        },
        {
          type: 'TOGGLE',
          label: 'Tooltip',
          key: 'tooltip',
          value: true,
        },
        {
          type: 'MODEL',
          label: 'Model',
          key: 'model',
          value: '',
        },
        {
          type: 'PROPERTY',
          label: 'Property',
          key: 'property',
          value: '',
        },
        {
          type: 'PROPERTY',
          label: 'Sum',
          key: 'sumProperty',
          value: '',
        },
        {
          type: 'TOGGLE',
          label: 'Show percentage',
          key: 'percentageInTooltip',
          value: true,
        },
        {
          type: 'TOGGLE',
          label: 'Show sum total',
          key: 'sumTotal',
          value: false,
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
        {
          type: 'NUMBER',
          label: 'Size',
          key: 'width',
          value: 100,
        },
      ],
      descendants: [],
    },
  ],
}))();
