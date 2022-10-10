import {
  hideIf,
  icon,
  option,
  showIf,
  sizes,
  toggle,
  variable,
  action,
  actionInputObjects,
} from '@betty-blocks/component-sdk';
import { tooltip } from '../../Button/options/tooltip';
import { advanced } from '../../advanced';

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
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const actionButtonOptions = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  buttonText: variable('Button text', { value: ['Action Button'] }),
  // #region Action button
  actionId: action('Action', {
    ref: {
      value: '#actionId',
    },
    configuration: {
      apiVersion: 'v1',
      condition: showIf('linkType', 'EQ', 'action'),
    },
  }),
  actionModels: actionInputObjects('Objects to pass to action', {
    value: [],
    configuration: {
      apiVersion: 'v1',
      condition: showIf('linkType', 'EQ', 'action'),
    },
  }),
  // #endregion
  fullWidth: toggle('Full width', { value: false }),
  icon: icon('Icon', { value: 'None' }),
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
      condition: hideIf('icon', 'EQ', 'None'),
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

  ...advanced('Button'),
};
