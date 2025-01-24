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
import { styles as defaultStyles } from '../../PriceInput/options/styles';
import { validation } from './validation';

const styles = { ...defaultStyles };

export const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),

  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds: ['INTEGER', 'PRICE', 'PRICE_EXPRESSION'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),

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
