import {
  optionTemplateOptions,
  property,
  setVariableOption,
} from '@betty-blocks/component-sdk';
import {
  getAllowedKindsByType,
  InputType,
} from '../../../helpers/getAllowedKindsByType';

export const addChildOptions = (type: InputType) => {
  const { actionInputVariableKind, allowedInputKinds } =
    getAllowedKindsByType(type);

  return optionTemplateOptions({
    property: property('Property', {
      value: '',
      configuration: {
        ...(allowedInputKinds
          ? { allowedKinds: allowedInputKinds }
          : undefined),
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
