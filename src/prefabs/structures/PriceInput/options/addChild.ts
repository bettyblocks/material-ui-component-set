import {
  buttongroup,
  CreateActionInputVariableKind,
  option,
  optionTemplateOptions,
  property,
  showIf,
} from '@betty-blocks/component-sdk';

export const addChildOptions = optionTemplateOptions({
  propertyBased: buttongroup(
    'Type',
    [
      ['Property-based', 'true'],
      ['Non-property-based', 'false'],
    ],
    { value: 'true' },
  ),
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('propertyBased', 'EQ', 'false'),
      createActionInputVariable: {
        type: CreateActionInputVariableKind.NUMBER,
      },
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['INTEGER', 'PRICE', 'PRICE_EXPRESSION'],
      condition: showIf('propertyBased', 'EQ', 'true'),
      createActionInputVariable: {
        type: CreateActionInputVariableKind.NUMBER,
      },
    },
  }),
});
