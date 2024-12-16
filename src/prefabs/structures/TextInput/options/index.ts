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
      showInAddChild: true,
      configuration: {
        showOnDrop: true,
      },
    },
  ),

  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    showInAddChild: true,
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
    showInAddChild: true,
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
    showInAddChild: true,
  }),
  value: variable('Value', { value: [''], showInAddChild: true }),

  ...validation,
  ...styles,
  ...advanced,
};
