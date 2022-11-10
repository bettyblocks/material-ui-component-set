import {
  color,
  size,
  sizes,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

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
    value: ['S', '0rem', 'S', '0rem'],
  }),

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

  buttonColor: color('Button color', {
    value: ThemeColor.ACCENT_1,
  }),

  buttonHoverColor: color('Button color (hover)', {
    value: ThemeColor.BLACK,
  }),

  buttonActiveColor: color('Button color (active)', {
    value: ThemeColor.PRIMARY,
  }),

  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
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
