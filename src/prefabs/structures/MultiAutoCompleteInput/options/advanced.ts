import { buttongroup, showIf, variable, option } from '@betty-blocks/component-sdk';

export const advanced = {
  errorType: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'interaction'],
    ],
    { value: 'built-in' },
  ),
  nameAttribute: variable('name attribute', {
    value: [],
    configuration: { condition: showIf('nameAttribute', 'EQ', 'never') },
  }),
  take: option('CUSTOM', {
    value: '50',
    label: 'Number of items to load',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '50', value: '50' },
        { name: '100', value: '100' },
        { name: '150', value: '150' },
        { name: '200', value: '200' },
      ],
    },
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
};
