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
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
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
          type: 'CUSTOM',
          label: 'Grid screen size',
          key: 'screenSize',
          value: 'XL',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Full', value: 'Full' },
              { name: 'XL', value: 'XL' },
              { name: 'L', value: 'L' },
              { name: 'M', value: 'M' },
              { name: 'S', value: 'S' },
            ],
          },
        },
        {
          type: 'NUMBER',
          label: 'Large screen columns',
          key: 'fullSize',
          value: 8,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'screenSize',
              comparator: 'EQ',
              value: 'Full',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Desktop columns',
          key: 'xlSize',
          value: 6,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'screenSize',
              comparator: 'EQ',
              value: 'XL',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Laptop columns',
          key: 'lSize',
          value: 4,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'screenSize',
              comparator: 'EQ',
              value: 'L',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Tablet portrait columns',
          key: 'mSize',
          value: 2,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'screenSize',
              comparator: 'EQ',
              value: 'M',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Mobile columns',
          key: 'sSize',
          value: 1,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'screenSize',
              comparator: 'EQ',
              value: 'S',
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Gap size',
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
      ],
      descendants: [],
    },
  ],
}))();
