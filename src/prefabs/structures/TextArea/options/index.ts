import {
  buttongroup,
  CreateActionInputVariableKind,
  option,
  property,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../TextInput/options/advanced';
import { styles } from '../../TextInput/options/styles';
import { validation } from '../../TextInput/options/validation';

export const options = {
  propertyBased: buttongroup(
    'Type',
    [
      ['Property-based', 'true'],
      ['Non-property-based', 'false'],
    ],
    {
      value: 'true',
      configuration: {
        showOnDrop: true,
      },
    },
  ),

  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('propertyBased', 'EQ', 'false'),
      createActionInputVariable: {
        type: CreateActionInputVariableKind.TEXT,
      },
      showOnDrop: true,
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
      disabled: true,
      condition: showIf('propertyBased', 'EQ', 'true'),
      showOnDrop: true,
    },
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
