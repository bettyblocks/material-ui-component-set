import {
  buttongroup,
  hideIf,
  option,
  optionTemplateOptions,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: [''],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', { value: [''] }),

  ...validation,
  ...styles,
  ...advanced,
};

export const optionTemplates = {
  addChild: {
    options: optionTemplateOptions({
      propertyBased: buttongroup(
        'Type',
        [
          ['Property-based', 'true'],
          ['Non-property-based', 'false'],
        ],
        {
          value: 'true',
          showInAddChild: true,
          configuration: {
            showOnDrop: true,
          },
        },
      ),
      actionVariableId: option('ACTION_JS_VARIABLE', {
        label: 'Action input variable',
        value: '',
        showInAddChild: true,
        configuration: {
          condition: showIf('propertyBased', 'EQ', 'false'),
          showOnDrop: true,
        },
      }),

      property: property('Property', {
        value: '',
        showInReconfigure: true,
        showInAddChild: true,
        configuration: {
          allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
          disabled: true,
          condition: showIf('propertyBased', 'EQ', 'true'),
          showOnDrop: true,
        },
      }),
    }),
    optionActions: {
      // propertyBased: {
      //     onchange: [
      //       // optionAction('clearPropertyOption', 'propterty', { condition: runIf('propertyBased', 'EQ', 'false') })
      //       {
      //         action: 'clearPropertyOption',
      //         target: 'propterty',
      //         // condition: ['propertyBased', 'EQ', 'false'],
      //         condition: { key: 'propertyBased', comparator: 'EQ', value: 'false'}
      //       },
      //       {
      //         action: 'clearActionVariableOption',
      //         target: 'actionVariableId',
      //         // condition: ['propertyBased', 'EQ', 'true'],
      //         condition: { key: 'propertyBased', comparator: 'EQ', value: 'true'}
      //       },
      //     ],
      //   },
      actionVariableId: {
        onChange: [
          {
            action: 'setVariableOptionWithInputVariableName',
            target: 'label',
          },
        ],
        onCreate: [
          {
            action: 'createAndSetActionInputVariableOption',
            target: 'actionVariableId',
          },
        ],
      },
      property: {
        onChange: [
          // optionAction('setVariableOptionWithPropertyLabel', 'label') // make a sdk helper?
          {
            action: 'setVariableOptionWithPropertyLabel',
            target: 'label',
          },
          {
            action: 'setVariableOptionWithPropertyValue',
            target: 'value',
          },
        ],
        onCreate: [
          {
            action: 'createAndSetPropertyOption',
            target: 'property',
          },
        ],
      },
    },
  },
};
