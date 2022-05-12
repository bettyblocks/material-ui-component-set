import {
  option,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),

  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

  required: toggle('Required'),

  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('required'),
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

  use24HourClockTime: toggle('Use 24-hour format', { value: true }),

  disablePastDates: toggle('Disable past dates', { value: false }),

  closeOnSelect: toggle('Close picker after select', { value: true }),

  ...styles,
  ...advanced,
};
