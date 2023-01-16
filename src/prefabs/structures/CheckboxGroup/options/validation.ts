import {
  buttongroup,
  showIfTrue,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: {
      condition: showIfTrue('required'),
    },
  }),
  showError: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'iteraction'],
    ],
    { value: 'built-in' },
  ),
};
