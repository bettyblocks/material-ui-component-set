import {
  showIf,
  model,
  number,
  filter,
  endpoint,
  option,
  variable,
  authenticationProfile,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const categories = [
  {
    label: 'Messages',
    expanded: false,
    members: ['showError', 'loadingType', 'loadingText'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute', 'fetchPolicy', 'waitForRequest'],
  },
];

export const dataContainerOptions = {
  authProfile: authenticationProfile('Authentication Profile', {
    value: '',
    configuration: {
      condition: showIf('model', 'EQ', ''),
    },
  }),
  model: model('Model', {
    value: '',
    configuration: {
      condition: showIf('authProfile', 'EQ', ''),
    },
  }),
  currentRecord: number('Current Record', {
    value: '',
    configuration: {
      condition: showIf('currentRecord', 'EQ', 'never'),
    },
  }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: showIf('authProfile', 'EQ', ''),
    },
  }),
  redirectWithoutResult: endpoint('Redirect when no result', { value: '' }),
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
  loadingType: option('CUSTOM', {
    value: 'default',
    label: 'Show on load',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Message', value: 'default' },
        { name: 'Content', value: 'showChildren' },
      ],
    },
  }),
  loadingText: variable('Loading text', {
    value: ['Loading...'],
    configuration: {
      condition: showIf('loadingType', 'EQ', 'default'),
    },
  }),
  waitForRequest: toggle('Only render children when data is present', {
    value: false,
  }),

  ...advanced,
};
