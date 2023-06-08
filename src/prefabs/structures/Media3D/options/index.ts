import { option, size, sizes } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['width', 'height'],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['outerSpacing'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const mediaOptions = {
  modelFileSource: option('PUBLIC_FILE', {
    label: 'Select 3D model',
    value: '',
  }),
  width: size('Width', {
    value: '100%',
    configuration: {
      as: 'UNIT',
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  ...advanced('Media 3D'),
};
