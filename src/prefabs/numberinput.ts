import {
  component,
  prefab,
  variable,
  option,
  toggle,
  number,
  showIf,
  Icon,
} from '@betty-blocks/component-sdk';

import { makeNumberValidationOptions } from './options/makeNumberValidationOptions';
import { defaultInputOptions } from './options/defaultInputOptions';
import { defaultStylesOptions } from './options/defaultStylesOptions';
import { makeAdvancedSettingsOptions } from './options/makeAdvancedSettingsOptions';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const attributes = {
  category: 'FORM',
  icon: Icon.NumberInputIcon,
};

const validationOptions = makeNumberValidationOptions('[0-9]{8,}');
const advancedSettingsOptions = makeAdvancedSettingsOptions('TextField');

const options = {
  label: variable('Label', { value: ['Number'] }),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  autoComplete: toggle('Autocomplete', { value: true }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  ...defaultInputOptions,
  type: number('Type', {
    value: 'number',
    configuration: { condition: showIf('adornment', 'EQ', '0') },
  }),
  ...defaultStylesOptions,
  ...advancedSettingsOptions,
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

export default prefab('NumberInput', attributes, undefined, [
  component('TextInput', { options, ...hooks }, []),
]);
