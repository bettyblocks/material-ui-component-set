import {
  hideIf,
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
    property: property('Property', {
      value: '',
      configuration: {
        allowedKinds: ['FILE'],
        disabled: true,
        condition: hideIf('property', 'EQ', ''),
      },
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
