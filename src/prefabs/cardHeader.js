(() => ({
  name: 'Card Header',
  icon: 'CardHeaderIcon',
  category: 'CARDS',
  keywords: ['Cards', 'card', 'header', 'cardheader'],
  structure: [
    {
      name: 'CardHeader',
      options: [
        {
          value: [],
          label: 'Avatar',
          key: 'avatar',
          type: 'VARIABLE',
        },
        {
          label: 'Avatar type',
          key: 'avatarType',
          value: 'text',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: 'text' },
              { name: 'Image', value: 'image' },
            ],
            condition: {
              type: 'HIDE',
              option: 'avatar',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: ['Title'],
          label: 'Title',
          key: 'title',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Sub header',
          key: 'subheader',
          type: 'VARIABLE',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'test attribute',
          key: 'dataComponentAttribute',
          value: ['CardHeader'],
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
