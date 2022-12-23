import { showIf, variable, buttongroup } from '@betty-blocks/component-sdk';

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
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
};
