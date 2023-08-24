import {
  buttongroup,
  hideIf,
  modelAndRelation,
  option,
  property,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';
import { validation } from './validation';

export const checkboxGroupInputOptions = {
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
      allowedKinds: ['BOOLEAN'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),
  label: variable('Label', { value: ['CheckboxGroup'] }),
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
  orderBy: property('Order by for options', {
    value: '',
    configuration: {
      dependsOn: 'model',
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
  labelProperty: property('Label for options', {
    value: '',
    configuration: {
      condition: hideIf('optionType', 'EQ', 'property'),
    },
  }),
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  position: buttongroup(
    'Label Position',
    [
      ['Start', 'start'],
      ['End', 'end'],
      ['Top', 'top'],
      ['Bottom', 'bottom'],
    ],
    { value: 'end' },
  ),
  row: toggle('Row', { value: true }),
  fullWidth: toggle('Full Width', { value: true }),
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  ...validation,
  ...styles,
  ...advanced('CheckboxGroup'),
};
