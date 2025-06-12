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
  fullWidth: toggle('Full width', { value: true }),

  hideLabel: toggle('Hide label', {
    value: false,
  }),
  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),
  deleteIconColor: color('Delete icon color', {
    value: ThemeColor.LIGHT,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
};
