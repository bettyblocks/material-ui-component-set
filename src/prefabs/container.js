(() => ({
  name: 'Container',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Container',
      options: [
        {
          value: 'lg',
          label: 'Max width',
          key: 'maxWidth',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'XS', value: 'xs' },
              { name: 'SM', value: 'sm' },
              { name: 'MD', value: 'md' },
              { name: 'LG', value: 'lg' },
              { name: 'XL', value: 'xl' },
              { name: 'None', value: 'false' },
            ],
          },
        },
        {
          value: false,
          label: 'Disable gutters',
          key: 'disableGutters',
          type: 'TOGGLE',
        },
        {
          value: 'Transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
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
      ],
      descendants: [],
    },
  ],
}))();
