import {
  hideIf,
  property,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from './advanced';

export const fileUploadOptions = {
  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['FILE'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),
  label: variable('Label', {
    value: ['Select file(s)...'],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: property('Value'),
  disabled: toggle('Disabled', { value: false }),
  helperText: variable('Helper text', { value: [] }),

  ...validation,
  ...styles,
  ...advanced,
};
