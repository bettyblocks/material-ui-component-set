import {
  toggle,
  model,
  filter,
  number,
  option,
  size,
  color,
  ThemeColor,
  showIf,
  hideIf,
} from '@betty-blocks/component-sdk';
import { responsive } from './responsive';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Alignment',
    expanded: false,
    members: ['alignItems', 'alignContent', 'justify', 'wrap'],
  },
  {
    label: 'Styling',
    expanded: false,
    members: ['height', 'backgroundColor', 'spacing'],
  },
  {
    label: 'Responsiveness',
    expanded: false,
    members: ['xsWidth', 'smWidth', 'mdWidth', 'lgWidth', 'xlWidth'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['zeroMinWidth', 'dataComponentAttribute'],
  },
];

export const gridOptions = {
  visibility: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  model: model('Model', {
    value: '',
  }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
    },
  }),
  repeatedItems: number('Repeated items (preview)', {
    value: '5',
    configuration: {
      condition: hideIf('model', 'EQ', ''),
    },
  }),
  type: option('CUSTOM', {
    label: 'Type',
    value: 'container',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Container', value: 'container' },
        { name: 'Item', value: 'item' },
      ],
    },
  }),
  direction: option('CUSTOM', {
    value: 'row',
    label: 'Direction',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Horizontal', value: 'row' },
        { name: 'Vertical', value: 'column' },
      ],
      condition: showIf('type', 'EQ', 'container'),
    },
  }),
  reverse: toggle('Reverse', {
    value: false,
    configuration: {
      condition: showIf('type', 'EQ', 'container'),
    },
  }),
  alignItems: option('CUSTOM', {
    value: 'stretch',
    label: 'Align items',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'End', value: 'flex-end' },
        { name: 'Stretch', value: 'stretch' },
        { name: 'Baseline', value: 'baseline' },
      ],
      condition: showIf('type', 'EQ', 'container'),
    },
  }),
  alignContent: option('CUSTOM', {
    value: 'stretch',
    label: 'Align content',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Stretch', value: 'stretch' },
        { name: 'Center', value: 'center' },
        { name: 'Start', value: 'flex-start' },
        { name: 'End', value: 'flex-end' },
        { name: 'Space around', value: 'space-around' },
        { name: 'Space between', value: 'space-between' },
      ],
      condition: showIf('type', 'EQ', 'container'),
    },
  }),
  justify: option('CUSTOM', {
    value: 'flex-start',
    label: 'Justify',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'End', value: 'flex-end' },
        { name: 'Space between', value: 'space-between' },
        { name: 'Space around', value: 'space-around' },
        { name: 'Space evenly', value: 'space-evenly' },
      ],
      condition: showIf('type', 'EQ', 'container'),
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  spacing: option('CUSTOM', {
    value: '0',
    label: 'Spacing',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '0', value: '0' },
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
      ],
    },
  }),
  wrap: option('CUSTOM', {
    value: 'wrap',
    label: 'Wrap',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'No wrap', value: 'nowrap' },
        { name: 'Wrap', value: 'wrap' },
        { name: 'Wrap reverse', value: 'wrap-reverse' },
      ],
    },
  }),
  zeroMinWidth: toggle('Zero min width', {
    value: false,
  }),

  ...responsive,
  showError: option('CUSTOM', {
    value: 'built-in',
    label: 'Error message',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Built in', value: 'built-in' },
        { name: 'Interaction', value: 'interaction' },
      ],
    },
  }),
  ...advanced('Grid'),
};
