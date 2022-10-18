import {
  option,
  toggle,
  text,
  color,
  ThemeColor,
  showIfTrue,
  variable,
  showIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

const stylesConfiguration = {
  configuration: { condition: showIfTrue('styles') },
};
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

export const categories = [
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const checkboxInputOptions = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: ['Checkbox'] }),
  value: variable('Value', { value: [] }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
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
  validationOptions: toggle('Validation options'),
  required: toggle('Required', validationConfiguration),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...validationConfiguration,
  }),

  ...advanced('CheckboxInput'),
};
