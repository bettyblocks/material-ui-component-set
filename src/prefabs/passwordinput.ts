import {
  component,
  option,
  prefab,
  toggle,
  variable,
  text,
  showIfTrue,
  Icon,
} from '@betty-blocks/component-sdk';

import { makeTextValidationOptions } from './options/makeTextValidationOptions';
import { makeAdvancedSettingsOptions } from './options/makeAdvancedSettingsOptions';
import { defaultInputOptions } from './options/defaultInputOptions';
import { defaultStylesOptions } from './options/defaultStylesOptions';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const attributes = {
  category: 'FORM',
  icon: Icon.PasswordInputIcon,
};

const validationOptions = {
  ...makeTextValidationOptions('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
  validationPatternMismatch: variable('Pattern mismatch message', {
    value: [
      'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
    ],
    configuration: {
      condition: showIfTrue('validationOptions'),
    },
  }),
};
const advancedOptions = makeAdvancedSettingsOptions('TextField');

const options = {
  label: variable('Label'),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  autoComplete: toggle('Autocomplete', { value: true }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  ...defaultInputOptions,
  type: text('Type', {
    value: 'password',
    configuration: { condition: showIfTrue('adornmentPosition') },
  }),
  ...defaultStylesOptions,
  ...advancedOptions,
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

const textInput = prefab('PasswordInput', attributes, undefined, [
  component('TextInput', { options, ...hooks }, []),
]);

export default textInput;
