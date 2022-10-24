import {
  option,
  text,
  sizes,
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

export const rowOptions = {
  maxRowWidth: option('CUSTOM', {
    label: 'Width',
    value: 'XL',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'S', value: 'S' },
        { name: 'M', value: 'M' },
        { name: 'L', value: 'L' },
        { name: 'XL', value: 'XL' },
        { name: 'Full', value: 'Full' },
      ],
    },
  }),
  rowHeight: text('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),

  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  ...advanced('Row'),
};
