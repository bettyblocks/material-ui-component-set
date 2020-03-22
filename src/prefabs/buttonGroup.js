(() => ({
  name: 'ButtonGroup',
  icon: 'ButtonGroupIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'ButtonGroup',
      options: [
        {
          value: 'flex-start',
          label: 'Alignment',
          key: 'alignment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'flex-end' },
              { name: 'Justified', value: 'space-between' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
