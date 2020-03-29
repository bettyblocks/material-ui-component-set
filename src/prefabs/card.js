(() => ({
  name: 'Card',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Card',
      options: [
        {
          type: 'VARIABLE',
          label: 'Title',
          key: 'title',
          value: ['Title'],
        },
        {
          type: 'VARIABLE',
          label: 'Subtitle',
          key: 'subTitle',
          value: ['Subtitle'],
        },
        {
          label: 'Raised',
          key: 'raised',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'elevation',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Elevation', value: 'elevation' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
