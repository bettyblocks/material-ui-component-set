import {
  option,
  variable,
  showIf,
  icon,
  color,
  ThemeColor,
  size,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  type: option('CUSTOM', {
    label: 'Type',
    value: 'img',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'img' },
        { name: 'Letter', value: 'letter' },
        { name: 'Icon', value: 'icon' },
      ],
    },
  }),
  imgUrl: variable('Image url', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  imgAlt: variable('Image alternative text', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  letter: variable('Letter', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'letter'),
    },
  }),
  icon: icon('Icon', {
    value: 'None',
    configuration: {
      condition: showIf('type', 'EQ', 'icon'),
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'circle',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Circle', value: 'circle' },
        { name: 'Rounded', value: 'rounded' },
        { name: 'Square', value: 'square' },
      ],
    },
  }),
  backgroundColor: color('Background color', {
    value: ThemeColor.ACCENT_1,
    configuration: {
      condition: {
        type: 'HIDE',
        option: 'type',
        comparator: 'EQ',
        value: 'img',
      },
    },
  }),
  width: size('Width', {
    value: '40px',
    configuration: {
      as: 'UNIT',
    },
  }),
  height: size('Height', {
    value: '40px',
    configuration: {
      as: 'UNIT',
    },
  }),
  margin: sizes('Outer Space', {
    value: ['M', 'M', 'M', 'M'],
  }),

  ...styles,

  ...advanced,
};
