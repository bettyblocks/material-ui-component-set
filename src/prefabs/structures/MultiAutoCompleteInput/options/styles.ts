import {
  buttongroup,
  color,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

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
    'Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

  styles: toggle('Styles', { value: false }),

  hideLabel: toggle('Hide label', {
    value: false,
    ...showOn('styles'),
  }),

  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    ...showOn('styles'),
  }),

  backgroundColorChip: color('Background color chip', {
    value: ThemeColor.LIGHT,
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

  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    ...showOn('styles'),
  }),

  textColorChip: color('Text color chip', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  checkboxColor: color('Checkbox color', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  placeHolderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
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
