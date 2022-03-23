import { option, variable } from '@betty-blocks/component-sdk';
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
  ...styles,
  ...advanced,
};
