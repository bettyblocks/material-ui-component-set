import {
  number,
  showIf,
  text,
  variable,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';

const numberValidations = {
  minValue: number('Min value'),
  validationBelowMinimum: variable('Value too low message', {
    value: ['This value is too low'],
  }),
  maxValue: number('Max value'),
  validationAboveMaximum: variable('Value too high message', {
    value: ['This value is too high'],
  }),
};

const textValidations = {
  minLength: number('Min length'),
  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
  }),

  maxLength: number('Max length'),
  validationTooLong: variable('Value too long message', {
    value: ['This value is too long'],
  }),
};

export const validation = (type = 'text') => {
  const typeValidations =
    type === 'number' ? numberValidations : textValidations;

  return {
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

    ...typeValidations,

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
};
