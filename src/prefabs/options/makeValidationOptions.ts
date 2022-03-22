import {
  toggle,
  number,
  text,
  showIfTrue,
  variable,
} from '@betty-blocks/component-sdk';

export function makeValidationOptions(pattern: string) {
  const validationAttrs = {
    configuration: { condition: showIfTrue('validationOptions') },
  };

  return {
    validationOptions: toggle('Validation options'),
    required: toggle('Required',validationAttrs),
    validationValueMissing: variable('Value required message', {
      value: ['This field is required'],
      configuration: {
        condition: showIfTrue('required',),
      },
    }),
    pattern: text('Validation pattern', {
      value: pattern,
      configuration: {
        placeholder: pattern,
        ...validationAttrs.configuration,
      },
    }),
    validationPatternMismatch: variable('Pattern mismatch message', {
      value: ['Invalid value'],
      ...validationAttrs
    }),
    minLength: number('Min length', validationAttrs),
    validationTooShort: variable('Value too short message', {
      value: ['This value is too short'],
      ...validationAttrs
    }),
    maxLength: number('Max length', validationAttrs),
    validationTooLong: variable('Value too long message', {
      value: ['This value is too long'],
      ...validationAttrs
    }),
  };
}
