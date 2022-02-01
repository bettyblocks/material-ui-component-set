import {
  toggle,
  number,
  text,
  showIfTrue,
  variable,
} from '@betty-blocks/component-sdk';

import { makeValidationOptions } from './makeValidationOptions';

export function makeNumberValidationOptions(pattern: string) {
  const validationAttrs = {
    configuration: { condition: showIfTrue('validationOptions') },
  };

  const defaultValidationOptions = makeValidationOptions(pattern);

  return {
    ...defaultValidationOptions,
    validationBelowMinimum: variable('Value below minimum message', {
      value: ['This value is below the set minimum'],
      ...validationAttrs,
    }),
    validationAboveMaximum: variable('Value above maximum message', {
      value: ['This value is above the set maximum'],
      ...validationAttrs,
    }),
  };
}
