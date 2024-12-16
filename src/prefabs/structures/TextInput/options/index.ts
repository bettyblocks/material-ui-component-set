import {
  buttongroup,
  CreateActionInputVariableKind,
  option,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

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
      createActionInputVariable: {
        type: CreateActionInputVariableKind.TEXT,
      },
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
