import {
  buttongroup,
  option,
  property,
  showIf,
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

  labelProperty: property('Label for options', {
    value: '',
    configuration: { condition: showIf('optionType', 'EQ', 'model') },
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  optionType: buttongroup('Option type', [['Model', 'model']], {
    value: 'model',
    configuration: {
      condition: showIf('optionType', 'EQ', 'never'),
    },
  }),
  ...validation,
  ...styles,
  ...advanced,
};
