import {
  buttongroup,
  option,
  optionTemplateOptions,
  property,
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
  });
};
