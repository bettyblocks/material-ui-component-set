import {
  option,
  toggle,
  text,
  variable,
  showIf,
  hideIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';
import { validation } from './validation';

export const checkboxInputOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),

  label: variable('Label', { value: ['Checkbox'] }),
  value: variable('Value', { value: [] }),
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  ...validation,
  ...styles,
  ...advanced('CheckboxInput'),
};
