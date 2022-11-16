import {
  toggle,
  variable,
  option,
  endpoint,
  showIf,
  icon,
  hideIf,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { tooltip } from '../../Button/options/tooltip';

export const categories = [
  {
    label: 'Tooltip',
    expanded: false,
    members: [
      'addTooltip',
      'hasVisibleTooltip',
      'tooltipContent',
      'tooltipPlacement',
      'tooltipBackground',
      'tooltipText',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const openPageButtonOptions = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  buttonText: variable('Button text', { value: ['Open page'] }),
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
  fullWidth: toggle('Full width', {
    value: false,
    configuration: {
      condition: showIf('variant', 'EQ', 'icon'),
    },
  }),
  icon: icon('Icon', { value: 'None' }),
  size: option('CUSTOM', {
    value: 'small',
    label: 'Icon size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Large', value: 'large' },
        { name: 'Medium', value: 'medium' },
        { name: 'Small', value: 'small' },
      ],
      condition: hideIf('icon', 'EQ', 'None'),
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
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  disabled: toggle('Disabled', { value: false }),

  ...tooltip,

  ...advanced('Button'),
};
