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
    // optionActions: {
    //   propertyBased: {
    //     onchange: [
    //       {
    //         action: 'clearPropertyOption',
    //         target: 'propterty',
    //         condition: ['propertyBased', 'EQ', 'false'],
    //       },
    //       {
    //         action: 'clearActionVariableOption',
    //         target: 'actionVariableId',
    //         condition: ['propertyBased', 'EQ', 'true'],
    //       },
    //     ],
    //   },
    //   actionVariableId: {
    //     onCreate: [
    //       {
    //         action: 'createAndSetActionInputVariable',
    //         target: 'actionVariableId',
    //       },
    //     ],
    //   },
    //   property: {
    //     onchange: [
    //       {
    //         action: 'setVariableOptionWithPropertyLabel',
    //         target: 'label',
    //       },
    //       {
    //         action: 'setVariableOptionWithPropertyValue',
    //         target: 'value',
    //       },
    //       {
    //         action: 'createAndSetActionInputVariable',
    //         target: 'actionVariableId',
    //       },
    //     ],
    //     onCreate: [
    //       {
    //         action: 'createAndSetPropertyValue',
    //         target: 'property',
    //       },
    //     ],
    //   },
    // },
  },
};
