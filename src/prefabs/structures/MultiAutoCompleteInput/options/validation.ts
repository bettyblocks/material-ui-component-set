import {
  showIf,
  text,
  variable,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required', { value: false }),

  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: {
      condition: showIfTrue('required'),
    },
  }),
  pattern: text('Validation pattern', {
    value: '',
  }),
  minLength: variable('Min length', {
    value: [''],
  }),
  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
  }),
  maxLength: variable('Max length', {
    value: [''],
  }),
  validationTooLong: variable('Value too long message', {
    value: ['This value is too long'],
  }),

  closeOnSelect: toggle('Close dropdown after select', { value: true }),
  disabled: toggle('Disabled', { value: false }),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  noOptionsText: variable('No options text', { value: ['No options'] }),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
