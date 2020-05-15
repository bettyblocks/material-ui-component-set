(() => ({
  name: 'Avatar',
  icon: 'ImageInputIcon',
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
