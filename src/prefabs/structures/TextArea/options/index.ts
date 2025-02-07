import {
  hideIf,
  option,
  OptionProducer,
  property,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../TextInput/options/advanced';
import { styles } from '../../TextInput/options/styles';
import { validation } from '../../TextInput/options/validation';
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
        disabled: true,
        condition: hideIf('property', 'EQ', ''),
      },
    }),

    label: variable('Label', { value: [''] }),
    value: variable('Value', { value: [''] }),

    ...validation,

    multiline: toggle('Multiline', { value: true }),
    rows: text('Rows', {
      value: '4',
    }),

    ...styles,
    ...advanced,
  };
};

export const options = optionsResolver('text');
