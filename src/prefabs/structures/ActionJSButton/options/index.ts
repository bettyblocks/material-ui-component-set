import {
  buttongroup,
  color,
  dropdown,
  hideIf,
  icon,
  option,
  property,
  showIfTrue,
  sizes,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
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
  buttonText: variable('Button text', { value: ['Button'] }),
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
  addTooltip: toggle('Add Tooltip'),

  hasVisibileTooltip: toggle('Toggle tooltip visibility', {
    value: true,
    configuration: { as: 'VISIBILITY', condition: showIfTrue('addTooltip') },
  }),

  tooltipPlacement: dropdown(
    'Tooltip Placement',
    [
      ['Top Start', 'top-start'],
      ['Top', 'top'],
      ['Top End', 'top-end'],
      ['Right', 'right'],
      ['Left', 'left'],
      ['Bottom Start', 'bottom-start'],
      ['Bottom', 'bottom'],
      ['Bottom End', 'bottom-end'],
    ],
    { configuration: { condition: showIfTrue('addTooltip') } },
  ),

  tooltipBackground: color('Tooltip Background', {
    value: ThemeColor.MEDIUM,
    configuration: { condition: showIfTrue('addTooltip') },
  }),

  tooltipText: color('Tooltip Text', {
    value: ThemeColor.BLACK,
    configuration: { condition: showIfTrue('addTooltip') },
  }),

  ...advanced,
};
