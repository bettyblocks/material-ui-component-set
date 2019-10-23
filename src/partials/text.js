(() => ({
  name: 'Text',
  icon: 'PartialIcon',
  category: 'PARTIALS',
  structure: [
    {
      name: 'Partial',
      options: [
        {
          value: '',
          label: 'Partial Reference',
          key: 'partialReferenceId',
          type: 'PARTIAL_REFERENCE',
        },
      ],
      descendants: [
        {
          name: 'Text',
          options: [
            {
              type: 'MODEL',
              label: 'Model',
              key: 'model',
              value: '',
            },
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: ['Text'],
              configuration: {
                dependsOn: 'model',
              },
            },
            {
              value: 'Body1',
              label: 'Type',
              key: 'type',
              type: 'FONT',
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
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
