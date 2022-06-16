import {
  buttongroup,
  filter,
  hideIf,
  option,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';

export const options = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  labelProperty: property('Label for options', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),

  optionType: buttongroup('Option type', [['Model', 'model']], {
    value: 'model',
    configuration: {
      condition: showIf('optionType', 'EQ', 'never'),
    },
  }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'actionProperty',
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),

  orderBy: property('Order by', {
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'model'),
    },
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
