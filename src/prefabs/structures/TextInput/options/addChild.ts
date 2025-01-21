import {
  buttongroup,
  option,
  optionTemplateOptions,
  property,
  setVariableOption,
  showIf,
} from '@betty-blocks/component-sdk';
import { getKindsByType, InputType } from '../../../helpers/getKindsByType';

export const addChildOptions = (type: InputType) => {
  const { actionInputVariableKind, allowedKinds } = getKindsByType(type);

  return optionTemplateOptions({
    propertyBased: buttongroup(
      'Type',
      [
        ['Property-based', 'true'],
        ['Non-property-based', 'false'],
      ],
      { value: 'true' },
    ),

    property: property('Property', {
      value: '',
      configuration: {
        allowedKinds,
        condition: showIf('propertyBased', 'EQ', 'true'),
        createActionInputVariable: {
          type: actionInputVariableKind,
        },
      },
    }),

    actionVariableId: option('ACTION_JS_VARIABLE', {
      label: 'Action input variable',
      value: '',
      configuration: {
        condition: showIf('propertyBased', 'EQ', 'false'),
        createActionInputVariable: {
          type: actionInputVariableKind,
        },
      },
    }),
  });
};

export const optionEvents = {
  onChange: {
    property: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
    ],
    actionVariableId: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
    ],
  },
};
