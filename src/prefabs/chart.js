(() => ({
  name: 'Chart',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Chart',
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
        {
          value: '',
          label: 'Temp Value',
          key: 'tempValue',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Value property',
          key: 'valueProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: 'pie',
          label: 'Chart Type',
          key: 'chartType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Pie', value: 'pie' },
              { name: 'Bar', value: 'bar' },
            ],
          },
        },
        {
          value: '600',
          label: 'Width',
          key: 'width',
          type: 'NUMBER',
        },
      ],
      descendants: [],
    },
  ],
}))();
