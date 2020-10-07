(() => ({
  name: 'Snackbar',
  icon: 'HiddenInputIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Snackbar',
      options: [
        {
          type: 'TOGGLE',
          label: 'Show Snackbar',
          key: 'isOpen',
          value: false,
        },
        {
          label: 'Anchor Origin Vertical',
          key: 'anchorOriginVertical',
          value: 'bottom',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
            ],
          },
        },
        {
          label: 'Anchor Origin Horizontal',
          key: 'anchorOriginHorizontal',
          value: 'center',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Left',
                value: 'left',
              },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Auto Hide Duration',
          key: 'autoHide',
          value: ['6000'],
        },
      ],
      descendants: [],
    },
  ],
}))();
