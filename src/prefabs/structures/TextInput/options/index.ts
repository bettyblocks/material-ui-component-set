import {
  hideIf,
  option,
  OptionProducer,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';
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
        ...(allowedInputKinds
          ? { allowedKinds: allowedInputKinds }
          : undefined),
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

    label: variable('Label', {
      value: [''],
      configuration: { allowFormatting: false, allowPropertyName: true },
    }),
    value: variable('Value', {
      value: [''],
      configuration: { allowFormatting: false },
    }),

    ...validation,
    ...styles,
    ...advanced,
  };
};

export const options = optionsResolver('text');
