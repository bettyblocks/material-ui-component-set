import { color, ThemeColor, sizes, toggle } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute', 'disableEnforceFocus'],
  },
];

export const drawerBarOptions = {
  themeBgColor: color('Theme background color', { value: ThemeColor.WHITE }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  innerSpacing: sizes('Inner space', {
    value: ['M', 'M', 'M', 'M'],
  }),
  disableEnforceFocus: toggle('Disable enforce focus', {
    value: false,
  }),

  ...advanced('Drawer Sidebar'),
};
