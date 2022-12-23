import {
  option,
  toggle,
  color,
  ThemeColor,
  text,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const containerOptions = {
  maxWidth: option('CUSTOM', {
    label: 'Max width',
    value: 'lg',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'XS', value: 'xs' },
        { name: 'SM', value: 'sm' },
        { name: 'MD', value: 'md' },
        { name: 'LG', value: 'lg' },
        { name: 'XL', value: 'xl' },
        { name: 'None', value: 'false' },
      ],
    },
  }),
  disableGutters: toggle('Disable gutters', { value: false }),

  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),

  height: text('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  ...advanced('Container'),
};
