import {
  variable,
  toggle,
  option,
  showIf,
  sizes,
} from '@betty-blocks/component-sdk';
import { styles } from './styles';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Title styles',
    expanded: false,
    members: ['titleType', 'titleTextColor', 'titleFontWeight', 'titleSpacing'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['preloadData', 'dataComponentAttribute'],
  },
];

export const expansionPanelOptions = {
  title: variable('Title', { value: ['Title'] }),
  defaultExpanded: toggle('Default expanded', { value: true }),
  square: toggle('Square', { value: false }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'elevation',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Flat', value: 'flat' },
        { name: 'Elevation', value: 'elevation' },
        { name: 'Outlined', value: 'outlined' },
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
      condition: showIf('variant', 'EQ', 'elevation'),
    },
  }),
  ...styles,

  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  innerSpacing: sizes('Inner space', {
    value: ['M', 'M', 'M', 'M'],
  }),

  preloadData: toggle('Preload data', {
    value: false,
  }),
  ...advanced('Expansion Panel'),
};
