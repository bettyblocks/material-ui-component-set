(() => ({
  name: 'Chart',
  icon: 'ContainerIcon',
  category: 'CHART',
  structure: [
    {
      name: 'chart',
      options: [
        {
          type: 'CUSTOM',
          label: 'Chart type',
          key: 'chartType',
          value: 'line',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Line Chart',
                value: 'line',
              },
              {
                name: 'Bar Chart',
                value: 'bar',
              },
            ],
          },
        },
        {
          type: 'MODEL',
          label: 'Model',
          key: 'modelId',
          value: '',
        },
        {
          type: 'FILTER',
          label: 'Filter',
          key: 'filter',
          value: {},
          configuration: {
            dependsOn: 'modelId',
          },
        },
        {
          type: 'NUMBER',
          label: 'Take records (Max 50)',
          key: 'take',
          value: 15,
        },
        {
          type: 'PROPERTY',
          label: 'Label Property',
          key: 'labelProperty',
          value: '',
          configuration: {
            dependsOn: 'modelId',
          },
        },
      ],
      descendants: [
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
    },
  ],
}))();
