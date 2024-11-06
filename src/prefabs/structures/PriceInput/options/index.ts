import {
  hideIf,
  option,
  property,
  showIf,
  text,
  variable,
} from '@betty-blocks/component-sdk';
import { PartialBy } from '../../../../utils';
import { advanced } from '../../TextInput/options/advanced';
import { styles as defaultStyles } from '../../TextInput/options/styles';
import { validation } from '../../TextInput/options/validation';

const styles = { ...defaultStyles };

// TODO: make a typed function to omit keys from an object
delete (<PartialBy<typeof styles, 'adornmentIcon'>>styles).adornmentIcon;

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

  ...validation,

  adornment: text('Currency', {
    value: '€',
  }),

  ...styles,
  ...advanced,
};
