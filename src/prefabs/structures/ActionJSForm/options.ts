import {
  model,
  option,
  filter,
  number,
  showIf,
  reconfigure,
  addChild,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { children, inputTypes } from './children';

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
  addChild: addChild('Add form input', {
    value: {
      children: inputTypes,
      addChildWizardType: 'ChildSelector',
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
