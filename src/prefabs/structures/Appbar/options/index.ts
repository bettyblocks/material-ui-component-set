import {
  color,
  ThemeColor,
  size,
  option,
  variable,
  endpoint,
  showIf,
  toggle,
  font,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Logo',
    expanded: true,
    members: ['type', 'urlFileSource', 'logoSource', 'logoWidth', 'endpoint'],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'position',
      'height',
      'appBarVariant',
      'elevation',
      'square',
      'toolbarVariant',
      'alignItems',
      'backgroundColor',
      'font',
      'color',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const appBarOptions = {
  backgroundColor: color('Background color', { value: ThemeColor.PRIMARY }),
  color: color('Text color', { value: ThemeColor.WHITE }),
  height: size('Height', { value: '', configuration: { as: 'UNIT' } }),
  font: font('Title text style', { value: 'Body1' }),
  position: option('CUSTOM', {
    label: 'Position',
    value: 'static',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Fixed',
          value: 'fixed',
        },
        {
          name: 'Absolute',
          value: 'absolute',
        },
        {
          name: 'Sticky',
          value: 'sticky',
        },

        {
          name: 'Static',
          value: 'static',
        },
        {
          name: 'Relative',
          value: 'relative',
        },
      ],
    },
  }),
  title: variable('Title', { value: ['App Bar'] }),
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'url',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'img' },
        { name: 'URL', value: 'url' },
      ],
    },
  }),
  logoSource: option('PUBLIC_FILE', {
    label: 'Logo',
    value: '',
    configuration: {
      mediaType: 'IMAGE',
      allowedExtensions: ['image/*'],
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  urlFileSource: variable('Source', {
    value: [''],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      as: 'MULTILINE',
      condition: showIf('type', 'EQ', 'url'),
    },
  }),
  logoWidth: size('Logo Width', {
    value: '150px',
    configuration: { as: 'UNIT' },
  }),
  alignItems: option('CUSTOM', {
    label: 'Align items',
    value: 'right',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
    },
  }),
  endpoint: endpoint('Page', { value: '' }),
  appBarVariant: option('CUSTOM', {
    label: 'Variant',
    value: 'flat',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Flat',
          value: 'flat',
        },
        {
          name: 'Elevation',
          value: 'elevation',
        },
        {
          name: 'Outlined',
          value: 'outlined',
        },
      ],
    },
  }),
  elevation: option('CUSTOM', {
    label: 'Elevation',
    value: '1',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
        { name: '13', value: '13' },
        { name: '14', value: '14' },
        { name: '15', value: '15' },
        { name: '16', value: '16' },
        { name: '17', value: '17' },
        { name: '18', value: '18' },
        { name: '19', value: '19' },
        { name: '20', value: '20' },
        { name: '21', value: '21' },
        { name: '22', value: '22' },
        { name: '23', value: '23' },
        { name: '24', value: '24' },
      ],
      condition: showIf('appBarVarient', 'EQ', 'elevation'),
    },
  }),
  square: toggle('Square', { value: true }),
  toolbarVariant: option('CUSTOM', {
    label: 'Size',
    value: 'regular',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Regular',
          value: 'regular',
        },
        {
          name: 'Dense',
          value: 'dense',
        },
      ],
    },
  }),

  ...advanced('AppBar'),
};
