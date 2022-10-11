import { color, size, sizes, ThemeColor } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const dividerOptions = {
  thickness: size('Thickness', { value: 'S' }),
  color: color('Color', { value: ThemeColor.LIGHT }),
  outerSpacing: sizes('Outer space', {
    value: ['M', '0rem', 'M', '0rem'],
  }),

  ...advanced('Divider'),
};
