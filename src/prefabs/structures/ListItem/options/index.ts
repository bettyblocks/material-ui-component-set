import {
  variable,
  color,
  ThemeColor,
  option,
  endpoint,
  showIf,
  icon,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';

export const categories = [
  {
    label: 'State',
    expanded: false,
    members: ['disabled', 'disableGutters'],
  },
  {
    label: 'Styles',
    expanded: false,
    members: [
      'dense',
      'divider',
      'selected',
      'font',
      'titleColor',
      'titleWeight',
      'subtitleFont',
      'subtitleColor',
      'subtitleWeight',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const listItemOptions = {
  primaryText: variable('Primary text', {
    value: ['Title'],
    configuration: {
      showOnDrop: true,
    },
  }),
  secondaryText: variable('Secondary text', {
    value: [''],
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
    value: [''],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      condition: showIf('linkType', 'EQ', 'external'),
    },
  }),
  alignItems: option('CUSTOM', {
    label: 'Align items',
    value: 'center',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'flex-start' },
        { name: 'Center', value: 'center' },
      ],
    },
  }),
  avatarOrIcon: option('CUSTOM', {
    label: 'Visual',
    value: 'none',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Icon', value: 'icon' },
        { name: 'Avatar', value: 'avatar' },
      ],
    },
  }),
  icon: icon('Icon', {
    value: 'Person',
    configuration: {
      condition: showIf('avatarOrIcon', 'EQ', 'icon'),
    },
  }),
  iconColor: color('Icon color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('avatarOrIcon', 'EQ', 'icon'),
    },
  }),
  avatar: toggle('Show icon as avatar', {
    value: false,
    configuration: {
      condition: showIf('avatarOrIcon', 'EQ', 'icon'),
    },
  }),
  avatarUrl: variable('Avatar URL', {
    value: [''],
    configuration: {
      condition: showIf('avatarOrIcon', 'EQ', 'avatar'),
    },
  }),
  disabled: toggle('Disabled', { value: false }),
  disableGutters: toggle('Disable gutters', { value: false }),
  dense: toggle('Dense', { value: false }),
  divider: toggle('Divider', { value: false }),
  selected: toggle('Selected', { value: false }),

  ...styles,

  ...advanced('List item'),
};
