(() => ({
  name: 'DataList',
  icon: 'DataList',
  category: 'DATA',
  structure: [
    {
      name: 'DataList',
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
          label: 'Search on property',
          key: 'searchProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '5',
          label: 'Rows per page (max 50)',
          key: 'take',
          type: 'NUMBER',
        },
        {
          type: 'CUSTOM',
          label: 'Type',
          key: 'type',
          value: 'list',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'List',
                value: 'list',
              },
              {
                name: 'Grid',
                value: 'grid',
              },
            ],
          },
        },
        {
          type: 'SIZE',
          label: 'Min Width',
          key: 'width',
          value: '200px',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'grid',
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Gap',
          key: 'gap',
          value: '1rem',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'grid',
            },
          },
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          label: 'Hide pagination',
          key: 'hidePagination',
          value: false,
          type: 'TOGGLE',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Custom', value: 'custom' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
