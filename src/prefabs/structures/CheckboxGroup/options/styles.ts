import {
  color,
  ThemeColor,
  toggle,
  buttongroup,
} from '@betty-blocks/component-sdk';

export const styles = {
  checkboxColor: color('Checkbox color', {
    value: ThemeColor.ACCENT_3,
  }),
  checkboxColorChecked: color('Checkbox color checked', {
    value: ThemeColor.PRIMARY,
  }),
  hideLabel: toggle('Hide label', {
    value: false,
  }),
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
};
