import {
  buttongroup,
  color,
  icon,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

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

  styles: toggle('Styles'),

  radioColor: color('Radio color', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  radioColorChecked: color('Radio color checked', {
    value: ThemeColor.PRIMARY,
    ...showOn('styles'),
  }),

  hideLabel: toggle('Hide label', showOn('styles')),

  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    ...showOn('styles'),
  }),

  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
    ...showOn('styles'),
  }),

  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
    ...showOn('styles'),
  }),
};
