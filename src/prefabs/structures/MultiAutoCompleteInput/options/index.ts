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
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['HAS_AND_BELONGS_TO_MANY', 'HAS_MANY'],
      allowRelations: true,
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),
  label: variable('Label', {
    value: [],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
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
      allowedKinds: [
        'BELONGS_TO',
        'DECIMAL',
        'DECIMAL_EXPRESSION',
        'EMAIL',
        'EMAIL_ADDRESS',
        'IBAN',
        'INTEGER',
        'INTEGER_EXPRESSION',
        'MINUTES',
        'MINUTES_EXPRESSION',
        'PHONE_NUMBER',
        'PRICE',
        'PRICE_EXPRESSION',
        'SERIAL',
        'STRING',
        'STRING_EXPRESSION',
        'TEXT',
        'TEXT_EXPRESSION',
        'URL',
        'ZIPCODE',
      ],
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
