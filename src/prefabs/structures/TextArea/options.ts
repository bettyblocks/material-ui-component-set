import {
  option,
  text,
  variable,
  toggle,
  hideIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../TextInput/options/advanced';
import { styles } from '../TextInput/options/styles';
import { validation } from '../TextInput/options/validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),

  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  ...validation,

  multiline: toggle('Multiline', { value: true }),
  rows: text('Rows', {
    value: '4',
  }),

  ...styles,
  ...advanced,
};
