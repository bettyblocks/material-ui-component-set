(() => ({
  name: 'CardMedia',
  icon: 'ImageIcon',
  category: 'CARDS',
  structure: [
    {
      name: 'CardMedia',
      options: [
        {
          label: 'Media type',
          key: 'type',
          value: 'img',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Image', value: 'img' },
              { name: 'Video', value: 'video' },
              { name: 'I-frame', value: 'iframe' },
            ],
          },
        },
        {
          value: '',
          label: 'Source',
          key: 'imageSource',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'img',
            },
          },
        },
        {
          value: '',
          label: 'Source',
          key: 'videoSource',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'video',
            },
          },
        },
        {
          value: '',
          label: 'Source',
          key: 'iframeSource',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'iframe',
            },
          },
        },
        {
          value: [],
          label: 'Title',
          key: 'title',
          type: 'VARIABLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
