import {
  option,
  property,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from './advanced';

export const options = (supportImages?: boolean) => {
  const style = styles(supportImages);

  return {
    actionProperty: option('ACTION_JS_PROPERTY', {
      label: 'Property',
      value: '',
    }),
    label: variable('Label', { value: ['Select file(s)...'] }),
    value: property('Value'),
    disabled: toggle('Disabled', { value: false }),
    helperText: variable('Helper text', { value: [] }),

    ...validation,
    ...style,
    ...advanced,
  };
};
