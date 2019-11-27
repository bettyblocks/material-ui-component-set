(() => ({
  name: 'Alert',
  icon: 'AlertIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Alert',
      options: [
        {
          type: 'VARIABLE',
          label: 'Title text',
          key: 'titleText',
          value: ['Type your content here...'],
        },
        {
          type: 'VARIABLE',
          label: 'Body text',
          key: 'bodyText',
          value: ['Type your content here...'],
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Icon',
          key: 'icon',
          type: 'TEXT',
        },
        {
          value: 'Primary',
          label: 'Color',
          key: 'color',
          type: 'COLOR',
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button text'],
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Page',
          key: 'buttonLink',
          type: 'ENDPOINT',
        },
        {
          value: '',
          label: 'URL (overrides internal link)',
          key: 'linkToExternal',
          type: 'TEXT',
          configuration: {
            placeholder: 'Starts with https:// or http://',
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
