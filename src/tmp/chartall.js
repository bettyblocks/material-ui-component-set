(() => ({
  name: 'ChartAll',
  icon: 'CheckboxIcon',
  category: 'Content',
  keywords: ['chart'],
  structure: [
    {
      name: 'ChartAll',
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
