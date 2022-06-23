import {
  toggle,
  variable,
  icon,
  option,
  hideIf,
  sizes,
  showIf,
  endpoint,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { tooltip } from '../../Button/options/tooltip';

export const options = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  buttonText: variable('Button text', { value: ['Open page'] }),
  // #region OpenPage button
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
  // #endregion
  fullWidth: toggle('Full width', { value: false }),
  icon: icon('Icon', { value: 'none' }),
  size: option('CUSTOM', {
    value: 'small',
    label: 'Icon size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Small', value: 'small' },
        { name: 'Medium', value: 'medium' },
        { name: 'Large', value: 'large' },
      ],
      condition: hideIf('icon', 'EQ', 'none'),
    },
  }),
  iconPosition: option('CUSTOM', {
    label: 'Icon position',
    value: 'start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'start' },
        { name: 'End', value: 'end' },
      ],
      condition: hideIf('icon', 'EQ', 'none'),
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  disabled: toggle('Disabled', { value: false }),

  ...tooltip,

  ...advanced,
};
