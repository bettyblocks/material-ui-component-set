import {
  component,
  prefab,
  variable,
  option,
  buttongroup,
  toggle,
  color,
  showIfTrue,
} from '@betty-blocks/component-sdk';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const attributes = {
  category: 'FORM',
  icon: 'CheckboxIcon',
};

const position = buttongroup(
  'Label Position',
  [
    ['Start', 'start'],
    ['End', 'end'],
    ['Top', 'top'],
    ['Bottom', 'bottom'],
  ],
  {
    value: 'end',
  },
);

const size = buttongroup(
  'Size',
  [
    ['Medium', 'medium'],
    ['Small', 'small'],
  ],
  {
    value: 'medium',
  },
);

const validationConfiguration = {
  configuration: { condition: showIfTrue('validationOptions') },
};

const validationOptions = {
  validationOptions: toggle('Validation options'),
  required: toggle('Required', validationConfiguration),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...validationConfiguration,
  }),
};

const stylesConfiguration = {
  configuration: { condition: showIfTrue('styles') },
};

const stylesOptions = {
  styles: toggle('Styles'),
  checkboxColor: color('Checkbox color', {
    ...stylesConfiguration,
    value: 'Accent3',
  }),
  checkboxColorChecked: color('Checkbox color checked', {
    ...stylesConfiguration,
    value: 'Primary',
  }),
  textColor: color('Text color', { ...stylesConfiguration, value: 'Black' }),
  helperColor: color('Helper color', {
    ...stylesConfiguration,
    value: 'Accent2',
  }),
  errorColor: color('Error color', { ...stylesConfiguration, value: 'Danger' }),
};

const advancedSettingsOptions = {
  advancedSettings: toggle('Advanced settings'),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Checkbox'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};

const options = {
  label: variable('Label', { value: ['Checkbox'] }),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  position,
  ...validationOptions,
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  size,
  ...stylesOptions,
  ...advancedSettingsOptions,
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

export default prefab('CheckboxInput', attributes, undefined, [
  component('CheckboxInput', { options, ...hooks }, []),
]);
