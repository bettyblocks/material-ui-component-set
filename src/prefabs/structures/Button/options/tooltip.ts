import {
  color,
  option,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

export const tooltip = {
  addTooltip: toggle('Toggle tooltip', { value: false }),
  hasVisibleTooltip: toggle('Toggle tooltip visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  tooltipContent: variable('Tooltip Content', {
    value: ['Tips'],
  }),
  tooltipPlacement: option('CUSTOM', {
    label: 'Tooltip Placement',
    value: 'bottom',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Top Start',
          value: 'top-start',
        },
        {
          name: 'Top',
          value: 'top',
        },
        {
          name: 'Top End',
          value: 'top-end',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Botttom Start',
          value: 'bottom-start',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
        {
          name: 'Bottom End',
          value: 'bottom-end',
        },
      ],
    },
  }),
  tooltipBackground: color('Tooltip Background', {
    value: ThemeColor.MEDIUM,
  }),
  tooltipText: color('Tooltip Text', {
    value: ThemeColor.BLACK,
  }),
};
