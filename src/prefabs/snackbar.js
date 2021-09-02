(() => ({
  name: 'Snackbar',
  icon: 'SnackbarIcon',
  category: 'CONTENT',
  keywords: [
    'Content',
    'snack',
    'bar',
    'snackbar',
    'toaster',
    'notification',
    'frikadel',
  ],
  structure: [
    {
      name: 'Snackbar',
      options: [
        {
          label: 'Toggle visibility',
          key: 'visible',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'VARIABLE',
          label: 'Content',
          key: 'content',
          value: ['You can also drag an alert component here for example'],
        },
        {
          label: 'Allow to overwrite by the server response',
          key: 'allowTextServerResponse',
          value: false,
          type: 'TOGGLE',
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
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'test attribute',
          key: 'dataComponentAttribute',
          value: ['Snackbar'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
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
