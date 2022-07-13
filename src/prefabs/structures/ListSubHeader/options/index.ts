import {
  variable,
  toggle,
  color,
  ThemeColor,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  text: variable('Sub header', { value: ['Header'] }),
  inset: toggle('Inset', { value: true }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  textColor: color('Text color', { value: ThemeColor.BLACK }),

  ...advanced,
};
