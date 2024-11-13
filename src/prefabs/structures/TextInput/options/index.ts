import {
  buttongroup,
  hideIf,
  option,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),

  propertyBased: buttongroup(
    'Type',
    [
      ['Property based', 'true'],
      ['Non property based', 'false'],
    ],
    {
      value: 'true',
      configuration: {
        showOnDrop: true,
        condition: showIf('propertyBased', 'EQ', ''),
      },
    },
  ),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: [''],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', { value: [''] }),

  ...validation,
  ...styles,
  ...advanced,
};
