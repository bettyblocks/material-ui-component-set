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

  pattern: text('Validation pattern', {
    value: '',
  }),

  validationPatternMismatch: variable('Pattern mismatch message', {
    value: ['Invalid value'],
  }),

  minLength: number('Min length'),
  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
  }),

  maxLength: number('Max length'),
  validationTooLong: variable('Value too long message', {
    value: ['This value is too long'],
  }),

  autoComplete: toggle('Autocomplete', { value: false }),
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
