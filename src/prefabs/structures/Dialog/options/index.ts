import { toggle, option } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute', 'preLoadChildren', 'invisible'],
  },
];

export const dialogOptions = {
  isVisible: toggle('Visible in builder', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  isFullscreen: toggle('Fullscreen', {
    value: false,
  }),
  disableClick: toggle('Disable backdrop click', {
    value: false,
  }),
  width: option('CUSTOM', {
    value: 'sm',
    label: 'Width',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Extra-small', value: 'xs' },
        { name: 'Small', value: 'sm' },
        { name: 'Medium', value: 'md' },
        { name: 'Large', value: 'lg' },
        { name: 'Extra-large', value: 'xl' },
      ],
    },
  }),
  runTimeVisibility: option('CUSTOM', {
    label: 'Initial State (RUNTIME)',
    value: 'false',
    configuration: {
      as: 'DROPDOWN',
      allowedInput: [
        { name: 'Visible', value: 'true' },
        { name: 'Hidden', value: 'false' },
      ],
    },
  }),

  ...advanced,
};
