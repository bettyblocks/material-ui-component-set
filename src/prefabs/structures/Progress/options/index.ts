import {
  option,
  toggle,
  showIf,
  color,
  ThemeColor,
  variable,
  text,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['color', 'thickness', 'size'],
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

export const progressOptions = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),

  type: option('CUSTOM', {
    value: 'linear',
    label: 'Type',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Circular', value: 'circular' },
        { name: 'Linear', value: 'linear' },
      ],
    },
  }),
  linearVariant: option('CUSTOM', {
    value: 'determinate',
    label: 'Variant',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Buffer', value: 'buffer' },
        { name: 'Determinate', value: 'determinate' },
        { name: 'Indeterminate', value: 'indeterminate' },
        { name: 'Query', value: 'query' },
      ],
      condition: showIf('type', 'EQ', 'linear'),
    },
  }),
  circularVariant: option('CUSTOM', {
    value: 'static',
    label: 'Variant',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Determinate', value: 'determinate' },
        { name: 'Indeterminate', value: 'indeterminate' },
        { name: 'Static', value: 'static' },
      ],
      condition: showIf('type', 'EQ', 'circular'),
    },
  }),
  color: color('Color', { value: ThemeColor.PRIMARY }),
  thickness: variable('Thickness', {
    value: ['3.6'],
    configuration: {
      condition: showIf('type', 'EQ', 'circular'),
    },
  }),
  size: variable('Size', {
    value: ['2.5rem'],
    configuration: {
      condition: showIf('type', 'EQ', 'circular'),
    },
  }),
  barHeight: text('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('type', 'EQ', 'linear'),
    },
  }),
  minValue: variable('Min value', {
    value: ['0'],
  }),
  maxValue: variable('Max value', {
    value: ['100'],
  }),
  value: variable('Value', {
    value: [],
  }),
  valueBuffer: variable('Value buffer', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'linear'),
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['M', '0rem', 'M', '0rem'],
  }),

  ...advanced('Progress'),
};
