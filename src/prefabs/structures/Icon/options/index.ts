import {
  color,
  endpoint,
  icon,
  option,
  showIf,
  size,
  sizes,
  ThemeColor,
  variable,
} from '@betty-blocks/component-sdk';
import { badge } from './badge';
import { advanced } from './advanced';

export const options = {
  icon: icon('Icon', { value: 'AcUnit' }),
  size: size('Size', { value: 'S' }),
  color: color('Color', { value: ThemeColor.BLACK }),
  linkType: option('CUSTOM', {
    label: 'Link to',
    value: 'internal',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Internal page', value: 'internal' },
        { name: 'External page', value: 'external' },
      ],
    },
  }),
  linkTo: endpoint('Page', {
    value: '',
    configuration: {
      condition: showIf('linkType', 'EQ', 'internal'),
    },
  }),
  linkToExternal: variable('URL', {
    value: [''],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      condition: showIf('linkType', 'EQ', 'external'),
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  ...badge,

  ...advanced,
};
