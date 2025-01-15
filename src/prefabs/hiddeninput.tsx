import {
  prefab,
  component,
  option as optionFunction,
  variable,
  Icon,
  optionTemplateOptions,
  option,
  optionActionSetVariable,
  CreateActionInputVariableKind,
} from '@betty-blocks/component-sdk';

const attributes = {
  category: 'FORM',
  icon: Icon.HiddenInputIcon,
  keywords: ['Form', 'input', 'hidden'],
};

const options = {
  actionVariableId: optionFunction('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),
  value: variable('Value'),
};

const addChildOptions = optionTemplateOptions({
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable (number)',
    value: '',
    configuration: {
      createActionInputVariable: {
        type: CreateActionInputVariableKind.NUMBER,
      },
    },
  }),
});

const optionActions = {
  actionVariableId: {
    onChange: [optionActionSetVariable('value', 'propertyValue')],
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
          optionActions,
        },
      },
    },
    [],
  ),
]);
