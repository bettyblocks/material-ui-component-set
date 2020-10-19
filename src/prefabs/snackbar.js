(() => ({
  name: 'Snackbar',
  icon: 'AlertIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Snackbar',
      options: [
        {
          type: 'TOGGLE',
          label: 'Visible',
          key: 'visible',
          value: true,
        },
        {
          label: 'Vertical position',
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
          label: 'Horizontal position',
          key: 'anchorOriginHorizontal',
          value: 'center',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Right',
                value: 'right',
              },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Auto hide',
          key: 'autoHide',
          value: true,
        },

        {
          type: 'NUMBER',
          label: 'Auto Hide Duration (ms)',
          key: 'autoHideDuration',
          value: 6000,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'autoHide',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
