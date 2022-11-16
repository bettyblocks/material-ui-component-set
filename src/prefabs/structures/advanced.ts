import { variable, buttongroup } from '@betty-blocks/component-sdk';

export const advanced = (value: string) => {
  return {
    showError: buttongroup(
      'Error message',
      [
        ['Built in', 'built-in'],
        ['Interaction', 'iteraction'],
      ],
      { value: 'built-in' },
    ),
    dataComponentAttribute: variable('Test attribute', {
      value: [value],
    }),
  };
};
