import {
  option,
  text,
  variable,
  toggle,
  property,
} from '@betty-blocks/component-sdk';
import { advanced } from '../TextInput/options/advanced';
import { styles } from '../TextInput/options/styles';
import { validation } from '../TextInput/options/validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),

  property: property('Property', {
    value: '',
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
