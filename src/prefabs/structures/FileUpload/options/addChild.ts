import {
  optionTemplateOptions,
  property,
  setActionJSInputVariableOption,
  setPropertyOption,
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
      setPropertyOption({ target: 'value' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
      setActionJSInputVariableOption({ target: 'actionVariableId' }),
    ],
  },
};
