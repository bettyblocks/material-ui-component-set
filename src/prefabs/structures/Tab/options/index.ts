import {
  variable,
  size,
  icon,
  option,
  hideIf,
  toggle,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const tabOptions = {
  label: variable('Tab label', {
    value: ['Tab'],
    configuration: {
      showOnDrop: true,
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  icon: icon('Icon', {
    value: 'None',
    configuration: {
      showOnDrop: true,
    },
  }),
  iconAlignment: option('CUSTOM', {
    label: 'Icon Alignment',
    value: 'top',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Top', value: 'top' },
        { name: 'Right', value: 'right' },
        { name: 'Bottom', value: 'bottom' },
      ],
      condition: hideIf('icon', 'EQ', 'None'),
      showOnDrop: true,
    },
  }),
  disabled: toggle('Disabled', { value: false }),
  disabledRipple: toggle('Disable ripple', { value: false }),

  ...advanced('Tab'),
};
