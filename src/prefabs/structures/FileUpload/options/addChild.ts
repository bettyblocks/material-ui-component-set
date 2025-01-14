import {
  optionActionSetVariable,
  optionTemplateOptions,
  property,
} from '@betty-blocks/component-sdk';
import { getKindsByType, InputType } from '../../../helpers/getKindsByType';

export const addChildOptions = (type: InputType) => {
  const { actionInputVariableKind, allowedKinds } = getKindsByType(type);

  return optionTemplateOptions({
    property: property('Property', {
      value: '',
      configuration: {
        allowedKinds,
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
};
