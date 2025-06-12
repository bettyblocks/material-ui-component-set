import {
  number,
  showIf,
  text,
  variable,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: {
      condition: showIfTrue('required'),
    },
  }),

  minValue: number('Min value', {
    value: -1000000000,
  }),
  validationTooLow: variable('Value too low message', {
    value: ['This value is too low'],
  }),

  maxValue: number('Max value', {
    value: 1000000000,
  }),
  validationTooHigh: variable('Value too high message', {
    value: ['This value is too high'],
  }),

  autoComplete: toggle('Autocomplete', { value: false }),
  autoFocus: toggle('Autofocus', { value: false }),
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
