import { variable, icon } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  label: variable('Label', { value: ['Step'] }),
  icon: icon('Icon', { value: 'None' }),

  ...advanced,
};
