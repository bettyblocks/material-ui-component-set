(() => ({
  name: 'Custom Data Container',
  icon: 'ConditionalIcon',
  category: 'DATA',
  keywords: ['Data', 'container', 'datacontainer', 'object', 'record'],
  interactions: [],
  variables: [],
  structure: [
    {
      name: 'CustomDataContainer',
      ref: {
        id: '#dataContainer',
      },
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
        },
        {
          value: '',
          label: 'Redirect when no result',
          key: 'redirectWithoutResult',
          type: 'ENDPOINT',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
        {
          value: 'default',
          label: 'Show on load',
          key: 'loadingType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Message', value: 'default' },
              { name: 'Content', value: 'showChildren' },
            ],
          },
        },
        {
          value: ['Loading...'],
          label: 'Loading text',
          key: 'loadingText',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'loadingType',
              comparator: 'EQ',
              value: 'default',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
