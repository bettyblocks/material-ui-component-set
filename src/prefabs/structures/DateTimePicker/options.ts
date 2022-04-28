import {
  buttongroup,
  color,
  option,
  showIf,
  showIfTrue,
  text,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../utils';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  validationOptions: toggle('Validation options'),

  required: toggle('Required', showOn('validationOptions')),

  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('required'),
  }),

  type: text('Type', {
    value: 'datetime',
    configuration: {
      condition: showIf('type', 'EQ', false),
    },
  }),

  disableToolbar: toggle('Disable Toolbar', { value: false }),

  timeFormat: text('Format', {
    value: 'MM/dd/yyyy HH:mm:ss',
    configuration: { placeholder: 'dd/MM/yyyy HH:mm:ss' },
  }),

  use24HourClockTime: toggle('Use 24-hour format', { value: true }),

  error: toggle('Error', { value: false }),

  disabled: toggle('Disabled', { value: false }),

  autoComplete: toggle('Autocomplete', { value: true }),

  placeholder: variable('Placeholder', { value: [] }),

  helperText: variable('Helper text', { value: [] }),

  variant: buttongroup(
    'Variant',
    [
      ['Dialog', 'dialog'],
      ['Inline', 'inline'],
      ['Static', 'static'],
    ],
    { value: 'inline' },
  ),

  clearable: toggle('Clearable', {
    value: false,
    configuration: { condition: showIf('variant', 'EQ', 'dialog') },
  }),

  inputvariant: buttongroup(
    'Input Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

  fullWidth: toggle('Full width', { value: true }),

  size: buttongroup(
    'Size',
    [
      ['Medium', 'medium'],
      ['Small', 'small'],
    ],
    { value: 'medium' },
  ),

  margin: buttongroup(
    'Margin',
    [
      ['None', 'none'],
      ['Dense', 'dense'],
      ['Normal', 'normal'],
    ],
    { value: 'normal' },
  ),

  styles: toggle('Styles', { value: false }),

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    configuration: { condition: showIfTrue('styles') },
  }),

  backgroundColorPopup: color('Background color popup', {
    value: ThemeColor.PRIMARY,
    configuration: { condition: showIfTrue('styles') },
  }),

  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
    configuration: { condition: showIfTrue('styles') },
  }),

  borderHoverColor: color('Border color (hover)', {
    value: ThemeColor.BLACK,
    configuration: { condition: showIfTrue('styles') },
  }),

  borderFocusColor: color('Border color (focus)', {
    value: ThemeColor.PRIMARY,
    configuration: { condition: showIfTrue('styles') },
  }),

  hideLabel: toggle('Hide label', {
    value: false,
    configuration: { condition: showIfTrue('true') },
  }),

  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    configuration: { condition: showIfTrue('styles') },
  }),

  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    configuration: { condition: showIfTrue('styles') },
  }),

  placeholderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
    configuration: { condition: showIfTrue('styles') },
  }),

  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
    configuration: { condition: showIfTrue('styles') },
  }),

  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
    configuration: { condition: showIfTrue('styles') },
  }),

  advancedSettings: toggle('Advanced settings', { value: false }),

  nameAttribute: variable('Name attribute', {
    value: [],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),

  dataComponentAttribute: variable('Test attribute', {
    value: ['DateTimePicker'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};
