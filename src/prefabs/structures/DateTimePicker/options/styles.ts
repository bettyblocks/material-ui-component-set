import {
  buttongroup,
  color,
  showIf,
  showIfTrue,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = {
  margin: buttongroup(
    'Margin',
    [
      ['None', 'none'],
      ['Dense', 'dense'],
      ['Normal', 'normal'],
    ],
    { value: 'normal' },
  ),

  size: buttongroup(
    'Size',
    [
      ['Medium', 'medium'],
      ['Small', 'small'],
    ],
    { value: 'medium' },
  ),

  fullWidth: toggle('Full width', { value: true }),

  variant: buttongroup(
    'Picker Variant',
    [
      ['Dialog', 'dialog'],
      ['Inline', 'inline'],
      ['Static', 'static'],
    ],
    { value: 'inline' },
  ),

  inputvariant: buttongroup(
    'Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

  disableToolbar: toggle('Disable Toolbar', { value: false }),

  clearable: toggle('Clearable', {
    value: false,
    configuration: { condition: showIf('variant', 'EQ', 'dialog') },
  }),

  styles: toggle('Styles', { value: false }),

  hideLabel: toggle('Hide label', {
    value: false,
    configuration: { condition: showIfTrue('styles') },
  }),

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
};
