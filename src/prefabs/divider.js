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
      ],
      descendants: [],
    },
  ],
}))();
