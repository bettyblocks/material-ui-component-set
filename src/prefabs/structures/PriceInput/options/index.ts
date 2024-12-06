import {
  buttongroup,
  CreateActionInputVariableKind,
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
  propertyBased: buttongroup(
    'Type',
    [
      ['Property-based', 'true'],
      ['Non-property-based', 'false'],
    ],
    {
      value: 'true',
      configuration: {
        showOnDrop: true,
      },
    },
  ),

  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('propertyBased', 'EQ', 'false'),
      showOnDrop: true,
      createActionInputVariable: {
        type: CreateActionInputVariableKind.NUMBER,
      },
    },
  }),

  property: property('Property', {
    value: '',
    configuration: {
      allowedKinds: ['INTEGER', 'PRICE', 'PRICE_EXPRESSION'],
      disabled: true,
      condition: showIf('propertyBased', 'EQ', 'true'),
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
