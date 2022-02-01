import {
  prefab,
  component,
  variable,
  option,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';

import { makeTextValidationOptions } from './options/makeTextValidationOptions';
import { makeAdvancedSettingsOptions } from './options/makeAdvancedSettingsOptions';
import { defaultInputOptions } from './options/defaultInputOptions';
import { defaultStylesOptions } from './options/defaultStylesOptions';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const attributes = {
  category: 'Form',
  icon: 'EmailInputIcon',
  keywords: ['Form', 'email', 'input', 'emailinput'],
};

const validationOptions = {
  ...makeTextValidationOptions('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
  validationTypeMismatch: variable('Email mismatch message', {
    value: ['No valid value provided'],
    configuration: {
      condition: showIfTrue('validationOptions'),
    },
  }),
};

const advancedSettingsOptions = makeAdvancedSettingsOptions('TextField');

const options = {
  label: variable('Label'),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  autocomplete: toggle('Autocomplete', { value: true }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  ...defaultInputOptions,
  ...defaultStylesOptions,
  ...advancedSettingsOptions,
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

export default prefab('EmailInput', attributes, undefined, [
  component('TextInput', { options, ...hooks }, []),
]);
