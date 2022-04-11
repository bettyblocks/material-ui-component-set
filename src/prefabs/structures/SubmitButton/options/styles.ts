import {
  buttongroup,
  color,
  dropdown,
  hideIf,
  icon,
  showIfTrue,
  sizes,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const styles = {
  fullWidth: toggle('Full width', { value: false }),

  variant: buttongroup(
    'Variant',
    [
      ['Standard', 'standard'],
      ['Outlined', 'outlined'],
      ['Filled', 'filled'],
    ],
    { value: 'outlined' },
  ),

  icon: icon('Icon', {
    value: 'None',
  }),

  size: buttongroup(
    'Icon size',
    [
      ['Large', 'large'],
      ['Medium', 'medium'],
      ['Small', 'small'],
    ],
    {
      value: 'small',
      configuration: {
        condition: hideIf('icon', 'EQ', 'None'),
      },
    },
  ),

  iconPosition: buttongroup(
    'Position',
    [
      ['Start', 'start'],
      ['End', 'end'],
    ],
    {
      value: 'start',
      configuration: {
        condition: {
          type: 'HIDE',
          option: 'icon',
          comparator: 'EQ',
          value: 'None',
        },
      },
    },
  ),

  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  disabled: toggle('Disabled', { value: false }),

  addTooltip: toggle('Add Tooltip', {
    value: false,
    configuration: { as: 'VISIBILITY' },
  }),

  hasVisibleTooltip: toggle('Toggle tooltip visibility', {
    value: true,
    configuration: { as: 'VISIBILITY', condition: showIfTrue('addTooltip') },
  }),

  tooltipContent: toggle('Tooltip Content', {
    value: ['Tips'],
    configuration: {
      condition: showIfTrue('addTooltip'),
    },
  }),

  tooltipPlacement: dropdown(
    'Tooltip Placement',
    [
      ['Top Start', 'top-start'],
      ['Top', 'top'],
      ['Top End', 'top-end'],
      ['Right', 'right'],
      ['Left', 'left'],
      ['Bottom', 'bottom'],
      ['Bottom End', 'bottom-end'],
    ],
    {
      value: ['bottom'],
      configuration: { condition: showIfTrue('addTooltip') },
    },
  ),

  tooltipBackground: color('Tooltip Background', {
    value: ThemeColor.MEDIUM,
    configuration: {
      condition: showIfTrue('addTooltip'),
    },
  }),

  tooltipText: color('Tooltip Text', {
    value: ThemeColor.BLACK,
    configuration: { condition: showIfTrue('addTooltip') },
  }),
};
