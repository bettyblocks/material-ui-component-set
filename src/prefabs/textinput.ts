import {
  component,
  Icon,
  option,
  prefab,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

import { makeTextValidationOptions } from './options/makeTextValidationOptions';
import { makeAdvancedSettingsOptions } from './options/makeAdvancedSettingsOptions';
import { defaultInputOptions } from './options/defaultInputOptions';
import { defaultStylesOptions } from './options/defaultStylesOptions';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const attributes = {
  category: 'FORM',
  icon: Icon.TextInputIcon,
};

const validationOptions = makeTextValidationOptions(
  '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
);
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
  ...defaultStylesOptions,
  ...advancedOptions,
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

const textInput = prefab('TextInput', attributes, undefined, [
  component('TextInput', { options, ...hooks }, []),
]);

export default textInput;
