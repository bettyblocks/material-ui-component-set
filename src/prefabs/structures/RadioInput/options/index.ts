import { option, toggle, variable } from '@betty-blocks/component-sdk';
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
  ...validation,
  ...styles,
  ...advanced,
};
