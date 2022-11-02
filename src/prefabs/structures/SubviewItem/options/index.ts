import {
  variable,
  color,
  ThemeColor,
  option,
  endpoint,
  showIf,
  icon,
  toggle,
  property,
  model,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { styles } from './styles';

export const categories = [
  {
    label: 'State',
    expanded: false,
    members: ['disabled', 'disableGutters'],
  },
  {
    label: 'Styles',
    expanded: false,
    members: [
      'dense',
      'divider',
      'selected',
      'titleSize',
      'titleColor',
      'titleWeight',
      'subtitleSize',
      'subtitleColor',
      'subtitleWeight',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const subviewItemOptions = {
  prop: property('Property'),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  linkTo: endpoint('Page', {
    value: '',
  }),
  alignItems: option('CUSTOM', {
    label: 'Align items',
    value: 'center',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Start', value: 'flex-start' },
        { name: 'Center', value: 'center' },
      ],
    },
  }),
  iconLeft: icon('Icon Left', {
    value: '',
  }),
  iconRight: icon('Icon Right', {
    value: 'KeyboardArrowRight',
  }),
  iconColor: color('Icon color', {
    value: ThemeColor.BLACK,
  }),
  disabled: toggle('Disabled', { value: false }),
  disableGutters: toggle('Disable gutters', { value: false }),
  dense: toggle('Dense', { value: false }),
  divider: toggle('Divider', { value: true }),
  selected: toggle('Selected', { value: false }),

  ...styles,

  ...advanced('Subview item'),
};
