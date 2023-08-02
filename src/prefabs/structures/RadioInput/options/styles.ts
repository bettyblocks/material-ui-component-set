import {
  buttongroup,
  color,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = {
  labelPosition: buttongroup(
    'LabelPosition',
    [
      ['Start', 'start'],
      ['End', 'end'],
      ['Top', 'top'],
      ['Bottom', 'bottom'],
    ],
    { value: 'end' },
  ),

  row: toggle('Row', { value: true }),
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

  radioColor: color('Radio color', {
    value: ThemeColor.ACCENT_3,
  }),

  radioColorChecked: color('Radio color checked', {
    value: ThemeColor.PRIMARY,
  }),

  hideLabel: toggle('Hide label'),

  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
  }),

  textColor: color('Text color', {
    value: ThemeColor.BLACK,
  }),

  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),

  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
};
