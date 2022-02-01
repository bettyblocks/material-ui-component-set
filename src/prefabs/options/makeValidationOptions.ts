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
    validationOptions: toggle('Validation options', validationAttrs),
    required: toggle('Required'),
    pattern: text('Validation pattern', {
      value: pattern,
      configuration: {
        placeholder: pattern,
        ...validationAttrs.configuration,
      },
    }),
    minLength: number('Min length', validationAttrs),
    maxLength: number('Max length', validationAttrs),
    validationValueMissing: variable('Value required message', {
      value: ['This field is required'],
      ...validationAttrs,
    }),
    validationPatternMismatch: variable('Pattern mismatch message', {
      value: ['Invalid value'],
      ...validationAttrs,
    }),
  };
}
