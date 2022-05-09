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

  validationOptions: toggle('Validation options'),

  required: toggle('Required', showOn('validationOptions')),

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

  disablePastDates: toggle('Disable past dates', { value: false }),

  error: toggle('Error', { value: false }),

  autoComplete: toggle('Autocomplete', { value: true }),

  disabled: toggle('Disabled', { value: false }),

  placeholder: variable('Placeholder', { value: [] }),

  helperText: variable('Helper text', { value: [] }),

  timeFormat: text('Format', {
    value: 'MM/dd/yyyy HH:mm:ss',
    configuration: { placeholder: 'dd/MM/yyyy HH:mm:ss' },
  }),

  use24HourClockTime: toggle('Use 24-hour format', { value: true }),

  ...styles,
  ...advanced,
};
