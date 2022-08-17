import {
  buttongroup,
  color,
  option,
  showIfTrue,
  text,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

export const options = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: ['Select file(s)...'] }),
  value: variable('Value', { value: [''] }),
  required: toggle('Required', { value: false }),
  requiredMessage: variable('Required message', {
    value: ['file is required'],
    configuration: { condition: showIfTrue('required') },
  }),
  maxFileSize: text('Max file size (mb)', { value: '' }),
  maxFileSizeMessage: variable('Filesize message', {
    value: ['maximum size exceeded'],
  }),
  hideDefaultError: toggle('Hide default error', { value: false }),
  disabled: toggle('Disabled', { value: false }),
  helperText: variable('Helper text', { value: [] }),
  fullWidth: toggle('Full width', { value: true }),
  accept: variable('Accept files', { value: ['image/*'] }),
  multiple: toggle('Allow multiple', { value: false }),
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
  hideLabel: toggle('Hide label', {
    value: false,
    configuration: {
      condition: showIfTrue('styles'),
    },
  }),
  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
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
  nameAttribute: variable('name attribute', {
    value: [],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['FileUpload'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};
