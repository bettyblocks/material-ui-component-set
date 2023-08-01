import {
  filter,
  property,
  option,
  hideIf,
  number,
  size,
  showIf,
  sizes,
  variable,
  modelAndRelation,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Pagination',
    expanded: false,
    members: ['pagination', 'labelNumberOfPages', 'take', 'placeholderTake'],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['outerSpacing'],
  },
  {
    label: 'Messages',
    expanded: false,
    members: ['showError', 'loadingType', 'loadingText', 'noResultsText'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const dataListOptions = {
  model: modelAndRelation('Model', { value: '' }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
    },
  }),
  orderBy: property('Order by', {
    value: '',
    configuration: {
      dependsOn: 'model',
    },
  }),
  order: option('CUSTOM', {
    label: 'Sort order',
    value: 'asc',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      condition: hideIf('orderBy', 'EQ', ''),
      allowedInput: [
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
      ],
    },
  }),
  searchProperty: property('Search on property', {
    value: '',
    configuration: {
      dependsOn: 'model',
    },
  }),
  pagination: option('CUSTOM', {
    label: 'Pagination',
    value: 'never',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: 'Always', value: 'always' },
        { name: 'When needed', value: 'whenNeeded' },
        { name: 'Never', value: 'never' },
      ],
    },
  }),
  take: number('Rows per page (max 50)', {
    value: '5',
    configuration: {
      dependsOn: 'model',
    },
  }),
  placeholderTake: number('Placeholder rows', {
    value: '',
  }),
  labelNumberOfPages: variable(`Pagination label (x 'of' y)`, {
    value: ['of'],
    configuration: {
      condition: hideIf('pagination', 'EQ', 'never'),
    },
  }),
  type: option('CUSTOM', {
    label: 'Type',
    value: 'list',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'List',
          value: 'list',
        },
        {
          name: 'Grid',
          value: 'grid',
        },
        {
          name: 'Inline',
          value: 'inline',
        },
      ],
    },
  }),
  width: size('Min Width', {
    value: '200px',
    configuration: {
      as: 'UNIT',
      condition: showIf('type', 'EQ', 'grid'),
    },
  }),
  gap: size('Gap', {
    value: '1rem',
    configuration: {
      as: 'UNIT',
      condition: showIf('type', 'EQ', 'grid'),
    },
  }),
  outerSpacing: sizes('Outer space', { value: ['0rem', '0rem', 'M', '0rem'] }),
  showError: option('CUSTOM', {
    value: 'built-in',
    label: 'Error message',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: 'Built in', value: 'built-in' },
        { name: 'Interaction', value: 'interaction' },
      ],
    },
  }),
  loadingType: option('CUSTOM', {
    value: 'default',
    label: 'Show on load',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: 'Message', value: 'default' },
        { name: 'Content', value: 'showChildren' },
        { name: 'Skeleton', value: 'skeleton' },
      ],
    },
  }),
  loadingText: variable('Loading text', {
    value: ['Loading...'],
    configuration: {
      dependsOn: 'model',
      condition: {
        type: 'SHOW',
        option: 'loadingType',
        comparator: 'EQ',
        value: 'default',
      },
    },
  }),
  noResultsText: variable('No results text', {
    value: [''],
  }),

  ...advanced('DataList'),
};
