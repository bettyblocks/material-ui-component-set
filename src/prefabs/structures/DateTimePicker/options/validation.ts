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
  validationInvalidValue: variable('Value invalid message', {
    value: ['Invalid date'],
    configuration: {
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
  minValue: variable('Minimum value', {
    value: [''],
    configuration: {
      allowFormatting: false,
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
  validationBeforeMinValue: variable('Value before minimum message', {
    value: ['Date should not be before minimal date'],
    configuration: {
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
  maxValue: variable('Maximum value', {
    value: [''],
    configuration: {
      allowFormatting: false,
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
  validationAfterMaxValue: variable('Value after maximum message', {
    value: ['Date should not be after maximal date'],
    configuration: {
      condition: showIf('type', 'EQ', 'date'),
    },
  }),
};
