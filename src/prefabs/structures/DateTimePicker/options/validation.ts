import {
  variable,
  toggle,
  showIf,
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

  minValue: variable('Minimum value', {
    value: [''],
    configuration: {
      allowFormatting: false,
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
  maxValue: variable('Maximium value', {
    value: [''],
    configuration: {
      allowFormatting: false,
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
};
