(() => ({
  name: 'Data Set',
  icon: 'ContainerIcon',
  category: 'CHART',
  structure: [
    {
      name: 'dataSet',
      options: [
        {
          type: 'VARIABLE',
          label: 'Data set label',
          key: 'dataLabel',
          value: ['Some text...'],
        },
        {
          label: 'Data property',
          key: 'dataProperty',
          value: '',
          type: 'PROPERTY',
        },
        {
          type: 'CUSTOM',
          label: 'Colors',
          key: 'colors',
          value: 'theme',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Theme',
                value: 'theme',
              },
              {
                name: 'Custom',
                value: 'custom',
              },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Border Color',
          key: 'borderColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'colors',
              comparator: 'EQ',
              value: 'theme',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Background Color',
          key: 'backgroundColor',
          value: 'Secondary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'colors',
              comparator: 'EQ',
              value: 'theme',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
