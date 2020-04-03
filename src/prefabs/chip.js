(() => ({
  name: 'Chip',
  icon: 'ContainerIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Chip',
      options: [
        {
          type: 'VARIABLE',
          label: 'Label',
          key: 'label',
          value: ['Label'],
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'default',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Default', value: 'default' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Color',
          key: 'color',
          value: 'Primary',
        },
        {
          type: 'COLOR',
          label: 'Text Color',
          key: 'textColor',
          value: 'White',
        },
        {
          type: 'SIZES',
          label: 'Outer Space',
          key: 'margin',
          value: ['M', 'M', 'M', 'M'],
        },
      ],
      descendants: [],
    },
  ],
}))();
