(() => ({
  name: 'Image',
  icon: 'ImageIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Image',
      options: [
        {
          type: 'CUSTOM',
          label: 'Source Type',
          key: 'sourceType',
          value: 'url',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Url',
                value: 'url',
              },
              {
                name: 'Property ID',
                value: 'id',
              },
            ],
          },
        },
        {
          value: [],
          label: 'Image url',
          key: 'imgUrl',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'sourceType',
              comparator: 'EQ',
              value: 'url',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Image property ID',
          key: 'propertyId',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'sourceType',
              comparator: 'EQ',
              value: 'id',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Size name',
          key: 'sizeName',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'sourceType',
              comparator: 'EQ',
              value: 'id',
            },
          },
        },
        {
          value: [],
          label: 'Image fallback',
          key: 'imgUrlFallback',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'sourceType',
              comparator: 'EQ',
              value: 'id',
            },
          },
        },
        {
          value: [],
          label: 'Image Alternative Text',
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
