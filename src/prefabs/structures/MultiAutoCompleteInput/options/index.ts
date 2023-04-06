import {
  buttongroup,
  hideIf,
  modelAndRelation,
  option,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds: ['HAS_AND_BELONGS_TO_MANY', 'HAS_MANY'],
      allowRelations: true,
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
    },
  }),
  label: variable('Label', { value: [] }),
  value: variable('Value', {
    value: [],
    configuration: {
      allowRelations: true,
    },
  }),
  optionType: buttongroup(
    'Option type',
    [
      ['Model', 'model'],
      ['Property', 'property'],
      ['Variable', 'variable'],
    ],
    {
      value: 'variable',
      configuration: {
        condition: showIf('optionType', 'EQ', 'never'),
      },
    },
  ),
  model: modelAndRelation('Model', {
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'variable'),
    },
  }),
  filter: option('FILTER', {
    label: 'Filter for options',
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),
  groupBy: property('Group by for options', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),
  orderBy: property('Order by for options', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),
  labelProperty: property('Label for options', {
    value: '',
    configuration: {
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),
  order: buttongroup(
    'Sort order',
    [
      ['Ascending', 'asc'],
      ['Descending', 'desc'],
    ],
    {
      value: 'asc',
      configuration: {
        condition: hideIf('orderBy', 'EQ', ''),
      },
    },
  ),
  renderCheckboxes: toggle('Add checkboxes', { value: false }),
  ...validation,
  ...styles,
  ...advanced,
};
