import {
  optionTemplateOptions,
  property,
  setVariableOption,
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

export const optionEvents = {
  onChange: {
    property: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
    ],
  },
};
