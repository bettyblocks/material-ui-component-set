(() => ({
  name: 'CardMedia',
  icon: 'CardMediaIcon',
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
          value: [
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          ],
          label: 'Source',
          key: 'imageSource',
          type: 'VARIABLE',
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
          value: [],
          label: 'Source',
          key: 'videoSource',
          type: 'VARIABLE',
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
          value: [],
          label: 'Source',
          key: 'iframeSource',
          type: 'VARIABLE',
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
