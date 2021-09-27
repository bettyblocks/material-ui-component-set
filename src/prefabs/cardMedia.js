(() => ({
  name: 'Card Media',
  icon: 'CardMediaIcon',
  category: 'CARDS',
  keywords: ['Cards', 'card', 'media', 'cardmedia'],
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
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['CardMedia'],
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
