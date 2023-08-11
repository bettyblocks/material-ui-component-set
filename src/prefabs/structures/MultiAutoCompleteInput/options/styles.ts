import {
  buttongroup,
  color,
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
    'Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

  hideLabel: toggle('Hide label', {
    value: false,
  }),

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
  }),

  backgroundColorChip: color('Background color chip', {
    value: ThemeColor.LIGHT,
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

  textColorChip: color('Text color chip', {
    value: ThemeColor.ACCENT_3,
  }),

  checkboxColor: color('Checkbox color', {
    value: ThemeColor.ACCENT_3,
  }),

  placeHolderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
  }),

  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),

  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
};
