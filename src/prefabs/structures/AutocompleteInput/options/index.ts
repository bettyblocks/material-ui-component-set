import {
  option,
  variable,
  buttongroup,
  property,
  hideIf,
  toggle,
  showIf,
} from '@betty-blocks/component-sdk';

import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  labelProperty: property('Label for options', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),
  label: variable('Label', { value: [] }),
  value: variable('Value', { value: [] }),
  optionType: buttongroup('Option type', [['Model', 'model']], {
    value: 'model',
    configuration: {
      condition: showIf('optionType', 'EQ', 'never'),
    },
  }),
  filter: option('FILTER', {
    label: 'Filter',
    value: {},
    configuration: {
      dependsOn: 'actionProperty',
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  orderBy: property('Order by', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),
  order: buttongroup(
    'Sort order',
    [
      ['Ascending', 'asc'],
      ['Descending', 'desc'],
    ],
    {
      configuration: {
        condition: hideIf('orderBy', 'EQ', ''),
      },
    },
  ),
  showError: toggle('Error', { value: false }),
  errorType: buttongroup('Error message', [
    ['Built in', 'built-in'],
    ['Interaction', 'interaction'],
  ]),
  ...validation,
  ...styles,
  ...advanced,
};
