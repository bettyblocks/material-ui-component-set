import {
  color,
  size,
  sizes,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const styles = {
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  styles: toggle('Styles'),
  hideLabel: toggle('Hide label', showOn('styles')),

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

  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    ...showOn('styles'),
  }),

  placeholderColor: color('Placeholder color', {
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
