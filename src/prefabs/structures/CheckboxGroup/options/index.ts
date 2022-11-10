import {
  option,
  toggle,
  text,
  variable,
  showIf,
  hideIf,
  buttongroup,
  model,
  property,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';
import { validation } from './validation';

export const checkboxGroupInputOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),
  label: variable('Label', { value: ['CheckboxGroup'] }),
  value: variable('Value', { value: [] }),
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
    configuration: { condition: hideIf('optionType', 'EQ', 'property') },
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
