(() => ({
  name: 'Media',
  icon: 'ImageIcon',
  category: 'CONTENT',
  keywords: ['Content', 'media', 'image', 'video', 'iframe', 'picture'],
  structure: [
    {
      name: 'Media',
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
          value: [],
          label: 'Source',
          key: 'imageSource',
          type: 'VARIABLE',
          configuration: {
            as: 'MULTILINE',
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
            as: 'MULTILINE',
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
            as: 'MULTILINE',
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'iframe',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Link to',
          key: 'linkType',
          value: 'internal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Internal page', value: 'internal' },
              { name: 'External page', value: 'external' },
            ],
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
          label: 'Page',
          key: 'linkTo',
          type: 'ENDPOINT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'linkType',
              comparator: 'EQ',
              value: 'internal',
            },
          },
        },
        {
          value: [''],
          label: 'URL',
          key: 'linkToExternal',
          type: 'VARIABLE',
          configuration: {
            placeholder: 'Starts with https:// or http://',
            condition: {
              type: 'SHOW',
              option: 'linkType',
              comparator: 'EQ',
              value: 'external',
            },
          },
        },
        {
          value: [],
          label: 'Image Alternative Text',
          key: 'imgAlt',
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
          label: 'Title',
          key: 'title',
          type: 'VARIABLE',
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
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
