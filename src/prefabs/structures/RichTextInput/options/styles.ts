import {
  color,
  size,
  sizes,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = {
  height: size('Height', {
    value: '200px',
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
  floatLabel: toggle('Place label above input', {
    value: true,
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
    value: ThemeColor.DARK,
  }),

  buttonHoverColor: color('Button color (hover)', {
    value: ThemeColor.BLACK,
  }),

  buttonActiveColor: color('Button color (active)', {
    value: ThemeColor.PRIMARY,
  }),

  buttonDisabledColor: color('Button color (disabled)', {
    value: ThemeColor.ACCENT_3,
  }),

  labelColor: color('Label color', {
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
