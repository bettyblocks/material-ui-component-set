(() => ({
  name: 'DataTableColumn',
  icon: 'DataTableColumn',
  category: 'DATA',
  structure: [
    {
      name: 'DataTableColumn',
      options: [
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          type: 'TOGGLE',
          label: 'Sortable',
          key: 'sortable',
          value: false,
        },
        {
          type: 'VARIABLE',
          label: 'Header text',
          key: 'headerText',
          value: [''],
        },
        {
          value: 'Body1',
          label: 'Header Type',
          key: 'type',
          type: 'FONT',
        },
        {
          type: 'VARIABLE',
          label: 'Content',
          key: 'content',
          value: [''],
          configuration: {
            as: 'MULTILINE',
          },
        },
        {
          value: 'Body1',
          label: 'Body type',
          key: 'bodyType',
          type: 'FONT',
        },
        {
          type: 'CUSTOM',
          label: 'Column Alignment',
          key: 'horizontalAlignment',
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
          type: 'COLOR',
          label: 'Background',
          key: 'background',
          value: 'Transparent',
        },
        {
          type: 'COLOR',
          label: 'Border color',
          key: 'borderColor',
          value: 'Light',
        },
      ],
      descendants: [],
    },
  ],
}))();
