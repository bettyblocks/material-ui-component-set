(() => ({
  name: 'Progress',
  icon: 'ProgressBarIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Progress',
      options: [
        {
          value: true,
          label: 'Toggle visibility',
          key: 'visible',
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          value: 'linear',
          label: 'Type',
          key: 'type',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Circular', value: 'circular' },
              { name: 'Linear', value: 'linear' },
            ],
          },
        },
        {
          value: 'determinate',
          label: 'Variant',
          key: 'linearVariant',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Buffer', value: 'buffer' },
              { name: 'Determinate', value: 'determinate' },
              { name: 'Indeterminate', value: 'indeterminate' },
              { name: 'Query', value: 'query' },
            ],
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'linear',
            },
          },
        },
        {
          value: 'static',
          label: 'Variant',
          key: 'circularVariant',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Determinate', value: 'determinate' },
              { name: 'Indeterminate', value: 'indeterminate' },
              { name: 'Static', value: 'static' },
            ],
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'circular',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'color',
          key: 'color',
          value: 'Primary',
        },
        {
          value: ['3.6'],
          label: 'Thickness',
          key: 'thickness',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'circular',
            },
          },
        },
        {
          value: ['2.5rem'],
          label: 'Size',
          key: 'size',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'circular',
            },
          },
        },
        {
          value: '',
          label: 'Height',
          key: 'barHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'linear',
            },
          },
        },
        {
          value: ['0'],
          label: 'Min value',
          key: 'minValue',
          type: 'VARIABLE',
        },
        {
          value: ['100'],
          label: 'Max value',
          key: 'maxValue',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Value',
          key: 'value',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Value buffer',
          key: 'valueBuffer',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'linear',
            },
          },
        },
        {
          value: ['M', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
