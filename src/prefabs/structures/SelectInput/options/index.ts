import {
  buttongroup,
  filter,
  hideIf,
  option,
  property,
  showIf,
  variable,
  model,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: {
      condition: hideIf('actionProperty', 'EQ', ''),
    },
  }),

  label: variable('Label', { value: ['Select'] }),
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
  model: model('Model', {
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
    configuration: { condition: hideIf('optionType', 'EQ', 'property') },
  }),

  labelProperty: property('Label for options', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),

  order: buttongroup(
    'Sort order',
    [
      ['Ascending', 'asc'],
      ['Descending', 'desc'],
    ],
    { value: 'asc', configuration: { condition: hideIf('orderBy', 'EQ', '') } },
  ),

  ...validation,
  ...styles,
  ...advanced,
};
