import { option, toggle, variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const conditionalOptions = {
  visible: toggle('Initial visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  left: variable('Left', {
    value: [],
  }),
  compare: option('CUSTOM', {
    label: 'Compare',
    value: 'eq',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Equals',
          value: 'eq',
        },
        {
          name: 'Not equal',
          value: 'neq',
        },
        {
          name: 'Contains',
          value: 'contains',
        },
        {
          name: 'Does not contain',
          value: 'notcontains',
        },
        {
          name: 'Greater than',
          value: 'gt',
        },
        {
          name: 'Less than',
          value: 'lt',
        },
        {
          name: 'Greater than or equal to',
          value: 'gteq',
        },
        {
          name: 'Less than or equal to',
          value: 'lteq',
        },
      ],
    },
  }),
  right: variable('Right', {
    value: [],
  }),

  ...advanced('Conditional'),
};
