import {
  option,
  variable,
  buttongroup,
  property,
  hideIf,
  showIf,
  toggle,
  model,
} from '@betty-blocks/component-sdk';

import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
<<<<<<< Updated upstream
  model: model('Related Model', {
    value: '',
    // configuration: { condition: showIf('model', 'EQ', 'never') },
  }),
=======
>>>>>>> Stashed changes
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: [] }),
<<<<<<< Updated upstream
=======
  value: variable('Value', { value: [] }),
>>>>>>> Stashed changes
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
  filter: option('FILTER', {
    label: 'Filter for options',
    value: {},
    configuration: {
      dependsOn: 'actionProperty',
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  orderBy: property('Order by for options', {
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
  renderCheckboxes: toggle('Add checkboxes', { value: false }),
  ...validation,
  ...styles,
  ...advanced,
};
