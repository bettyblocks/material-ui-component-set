(() => ({
  name: 'Avatar',
  icon: 'ImageIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Avatar',
      options: [
        {
          value: '',
          label: 'Image url',
          key: 'imgUrl',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Image Alternative Text',
          key: 'imgAlt',
          type: 'TEXT',
        },
        {
          type: 'CUSTOM',
          label: 'variant',
          key: 'variant',
          value: 'circle',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Circle', value: 'circle' },
              { name: 'Rounded', value: 'rounded' },
              { name: 'Square', value: 'square' },
            ],
          },
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
