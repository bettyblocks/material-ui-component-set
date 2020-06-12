(() => ({
  name: 'Conditional',
  icon: 'ConditionalIcon',
  category: 'LOGIC',
  structure: [
    {
      name: 'Conditional',
      options: [
        {
          type: 'VARIABLE',
          label: 'Left',
          key: 'left',
          value: [],
        },
        {
          type: 'CUSTOM',
          label: 'Compare',
          key: 'compare',
          value: 'eq',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Equal to',
                value: 'eq',
              },
              {
                name: 'Not equal to',
                value: 'not_eq',
              },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Right',
          key: 'right',
          value: [],
        },
      ],
      descendants: [],
    },
  ],
}))();
