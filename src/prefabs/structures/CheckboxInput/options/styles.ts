import { color, ThemeColor } from '@betty-blocks/component-sdk';

export const styles = {
  checkboxColor: color('Checkbox color', {
    value: ThemeColor.ACCENT_3,
  }),
  checkboxColorChecked: color('Checkbox color checked', {
    value: ThemeColor.PRIMARY,
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
