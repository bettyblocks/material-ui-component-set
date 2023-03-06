import {
  buttongroup,
  displayLogic,
  option,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const conditionalOptions = {
  type: buttongroup(
    'Logic type',
    [
      ['Single rule', 'singleRule'],
      ['Multi rule', 'multiRule'],
    ],
    {
      value: 'singleRule',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  visible: toggle('Initial visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),
  left: variable('Left', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'singleRule'),
    },
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
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),
  right: variable('Right', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),
  displayLogic: displayLogic('Display logic', {
    value: {},
    configuration: {
      condition: showIf('type', 'EQ', 'multiRule'),
    },
  }),

  ...advanced('Conditional'),
};
