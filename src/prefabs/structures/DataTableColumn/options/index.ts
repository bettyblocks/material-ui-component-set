import {
  toggle,
  property,
  variable,
  font,
  option,
  size,
  color,
  ThemeColor,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  visible: toggle('Initial visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  property: property('Property', { value: '' }),
  sortable: toggle('Sortable', { value: false }),
  headerText: variable('Header text', { value: [''] }),
  type: font('Header type', { value: 'Body1' }),
  content: variable('Content', {
    value: [''],
    configuration: {
      as: 'MULTILINE',
    },
  }),
  bodyType: font('Body type', { value: 'Body1' }),
  horizontalAlignment: option('CUSTOM', {
    label: 'Column Alignment',
    value: 'left',
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
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  background: color('Background', { value: ThemeColor.TRANSPARENT }),
  borderColor: color('Border color', { value: ThemeColor.LIGHT }),

  ...advanced,
};
