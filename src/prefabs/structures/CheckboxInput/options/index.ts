import {
  hideIf,
  option,
  property,
  showIf,
  text,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';
import { validation } from './validation';

export const checkboxInputOptions = {
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
      allowedKinds: ['BOOLEAN'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: ['Checkbox'],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', { value: ['false'] }),
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: 'checkbox',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
  position: option('CUSTOM', {
    value: 'end',
    label: 'Label position',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'start' },
        { name: 'End', value: 'end' },
        { name: 'Top', value: 'top' },
        { name: 'Bottom', value: 'bottom' },
      ],
    },
  }),

  ...validation,
  ...styles,
  ...advanced('CheckboxInput'),
};
