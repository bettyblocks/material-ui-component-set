import { showIfTrue, variable } from '@betty-blocks/component-sdk';
import { makeNumberValidationOptions } from '../options/makeNumberValidationOptions';
import { makeTextValidationOptions } from '../options/makeTextValidationOptions';

export function makeTextInputValidation(): Object {
  return makeTextValidationOptions('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
}

export function makePasswordInputValidation(): Object {
  const defaultOptions = makeTextValidationOptions(
    '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
  );

  return {
    ...defaultOptions,
    validationPatternMismatch: variable('Pattern mismatch message', {
      value: [
        'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
      ],
      configuration: {
        condition: showIfTrue('validationOptions'),
      },
    }),
  };
}

export function makeEmailInputValidation(): Object {
  const defaultOptions = makeTextValidationOptions(
    '[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}+[a-z]{2,4}$',
  );

  return {
    ...defaultOptions,
    validationPatternMismatch: variable('Email mismatch message', {
      value: ['No valid value provided'],
      configuration: {
        condition: showIfTrue('validationOptions'),
      },
    }),
  };
}

export function makePriceInputValidation(): Object {
  return makeNumberValidationOptions('[0-9]+(\\.[0-9][0-9]?)?');
}

export function makeNumberInputValidation(): Object {
  return makeNumberValidationOptions('[0-9]{8,}');
}

export function makeIbanInputValidation(): Object {
  return makeTextValidationOptions(
    '^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$'
  );
}
