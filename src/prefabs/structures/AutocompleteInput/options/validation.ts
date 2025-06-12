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
