import {
  option,
  variable,
  toggle,
  buttongroup,
  text,
  showIf,
} from '@betty-blocks/component-sdk';

import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),
  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),
  ...validation,
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
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
  ...styles,
  ...advanced,
};
