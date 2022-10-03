import {
  buttongroup,
  color,
  option,
  property,
  showIf,
  showIfTrue,
  size,
  text,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

const imageOptions = {
  showImagePreview: toggle('Show Image preview', { value: true }),
  imagePreviewWidth: size('Image preview width', {
    value: '200px',
    configuration: { as: 'UNIT', condition: showIfTrue('showImagePreview') },
  }),
  imagePreviewHeight: size('Image preview height', {
    value: '112px',
    configuration: { as: 'UNIT', condition: showIfTrue('showImagePreview') },
  }),
};

export const options = (supportImages?: boolean) => ({
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: ['Select file(s)...'] }),
  value: property('Value'),
  maxFileSize: text('Max file size (mb)', { value: '' }),
  maxFileSizeMessage: variable('Invalid max file size message', {
    value: ['maximum size exceeded'],
  }),
  hideDefaultError: toggle('Hide default error', { value: false }),
  disabled: toggle('Disabled', { value: false }),
  helperText: variable('Helper text', { value: [] }),
  fullWidth: toggle('Full width', { value: true }),
  ...(supportImages ? imageOptions : {}),
  accept: variable('Accept files', { value: ['*'] }),
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
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
});
