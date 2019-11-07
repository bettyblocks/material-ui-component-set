(() => ({
  name: 'Button',
  icon: 'ButtonIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Button',
      options: [
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button'],
        },
        {
          value: '',
          label: 'Link to Page',
          key: 'linkTo',
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
          value: 'Primary',
          label: 'Button Color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', 'M', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
