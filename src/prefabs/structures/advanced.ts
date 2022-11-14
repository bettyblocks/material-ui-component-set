import { variable, toggle, buttongroup } from '@betty-blocks/component-sdk';

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
    checkboxSelection: toggle('ROW SELECT', {
      value: true,
    }),
    checkboxPosition: buttongroup(
      'Position',
      [
        ['Start', 'start'],
        ['End', 'end'],
      ],
      {
        value: 'start',
        configuration: {
          condition: {
            type: 'HIDE',
            option: 'checkboxSelection',
            comparator: 'EQ',
            value: false,
          },
        },
      },
    ),
  };
};
