import {
  buttongroup,
  hideIf,
  option,
  OptionProducer,
  property,
  showIf,
  text,
  toggle,
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
      showInReconfigure: true,
      configuration: {
        allowedKinds,
        disabledNames: ['updated_at', 'created_at'],
        disabled: true,
        allowFormatting: false,
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

    type: text('Type', {
      value: 'datetime',
      configuration: {
        condition: showIf('type', 'EQ', false),
      },
    }),

    autoComplete: toggle('Autocomplete', { value: true }),
    disabled: toggle('Disabled', { value: false }),
    placeholder: variable('Placeholder', { value: [] }),
    helperText: variable('Helper text', { value: [] }),

    timeFormat: text('Format', {
      value: 'MM/dd/yyyy HH:mm:ss',
      configuration: {
        placeholder: 'dd/MM/yyyy HH:mm:ss',
        condition: showIf('type', 'EQ', 'time'),
      },
    }),
    dateFormat: text('Format', {
      value: 'dd-MM-yyyy',
      configuration: {
        condition: showIf('type', 'EQ', 'date'),
      },
    }),
    datetimeFormat: text('Format', {
      value: 'MM/dd/yyyy HH:mm:ss',
      configuration: {
        placeholder: 'dd/MM/yyyy HH:mm:ss',
        condition: showIf('type', 'EQ', 'datetime'),
      },
    }),

    locale: buttongroup(
      'Locale',
      [
        ['English', 'en'],
        ['Dutch', 'nl'],
      ],
      { value: 'en' },
    ),

    use24HourClockTime: toggle('Use 24-hour format', { value: true }),
    disablePastDates: toggle('Disable past dates', { value: false }),
    closeOnSelect: toggle('Close picker after select', { value: true }),

    ...validation,
    ...styles,
    ...advanced,
  };
};

export const options = optionsResolver('date');
