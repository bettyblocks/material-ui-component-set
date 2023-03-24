import {
  buttongroup,
  hideIf,
  option,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';
import { validation } from './validation';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),

  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

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
    value: 'MM/dd/yyyy',
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
