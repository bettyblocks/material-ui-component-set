import {
  font,
  property,
  variable,
  option,
  sizes,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  property: property('Property', {
    value: '',
    configuration: { allowFormatting: true },
  }),
  labelText: variable('Label Text', {
    value: [],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  type: font('Type', { value: 'Body1' }),
  textAlignment: option('CUSTOM', {
    value: 'left',
    label: 'Text Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'right' },
      ],
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  sideBySide: toggle('Side by Side', {
    value: false,
  }),

  ...styles,

  ...advanced,
};
