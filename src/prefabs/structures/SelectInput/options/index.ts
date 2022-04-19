import {
  buttongroup,
  hideIf,
  filter,
  model,
  option,
  showIf,
  text,
  toggle,
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
  required: toggle('Required'),
  blanco: variable('Blank option', { value: [''] }),
  optionType: buttongroup(
    'Option type',
    [
      ['Static', 'static'],
      ['Model', 'model'],
      ['Property', 'property'],
    ],
    { value: 'static' },
  ),

  selectOptions: text('Options', {
    value: 'a\nb\nc',
    configuration: {
      as: 'MULTILINE',
      condition: showIf('optionType', 'EQ', 'static'),
    },
  }),
  model: model('Model', {
    configuration: {
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  filter: filter('Filter', {
    configuration: {
      dependsOn: 'model',
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  orderBy: option('PROPERTY', {
    label: 'OrderBy',
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
    {
      value: '',
      configuration: {
        condition: hideIf('orderBy', 'EQ', ''),
      },
    },
  ),

  labelProperty: option('PROPERTY', {
    label: 'Property',
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  valueProperty: option('PROPERTY', {
    label: 'Value Property',
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'model'),
    },
  }),
  property: option('PROPERTY', {
    label: 'Property',
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'property'),
    },
  }),
  ...validation,
  ...styles,
  ...advanced,
};
