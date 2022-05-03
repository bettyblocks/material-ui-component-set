import {
  option,
  variable,
  toggle,
  buttongroup,
} from '@betty-blocks/component-sdk';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from './advanced';

export const options = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  ...validation,

  showError: toggle('Error'),
  errorType: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'interaction'],
    ],
    { value: 'built-in' },
  ),
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder', { value: [] }),
  helperText: variable('Helper text', { value: [] }),
  ...styles,
  ...advanced,
};
