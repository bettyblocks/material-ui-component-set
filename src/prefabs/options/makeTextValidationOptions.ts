import { showIfTrue, variable } from '@betty-blocks/component-sdk';

import { makeValidationOptions } from './makeValidationOptions';

export function makeTextValidationOptions(pattern: string) {
  const validationAttrs = {
    configuration: { condition: showIfTrue('validationOptions') },
  };

  const defaultValidationOptions = makeValidationOptions(pattern);

  return {
    ...defaultValidationOptions,
    validationTooShort: variable('Value too short message', {
      value: ['This value is too short'],
      ...validationAttrs,
    }),
    validationTooLong: variable('Value too long message', {
      value: ['This value is too long'],
      ...validationAttrs,
    }),
  };
}
