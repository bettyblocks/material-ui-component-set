import {
  hideIf,
  option,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from './advanced';
import {
  getAllowedKindsByType,
  InputType,
} from '../../../helpers/getAllowedKindsByType';

export const fileUploadOptionsResolver = (type: InputType) => {
  const { allowedKinds, allowedInputKinds } = getAllowedKindsByType(type);

  return {
    property: property('Property', {
      value: '',
      showInReconfigure: true,
      configuration: {
        allowedKinds,
        disabled: true,
        condition: hideIf('property', 'EQ', ''),
      },
    }),
    label: variable('Label', {
      value: ['Select file(s)...'],
      configuration: { allowFormatting: false, allowPropertyName: true },
    }),
    value: property('Value', { configuration: { allowFormatting: false } }),
    disabled: toggle('Disabled', { value: false }),
    helperText: variable('Helper text', { value: [] }),

    ...validation,
    ...styles,
    ...advanced,
    actionVariableId: option('ACTION_JS_VARIABLE', {
      label: 'Name',
      value: '',
      configuration: {
        ...(allowedInputKinds
          ? { allowedKinds: allowedInputKinds }
          : undefined),
        condition: showIf('property', 'EQ', ''),
      },
    }),
  };
};

export const fileUploadOptions = fileUploadOptionsResolver('file');
