(() => ({
  name: 'QRCode',
  icon: 'CheckboxIcon',
  category: 'Dependencies',
  keywords: ['chart'],
  structure: [
    {
      name: 'QRCode',
      options: [
        {
          value: ['http://www.bettyblocks.com'],
          label: 'Value',
          key: 'value',
          type: 'VARIABLE',
        },
        {
          value: ['#FFFFFF'],
          label: 'Background color',
          key: 'bgColor',
          type: 'VARIABLE',
        },
        {
          value: ['#000000'],
          label: 'Foreground color',
          key: 'fgColor',
          type: 'VARIABLE',
        },
        {
          label: 'Level',
          key: 'level',
          value: 'L',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'L', value: 'L' },
              { name: 'M', value: 'M' },
              { name: 'Q', value: 'Q' },
              { name: 'H', value: 'H' },
            ],
          },
        },
        {
          label: 'Size',
          key: 'size',
          value: 256,
          type: 'NUMBER',
        },
      ],
      descendants: [],
    },
  ],
}))();
