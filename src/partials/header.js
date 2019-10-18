(() => ({
  name: 'Header',
  icon: 'PartialIcon',
  category: 'PARTIALS',
  structure: [
    {
      name: 'Row',
      options: [
        {
          value: '1',
          label: 'Width (0 (Full width), 1 (XL), 2 (L), 3 (M), 4 (S))',
          key: 'maxRowWidth',
          type: 'TEXT',
        },
      ],
      descendants: [
        {
          name: 'Column',
          options: [
            {
              value: 'flexible',
              label: 'Column width',
              key: 'columnWidth',
              type: 'TEXT',
            },
            {
              value: 'flexible',
              label: 'Column width (tablet landscape)',
              key: 'columnWidthTabletLandscape',
              type: 'TEXT',
            },
            {
              value: 'flexible',
              label: 'Column width (tablet portrait)',
              key: 'columnWidthTabletPortrait',
              type: 'TEXT',
            },
            {
              value: 'flexible',
              label: 'Column width (mobile)',
              key: 'columnWidthMobile',
              type: 'TEXT',
            },
          ],
          descendants: [
            {
              name: 'Text',
              options: [
                {
                  value: 'Heading',
                  label: 'Content',
                  key: 'content',
                  type: 'TEXT',
                },
                {
                  value: 'Title2',
                  label: 'Heading type',
                  key: 'type',
                  type: 'FONT',
                },
                {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  type: 'CUSTOM',
                  label: 'Text Alignment',
                  key: 'textAlignment',
                  value: 'left',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Left', value: 'left' },
                      { name: 'Center', value: 'center' },
                      { name: 'Right', value: 'right' },
                    ],
                  },
                },
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
