(() => ({
  name: 'Image',
  icon: 'ImageIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Image',
      options: [
        {
          value: [],
          label: 'Image url',
          key: 'imgUrl',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Alternative Text',
          key: 'imgAlt',
          type: 'VARIABLE',
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
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
