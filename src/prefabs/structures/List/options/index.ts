import { color, ThemeColor, toggle, sizes } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const listOptions = {
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  disablePadding: toggle('Disable padding', { value: false }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  dense: toggle('Dense', { value: false }),

  ...advanced('List'),
};
