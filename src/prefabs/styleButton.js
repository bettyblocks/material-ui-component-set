(() => ({
  name: 'StyleButton',
  icon: 'ButtonIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'StyleButton',
      options: [
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button'],
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
