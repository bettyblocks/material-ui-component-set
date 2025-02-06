import {
  buttongroup,
  hideIf,
  number,
  option,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../TextInput/options/advanced';
import { styles as defaultStyles } from './styles';
import { validation } from '../../DecimalInput/options/validation';
import { getAllowedKindsByType } from '../../../helpers/getAllowedKindsByType';

const styles = { ...defaultStyles };

const { allowedKinds, allowedInputKinds } = getAllowedKindsByType('price');

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      ...(allowedInputKinds ? { allowedKinds: allowedInputKinds } : undefined),
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
    configuration: { allowFormatting: false },
  }),
  value: variable('Value', {
    value: [''],
    configuration: { allowFormatting: false },
  }),

  separator: buttongroup(
    'Decimal separator',
    [
      ['Comma (1.234,56)', ','],
      ['Point (1,234.56)', '.'],
    ],
    {
      value: ',',
    },
  ),

  decimalScale: number('Scale', {
    value: '2',
  }),

  adornment: variable('Currency', {
    value: ['€'],
    configuration: {
      allowedKinds: ['STRING'],
    },
  }),

  adornmentPosition: buttongroup(
    'Currency position',
    [
      ['Start', 'start'],
      ['End', 'end'],
    ],
    {
      value: 'end',
      configuration: {
        condition: {
          type: 'HIDE',
          option: 'adornmentIcon',
          comparator: 'EQ',
          value: '',
        },
      },
    },
  ),

  showGroupSeparator: toggle('Show group (thousands) separator', {
    value: true,
  }),

  ...validation,
  ...styles,
  ...advanced,
};
