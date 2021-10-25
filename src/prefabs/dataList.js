(() => ({
  name: 'Data List',
  icon: 'DataList',
  category: 'DATA',
  keywords: ['Data', 'list', 'datalist', 'collection'],
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
          type: 'PROPERTY',
          label: 'Order by',
          key: 'orderBy',
          value: '',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          type: 'CUSTOM',
          label: 'Sort order',
          key: 'order',
          value: 'asc',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            condition: {
              type: 'HIDE',
              option: 'orderBy',
              comparator: 'EQ',
              value: '',
            },
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
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
          value: '',
          label: 'Hide built-in search field',
          key: 'hideSearch',
          type: 'TOGGLE',
        },
        {
          label: 'Pagination',
          key: 'pagination',
          value: 'always',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Always', value: 'always' },
              { name: 'When needed', value: 'whenNeeded' },
              { name: 'Never', value: 'never' },
            ],
          },
        },
        {
          value: '5',
          label: 'Rows per page (max 50)',
          key: 'take',
          type: 'NUMBER',
        },
        {
          value: '',
          label: 'Placeholder rows',
          key: 'placeholderTake',
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
              {
                name: 'Inline',
                value: 'inline',
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
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          value: 'default',
          label: 'Show on load',
          key: 'loadingType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Message', value: 'default' },
              { name: 'Content', value: 'showChildren' },
              { name: 'Skeleton', value: 'skeleton' },
            ],
          },
        },
        {
          value: ['Loading...'],
          label: 'Loading text',
          key: 'loadingText',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'loadingType',
              comparator: 'EQ',
              value: 'default',
            },
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['DataList'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
