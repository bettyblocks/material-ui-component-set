(() => ({
  name: 'Rechart',
  icon: 'CheckboxIcon',
  category: 'Dependencies',
  keywords: ['chart'],
  structure: [
    {
      name: 'Rechart',
      options: [
        {
          label: 'Chart type',
          key: 'chartType',
          value: 'line',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Line', value: 'line' },
              { name: 'Bar', value: 'bar' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
