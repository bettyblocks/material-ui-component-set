(() => ({
  name: 'Divider',
  icon: 'HorizontalRuleIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Divider',
      options: [
        {
          value: 'S',
          label: 'Thickness',
          key: 'thickness',
          type: 'SIZE',
        },
        {
          value: 'Light',
          label: 'Color',
          key: 'color',
          type: 'COLOR',
        },
        {
          value: ['M', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          type: 'TOGGLE',
          label: 'Advanced',
          key: 'advanced',
          value: false,
        },
        {
          type: 'VARIABLE',
          label: 'Testing',
          key: 'testing',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advanced',
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
