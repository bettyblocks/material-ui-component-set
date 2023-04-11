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
  }),
  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds: ['BOOLEAN'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
    },
  }),

  label: variable('Label', { value: ['Checkbox'] }),
  value: variable('Value', { value: [] }),
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
