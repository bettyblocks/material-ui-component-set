import {
  buttongroup,
  CreateActionInputVariableKind,
  filter,
  hideIf,
  modelAndRelation,
  option,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';

export const options = {
  propertyBased: buttongroup(
    'Type',
    [
      ['Property-based', 'true'],
      ['Non-property-based', 'false'],
    ],
    {
      value: 'true',
      configuration: {
        showOnDrop: true,
      },
    },
  ),

  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('propertyBased', 'EQ', 'false'),
      createActionInputVariable: {
        type: CreateActionInputVariableKind.NUMBER,
      },
      showOnDrop: true,
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['LIST', 'BELONGS_TO'],
      allowRelations: true,
      disabled: true,
      condition: showIf('propertyBased', 'EQ', 'true'),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: ['Select'],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
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

  placeholderLabel: variable('Placeholder', { value: [''] }),

  allowClear: toggle('Allow user to empty selection'),
  clearLabel: variable('Empty selection label', {
    value: ['Clear selection'],
    configuration: { condition: showIf('allowClear', 'EQ', true) },
  }),

  ...validation,
  ...styles,
  ...advanced,
};
