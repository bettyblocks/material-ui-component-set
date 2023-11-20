import { toggle, variable, icon } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const stepOptions = {
  label: variable('Label', {
    value: ['Step'],
    configuration: {
      showOnDrop: true,
    },
  }),
  icon: icon('Icon', {
    value: 'None',
    configuration: {
      showOnDrop: true,
    },
  }),
  disabled: toggle('Disabled', { value: false }),

  ...advanced('Step'),
};
