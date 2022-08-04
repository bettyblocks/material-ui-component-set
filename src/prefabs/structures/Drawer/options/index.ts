import {
  size,
  option,
  showIf,
  hideIf,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const drawerOptions = {
  drawerWidth: size('Drawer Width', {
    value: '200px',
    configuration: {
      as: 'UNIT',
    },
  }),
  drawerType: option('CUSTOM', {
    value: 'persistent',
    label: 'Drawer type',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Persistent', value: 'persistent' },
        { name: 'Temporary', value: 'temporary' },
      ],
    },
  }),
  breakpoint: option('CUSTOM', {
    value: 'sm',
    label: 'Responsively temporary on',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Permanent', value: 'xs' },
        { name: 'Mobile', value: 'sm' },
        { name: 'Tablet portrait', value: 'md' },
        { name: 'Tablet landscape', value: 'lg' },
      ],
      condition: showIf('drawerType', 'EQ', 'persistent'),
    },
  }),
  temporaryAnchor: option('CUSTOM', {
    value: 'left',
    label: 'Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Top', value: 'top' },
        { name: 'Right', value: 'right' },
        { name: 'Bottom', value: 'bottom' },
      ],
      condition: showIf('drawerType', 'EQ', 'temporary'),
    },
  }),
  persistentAnchor: option('CUSTOM', {
    value: 'left',
    label: 'Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Right', value: 'right' },
      ],
      condition: hideIf('drawerType', 'EQ', 'temporary'),
    },
  }),
  visibility: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),

  ...advanced('Drawer'),
};
