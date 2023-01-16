import { variable, icon } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const stepOptions = {
  label: variable('Label', { value: ['Step'] }),
  icon: icon('Icon', { value: 'None' }),

  ...advanced('Step'),
};
