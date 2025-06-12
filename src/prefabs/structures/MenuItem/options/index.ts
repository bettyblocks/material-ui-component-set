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
  displayLogic,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'State',
    expanded: false,
    members: ['disabled'],
  },
  {
    label: 'Styling',
    expanded: false,
    members: ['backgroundColor', 'iconColor', 'textColor', 'dense', 'divider'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const menuItemOptions = {
  primaryText: variable('Primary text', {
    value: ['Menu Item'],
    configuration: {
      showOnDrop: true,
    },
  }),
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
  icon: icon('Icon', {
    value: 'none',
    configuration: {
      showOnDrop: true,
    },
  }),
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
  iconColor: color('Icon color', {
    value: ThemeColor.PRIMARY,
    configuration: { condition: hideIf('icon', 'EQ', 'none') },
  }),
  textColor: color('Text color', { value: ThemeColor.PRIMARY }),
  disabled: toggle('Disabled', { value: false }),
  dense: toggle('Dense', { value: false }),
  divider: toggle('Divider', { value: false }),
  displayLogic: displayLogic('Display logic', {
    value: {},
  }),

  ...advanced('Menu item'),
};
