import {
  buttongroup,
  color,
  icon,
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

  adornmentIcon: icon('Icon', {
    value: '',
  }),

  adornmentPosition: buttongroup(
    'Position',
    [
      ['Start', 'start'],
      ['End', 'end'],
    ],
    {
      value: 'end',
      configuration: {
        condition: {
          type: 'HIDE',
          option: 'adornmentIcon',
          comparator: 'EQ',
          value: '',
        },
      },
    },
  ),

  hideLabel: toggle('Hide label'),

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
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
