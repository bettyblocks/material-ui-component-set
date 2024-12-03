import {
  buttongroup,
  color,
  showIf,
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
  floatLabel: toggle('Place label above input', {
    value: true,
  }),

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

  hideLabel: toggle('Hide label', {
    value: false,
  }),

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
  }),

  backgroundColorPopup: color('Background color popup', {
    value: ThemeColor.PRIMARY,
  }),

  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
  }),

  borderHoverColor: color('Border color (hover)', {
    value: ThemeColor.BLACK,
  }),

  borderFocusColor: color('Border color (focus)', {
    value: ThemeColor.PRIMARY,
  }),

  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
  }),

  textColor: color('Text color', {
    value: ThemeColor.BLACK,
  }),

  placeholderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
  }),

  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),

  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
};
