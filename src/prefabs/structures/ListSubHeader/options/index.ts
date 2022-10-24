import {
  variable,
  toggle,
  color,
  ThemeColor,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const listSubHeaderOptions = {
  text: variable('Sub header', { value: ['Header'] }),
  inset: toggle('Inset', { value: true }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  textColor: color('Text color', { value: ThemeColor.BLACK }),

  ...advanced('List sub header'),
};
