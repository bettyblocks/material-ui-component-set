import {
  buttongroup,
  option,
  optionTemplateOptions,
  property,
  setActionJSInputVariableOption,
  setModelOption,
  setOptionToDefaultValue,
  setVariableOption,
  setButtonGroupOption,
  showIf,
} from '@betty-blocks/component-sdk';
import {
  getAllowedKindsByType,
  InputType,
} from '../../../helpers/getAllowedKindsByType';

export const addChildOptions = (type: InputType) => {
  const { allowedKinds, actionInputVariableKind, allowedInputKinds } =
    getAllowedKindsByType(type);

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
        allowFormatting: false,
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
      setOptionToDefaultValue({ target: 'model' }),
    ],
    property: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
      setVariableOption({ target: 'label', format: 'propertyLabel' }),
      setActionJSInputVariableOption({ target: 'actionVariableId' }),
      setModelOption({ target: 'model' }),
      setButtonGroupOption({
        target: 'optionType',
        conditions: [
          { condition: 'property_is_relation', result: 'model' },
          { condition: 'property_is_property', result: 'property' },
          { condition: 'value_is_empty', result: 'variable' },
        ],
      }),
    ],
    actionVariableId: [
      setVariableOption({ target: 'label', format: 'static' }),
    ],
  },
};
