import {
  color,
  variable,
  ThemeColor,
  sizes,
  font
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const panelOptions = {
  panelTitle: variable('Title', { value: ['Title'] }),
  color: color('Title color', { value: ThemeColor.WHITE }),
  font: font('Text style', { value: 'Body1' }),
  panelColor: color('Panel color', { value: ThemeColor.PRIMARY }),
  outerSpacing: sizes('Outer space', { value: ['0rem', '0rem', 'M', '0rem'] }),
  innerSpacing: sizes('Inner space', { value: ['M', 'M', 'M', 'M'] }),

  ...advanced('Panel'),
};
