import {
  buttongroup,
  hideIf,
  icon,
  option,
  property,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { tooltip } from './tooltip';
import { advanced } from './advanced';

export const options = {
  visible: toggle('Toggle Visibility', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),

  actionId: option('ACTION_JS', {
    label: 'Action',
    value: '',
    configuration: {
      disabled: true,
    },
  }),

  property: property('Pass value to action'),
  buttonText: variable('Button text', { value: ['Action button'] }),
  fullWidth: toggle('Full width'),
  icon: icon('Icon', { value: 'None' }),
  size: buttongroup(
    'Icon size',
    [
      ['Small', 'small'],
      ['Medium', 'medium'],
      ['Large', 'large'],
    ],
    {
      value: 'small',
      configuration: { condition: hideIf('icon', 'EQ', 'None') },
    },
  ),

  iconPosition: buttongroup(
    'Icon position',
    [
      ['Start', 'start'],
      ['End', 'end'],
    ],
    {
      value: 'start',
      configuration: { condition: hideIf('icon', 'EQ', 'None') },
    },
  ),

  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  disabled: toggle('Disabled'),

  ...tooltip,
  ...advanced,
};
