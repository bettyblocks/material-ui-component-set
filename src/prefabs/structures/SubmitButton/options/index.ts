import {
  hideIf,
  icon,
  option,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { tooltip } from './tooltip';

export const options = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  buttonText: variable('Button text', { value: ['Send'] }),
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
