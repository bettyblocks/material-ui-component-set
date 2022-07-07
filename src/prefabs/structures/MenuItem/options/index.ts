import {
  variable,
  color,
  ThemeColor,
  option,
  endpoint,
  showIf,
  icon,
  toggle,
  hideIf,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  primaryText: variable('Primary text', { value: ['Menu Item'] }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
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
    value: [],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      condition: showIf('linkType', 'EQ', 'external'),
    },
  }),
  openLinkToExternal: option('CUSTOM', {
    value: '_self',
    label: 'Open in',
    configuration: {
      condition: showIf('linkType', 'EQ', 'external'),
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Current Tab', value: '_self' },
        { name: 'New Tab', value: '_blank' },
      ],
    },
  }),
  icon: icon('Icon', { value: 'none' }),
  iconPosition: option('CUSTOM', {
    label: 'Icon position',
    value: 'start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      condition: hideIf('icon', 'EQ', 'none'),
      allowedInput: [
        { name: 'Start', value: 'start' },
        { name: 'End', value: 'end' },
      ],
    },
  }),
  textColor: color('Text color', { value: ThemeColor.PRIMARY }),
  disabled: toggle('Disabled', { value: false }),
  dense: toggle('Dense', { value: false }),
  divider: toggle('Divider', { value: false }),

  ...advanced,
};
