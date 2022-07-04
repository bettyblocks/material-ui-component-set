import { option, toggle } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  alignment: option('CUSTOM', {
    label: 'Alignment',
    value: 'flex-start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'End', value: 'flex-end' },
      ],
    },
  }),
  disableSpacing: toggle('Disable spacing', { value: false }),

  ...advanced,
};
