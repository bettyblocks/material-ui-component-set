import {
  buttongroup,
  showIfTrue,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

export const validation = {
  showError: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'iteraction'],
    ],
    { value: 'built-in' },
  ),
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: {
      condition: showIfTrue('required'),
    },
  }),
};
