import { color, ThemeColor, sizes } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  themeBgColor: color('Theme background color', {
    value: ThemeColor.TRANSPARENT,
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  innerSpacing: sizes('Inner space', {
    value: ['M', 'M', 'M', 'M'],
  }),

  ...advanced,
};
