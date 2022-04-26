import {
  buttongroup,
  color,
  icon,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const styles = {
  variant: buttongroup(
    'Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

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

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    ...showOn('styles'),
  }),

  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
    ...showOn('styles'),
  }),

  borderHoverColor: color('Border color (hover)', {
    value: ThemeColor.BLACK,
    ...showOn('styles'),
  }),

  borderFocusColor: color('Border color (focus)', {
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
