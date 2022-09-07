import * as React from 'react';
import {
  BeforeCreateArgs,
  buttongroup,
  color,
  component,
  option,
  prefab,
  showIf,
  showIfTrue,
  text,
  toggle,
  variable,
  Icon,
  ThemeColor,
  hideIf,
} from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  const actionVariableOption = structure.options.find(
    (o) => o.type === 'ACTION_JS_VARIABLE',
  );

  return (
    <CreateFormInputWizard
      supportedKinds={['BOOLEAN']}
      actionVariableOption={actionVariableOption?.key || null}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={originalPrefab}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORMV2',
  icon: Icon.CheckboxIcon,
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
    value: ThemeColor.ACCENT_3,
  }),
  checkboxColorChecked: color('Checkbox color checked', {
    ...stylesConfiguration,
    value: ThemeColor.PRIMARY,
  }),
  textColor: color('Text color', {
    ...stylesConfiguration,
    value: ThemeColor.BLACK,
  }),
  helperColor: color('Helper color', {
    ...stylesConfiguration,
    value: ThemeColor.ACCENT_2,
  }),
  errorColor: color('Error color', {
    ...stylesConfiguration,
    value: ThemeColor.DANGER,
  }),
};

const advancedSettingsOptions = {
  advancedSettings: toggle('Advanced settings'),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Checkbox'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};

const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),
  label: variable('Label', { value: ['Checkbox'] }),
  value: variable('Value', { value: [] }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  position,
  size,
  ...stylesOptions,
  ...advancedSettingsOptions,
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
};

export default prefab('Checkbox Beta', attributes, beforeCreate, [
  component('CheckboxInput', { label: 'Checkbox input Beta', options }, []),
]);
