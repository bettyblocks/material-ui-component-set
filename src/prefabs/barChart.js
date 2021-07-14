(() => ({
  name: 'Bar Chart',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'barChart',
      options: [
        {
          type: 'TOGGLE',
          label: 'Index',
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
          type: 'TOGGLE',
          label: 'Sum option',
          key: 'sumOption',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Sum tooltip',
          key: 'sumTooltip',
          value: false,
        },
        {
          type: 'NUMBER',
          label: 'Bar width (in px)',
          key: 'barWidthInput',
          value: 25,
        },
        {
          type: 'NUMBER',
          label: 'Bar spacing (in px)',
          key: 'barSpacing',
          value: 8,
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
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          type: 'TOGGLE',
          label: 'Amount tooltip',
          key: 'amountTooltip',
          value: false,
        },
      ],
      descendants: [],
    },
  ],
}))();
