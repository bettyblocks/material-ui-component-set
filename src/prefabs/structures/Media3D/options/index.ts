import {
  ThemeColor,
  color,
  option,
  size,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['width', 'height', 'backgroundColor', 'environmentLighting'],
  },
  {
    label: 'Camera',
    expanded: false,
    members: ['lockCamera', 'cameraSpeed'],
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

export const media3DOptions = {
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
    value: '400px',
    configuration: {
      as: 'UNIT',
    },
  }),
  backgroundColor: color('Background color', {
    value: ThemeColor.LIGHT,
  }),
  environmentLighting: option('CUSTOM', {
    label: 'Environment lighting',
    value: 'studio',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Studio', value: 'studio' },
        { name: 'Apartment', value: 'apartment' },
        { name: 'City', value: 'city' },
        { name: 'Dawn', value: 'dawn' },
        { name: 'Forest', value: 'forest' },
        { name: 'Lobby', value: 'lobby' },
        { name: 'Night', value: 'night' },
        { name: 'Park', value: 'park' },
        { name: 'Sunset', value: 'sunset' },
        { name: 'Warehouse', value: 'warehouse' },
      ],
    },
  }),
  lockCamera: toggle('Lock camera', {
    value: false,
  }),
  cameraSpeed: variable('Camera speed', {
    value: ['0.4'],
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  ...advanced('Media 3D'),
};
