import {
  font,
  option,
  sizes,
  variable,
  endpoint,
  showIf,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  content: variable('Content', {
    value: [],
    configuration: { as: 'MULTILINE' },
  }),

  useInnerHtml: toggle('Display Rich Text', {
    value: false,
    configuration: {
      condition: showIfTrue('useInnerHtml'),
    },
  }),
  type: font('Font', { value: ['Title2'] }),
  textAlignment: option('CUSTOM', {
    label: 'Text Alignment',
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
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
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
  linkTarget: option('CUSTOM', {
    value: '_self',
    label: 'Open in',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Current Tab', value: '_self' },
        { name: 'New Tab', value: '_blank' },
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

  ...styles,

  ...advanced,
};
