import {
  option,
  variable,
  buttongroup,
  property,
  hideIf,
  showIf,
  model,
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
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: [] }),
  value: variable('Value', { value: [] }),
  optionType: buttongroup(
    'Option type',
    [
      ['Model', 'model'],
      ['Property', 'property'],
    ],
    {
      value: 'model',
    },
  ),
  model: model('Model', {
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),
  filter: option('FILTER', {
    label: 'Filter for options',
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  orderBy: property('Order by for options', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
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
    {
      configuration: {
        condition: hideIf('orderBy', 'EQ', ''),
      },
    },
  ),
  ...validation,
  ...styles,
  ...advanced,
};
