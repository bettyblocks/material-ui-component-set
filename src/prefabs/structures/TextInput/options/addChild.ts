import {
  buttongroup,
  option,
  optionTemplateOptions,
  property,
  setActionJSInputVariableOption,
  setOptionToDefaultValue,
  setVariableOption,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import {
  getAllowedKindsByType,
  InputType,
} from '../../../helpers/getAllowedKindsByType';

export const addChildOptions = (type: InputType) => {
  const { actionInputVariableKind, allowedKinds, allowedInputKinds } =
    getAllowedKindsByType(type);

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
        disabledNames: ['updated_at', 'created_at'],
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
        ...(allowedInputKinds
          ? { allowedKinds: allowedInputKinds }
          : undefined),
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
    propertyBased: [
      setOptionToDefaultValue({ target: 'property' }),
      setOptionToDefaultValue({ target: 'actionVariableId' }),
      setOptionToDefaultValue({ target: 'value' }),
      setOptionToDefaultValue({ target: 'label' }),
    ],
    property: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
      setActionJSInputVariableOption({ target: 'actionVariableId' }),
    ],
    actionVariableId: [
      setVariableOption({ target: 'label', format: 'static' }),
    ],
  },
};
