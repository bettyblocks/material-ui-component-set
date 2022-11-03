import {
  option,
  toggle,
  text,
  variable,
  showIf,
  hideIf,
  buttongroup,
  model,
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
  optionType: buttongroup(
    'Label Position',
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
  row: toggle('Row', { value: true }),
  fullWidth: toggle('Full Width', { value: true }),
  model: model('Model', {
    value: '',
    configuration: {
      condition: showIf('optionType', 'EQ', 'variable'),
    },
  }),
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  ...validation,
  ...styles,
  ...advanced('CheckboxGroup'),
};
