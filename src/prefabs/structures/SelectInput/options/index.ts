import {
  buttongroup,
  filter,
  hideIf,
  modelAndRelation,
  option,
  OptionProducer,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { validation } from './validation';
import { styles } from './styles';
import {
  getAllowedKindsByType,
  InputType,
} from '../../../helpers/getAllowedKindsByType';

export const optionsResolver = (
  type: InputType,
): Record<string, OptionProducer> => {
  const { allowedKinds, allowedInputKinds } = getAllowedKindsByType(type);
  return {
    actionVariableId: option('ACTION_JS_VARIABLE', {
      label: 'Action input variable',
      value: '',
      configuration: {
        allowedKinds: allowedInputKinds,
        condition: showIf('property', 'EQ', ''),
      },
    }),

    property: property('Property', {
      value: '',
      configuration: {
        allowedKinds,
        allowRelations: true,
        disabled: true,
        condition: hideIf('property', 'EQ', ''),
      },
    }),

    label: variable('Label', {
      value: ['Select'],
      configuration: { allowFormatting: false, allowPropertyName: true },
    }),
    value: variable('Value', {
      value: [''],
      configuration: { allowFormatting: false },
    }),

    optionType: buttongroup(
      'Option type',
      [
        ['Model', 'model'],
        ['Property', 'property'],
        ['Variable', 'variable'],
      ],
      {
        value: 'variable',
        configuration: {
          condition: showIf('optionType', 'EQ', 'never'),
        },
      },
    ),
    model: modelAndRelation('Model', {
      value: '',
      configuration: {
        condition: showIf('optionType', 'EQ', 'variable'),
      },
    }),
    filter: filter('Filter', {
      value: {},
      configuration: {
        dependsOn: 'model',
        condition: hideIf('optionType', 'EQ', 'property'),
      },
    }),

    orderBy: property('Order by', {
      value: '',
      configuration: {
        dependsOn: 'model',
        condition: hideIf('optionType', 'EQ', 'property'),
      },
    }),

    labelProperty: property('Label for options', {
      value: '',
      configuration: { condition: hideIf('optionType', 'EQ', 'property') },
    }),

    order: buttongroup(
      'Sort order',
      [
        ['Ascending', 'asc'],
        ['Descending', 'desc'],
      ],
      {
        value: 'asc',
        configuration: { condition: hideIf('orderBy', 'EQ', '') },
      },
    ),

    placeholderLabel: variable('Placeholder', { value: [''] }),

    allowClear: toggle('Allow user to empty selection'),
    clearLabel: variable('Empty selection label', {
      value: ['Clear selection'],
      configuration: { condition: showIf('allowClear', 'EQ', true) },
    }),

    ...validation,
    ...styles,
    ...advanced,
  };
};

export const options = optionsResolver('select');
