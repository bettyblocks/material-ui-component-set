import {
  toggle,
  showIfTrue,
  variable,
  color,
  ThemeColor,
  option,
  sizes,
} from '@betty-blocks/component-sdk';

export const badge = {
  addBadge: toggle('Add Badge', { value: false }),
  hideBadge: toggle('Hide badge if value is 0', {
    value: false,
    configuration: {
      condition: showIfTrue('addBadge'),
    },
  }),
  content: variable('Content', {
    value: ['1'],
    configuration: {
      as: 'MULTILINE',
      condition: showIfTrue('addBadge'),
    },
  }),
  badgeColor: color('Badge Color', {
    value: ThemeColor.DANGER,
    configuration: {
      condition: showIfTrue('addBadge'),
    },
  }),
  badgeTextColor: color('Badge Text Color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: showIfTrue('addBadge'),
    },
  }),
  anchorOrigin: option('CUSTOM', {
    label: 'Anchor Origin',
    value: 'right,top',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Top Right',
          value: 'right,top',
        },
        {
          name: 'Top Left',
          value: 'left,top',
        },
        {
          name: 'Bottom Right',
          value: 'right,bottom',
        },
        {
          name: 'Bottom Left',
          value: 'left,bottom',
        },
      ],
      condition: showIfTrue('addBadge'),
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'standard',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Standard', value: 'standard' },
        { name: 'Dot', value: 'dot' },
      ],
      condition: showIfTrue('addBadge'),
    },
  }),
  margin: sizes('Outer Space', {
    value: ['S', 'S', 'S', 'S'],
    configuration: {
      condition: showIfTrue('addBadge'),
    },
  }),
};
