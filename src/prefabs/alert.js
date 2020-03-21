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
          value: 'Black',
          label: 'Text color',
          key: 'textColor',
          type: 'COLOR',
        },
        {
          value: 'Success',
          label: 'Background color',
          key: 'background',
          type: 'COLOR',
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
