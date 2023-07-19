import {
  model,
  option,
  filter,
  number,
  showIf,
  reconfigure,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { children } from './children';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['showDataOnLoad'],
  },
];

export const options = {
  recordVariable: option('ACTION_JS_VARIABLE', {
    label: 'Record variable',
    value: '',
    configuration: { condition: showIf('recordVariable', 'EQ', 'never') },
  }),
  reconfigure: reconfigure('Reconfigure', {
    value: {
      children,
      reconfigureWizardType: 'ChildrenSelector',
    },
  }),
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  model: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'model' } }),
  currentRecord: number('Current Record', {
    value: '',
    configuration: { condition: showIf('currentRecord', 'EQ', 'never') },
  }),

  ...advanced,
};
