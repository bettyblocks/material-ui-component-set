import {
  color,
  ThemeColor,
  size,
  option,
  variable,
  endpoint,
  showIf,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Logo',
    expanded: true,
    members: ['logoSource', 'logoWidth', 'endpoint'],
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
      'color',
    ],
  },
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const appBarOptions = {
  backgroundColor: color('Background color', { value: ThemeColor.PRIMARY }),
  color: color('Text color', { value: ThemeColor.WHITE }),
  height: size('Height', { value: '', configuration: { as: 'UNIT' } }),
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
  logoSource: variable('Logo source', { value: [] }),
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
  endpoint: endpoint('Logo links to', { value: '' }),
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
      condition: showIf('appBarVariant', 'EQ', 'elevation'),
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
