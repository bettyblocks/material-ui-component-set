import { variable, option } from '@betty-blocks/component-sdk';

export const advanced = {
  dataComponentAttribute: variable('Test attribute', {
    value: ['Data container'],
  }),
  fetchPolicy: option('CUSTOM', {
    value: 'cache-and-network',
    label: 'Fetch Policy',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Cache', value: 'cache-and-network' },
        { name: 'No cache', value: 'no-cache' },
      ],
    },
  }),
};
