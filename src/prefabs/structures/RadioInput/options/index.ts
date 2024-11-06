import {
  buttongroup,
  filter,
  hideIf,
  modelAndRelation,
  option,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['LIST', 'BELONGS_TO'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', { value: ['Radio'] }),
  value: variable('Value', { value: [''] }),

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
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),

  orderBy: property('Order by', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),

  labelProperty: property('Label for options', {
    value: '',
    configuration: { condition: hideIf('optionType', 'EQ', 'property') },
  }),

  order: buttongroup(
    'Sort order',
    [
      ['Ascending', 'asc'],
      ['Descending', 'desc'],
    ],
    { value: 'asc', configuration: { condition: hideIf('orderBy', 'EQ', '') } },
  ),

  showError: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'interaction'],
    ],
    {
      value: 'built-in',
      configuration: { condition: showIf('optionType', 'EQ', 'model') },
    },
  ),
  ...validation,
  ...styles,
  ...advanced,
};
