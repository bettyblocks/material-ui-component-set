import { toggle, option } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  isVisible: toggle('Toggle visibility', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  isFullscreen: toggle('Fullscreen', {
    value: false,
  }),
  disableClick: toggle('Diable backdrop click', {
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

  ...advanced,
};
