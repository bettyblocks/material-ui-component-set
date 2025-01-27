import {
  prefab,
  component,
  variable,
  Icon,
  optionTemplateOptions,
  option,
  setVariableOption,
  showIf,
  property,
  hideIf,
  buttongroup,
} from '@betty-blocks/component-sdk';
import { getAllowedKindsByType } from './helpers/getAllowedKindsByType';

const attributes = {
  category: 'FORM',
  icon: Icon.HiddenInputIcon,
  keywords: ['Form', 'input', 'hidden'],
};

const { allowedKinds, actionInputVariableKind } =
  getAllowedKindsByType('hidden');

const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds,
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
    },
  }),

  value: variable('Value'),
};

const addChildOptions = optionTemplateOptions({
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
      allowedKinds,
      condition: showIf('propertyBased', 'EQ', 'false'),
      createActionInputVariable: {
        type: actionInputVariableKind,
      },
    },
  }),
});

const optionEvents = {
  onChange: {
    property: [setVariableOption({ target: 'value', format: 'propertyValue' })],
    actionVariableId: [
      setVariableOption({ target: 'value', format: 'propertyValue' }),
    ],
  },
};

const hooks = {};

export default prefab('Hidden', attributes, undefined, [
  component(
    'Hidden Input',
    {
      options,
      ...hooks,
      optionTemplates: {
        addChild: {
          options: addChildOptions,
          optionEvents,
        },
      },
    },
    [],
  ),
]);
