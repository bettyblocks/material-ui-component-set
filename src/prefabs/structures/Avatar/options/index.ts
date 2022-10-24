import {
  option,
  variable,
  showIf,
  icon,
  color,
  ThemeColor,
  size,
  sizes,
  text,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['width', 'height', 'fontSize', 'textColor', 'fontWeight'],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['margin'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const avatarOptions = {
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
    value: 'Person', // There is no Icon for the MUI icons yet.
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
  fontSize: text('Font size', {
    value: '1.25rem',
    configuration: {
      as: 'UNIT',
    },
  }),
  textColor: color('Text color', {
    value: ThemeColor.WHITE,
  }),
  fontWeight: option('CUSTOM', {
    label: 'Font weight',
    value: '400',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '100', value: '100' },
        { name: '200', value: '200' },
        { name: '300', value: '300' },
        { name: '400', value: '400' },
        { name: '500', value: '500' },
        { name: '600', value: '600' },
        { name: '700', value: '700' },
        { name: '800', value: '800' },
        { name: '900', value: '900' },
      ],
    },
  }),

  ...advanced('Avatar'),
};
