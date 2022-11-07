import {
  color,
  endpoint,
  icon,
  option,
  showIf,
  size,
  sizes,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Badge',
    expanded: false,
    members: [
      'addBadge',
      'hideBadge',
      'content',
      'badgeColor',
      'badgeTextColor',
      'anchorOrigin',
      'variant',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const iconOptions = {
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
  addBadge: toggle('Add Badge', { value: false }),
  hideBadge: toggle('Hide badge if value is 0', {
    value: false,
  }),
  content: variable('Content', {
    value: ['1'],
    configuration: {
      as: 'MULTILINE',
    },
  }),
  badgeColor: color('Badge Color', {
    value: ThemeColor.DANGER,
  }),
  badgeTextColor: color('Badge Text Color', {
    value: ThemeColor.WHITE,
  }),
  anchorOrigin: option('CUSTOM', {
    label: 'Anchor Origin',
    value: 'right,top',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Top Right',
          value: 'right,top',
        },
        {
          name: 'Top Left',
          value: 'left,top',
        },
        {
          name: 'Bottom Right',
          value: 'right,bottom',
        },
        {
          name: 'Bottom Left',
          value: 'left,bottom',
        },
      ],
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'standard',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Standard', value: 'standard' },
        { name: 'Dot', value: 'dot' },
      ],
    },
  }),
  ...advanced('Icon'),
};
