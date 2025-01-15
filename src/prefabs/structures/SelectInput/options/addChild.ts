import {
  buttongroup,
  option,
  optionActionSetVariable,
  optionTemplateOptions,
  property,
  showIf,
} from '@betty-blocks/component-sdk';
import { getKindsByType, InputType } from '../../../helpers/getKindsByType';

export const addChildOptions = (type: InputType) => {
  const { allowedKinds, actionInputVariableKind } = getKindsByType(type);

  return optionTemplateOptions({
    propertyBased: buttongroup(
      'Type',
      [
        ['Property-based', 'true'],
        ['Non-property-based', 'false'],
      ],
      {
        value: 'true',
      },
    ),

    property: property('Property', {
      value: '',
      configuration: {
        allowedKinds,
        allowRelations: true,
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

export const optionActions = {
  property: {
    onChange: [
      optionActionSetVariable('value', 'propertyValue'),
      optionActionSetVariable('label', 'propertyLabel'),
    ],
  },
  actionVariableId: {
    onChange: [
      optionActionSetVariable('value', 'propertyValue'),
      optionActionSetVariable('label', 'propertyLabel'),
    ],
  },
};
