import { option, property, variable } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),

  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
    },
  }),
  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  ...validation,
  ...styles,
  ...advanced,
};
