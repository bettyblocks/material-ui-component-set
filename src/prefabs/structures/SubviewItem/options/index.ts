import {
  color,
  ThemeColor,
  option,
  endpoint,
  icon,
  toggle,
  property,
  variable,
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
  prop: property('Property', {
    configuration: {
      allowRelations: true,
      allowedKinds: [
        'BELONGS_TO',
        'HAS_AND_BELONGS_TO_MANY',
        'HAS_MANY',
        'HAS_ONE',
      ],
      showOnDrop: true,
    },
  }),
  content: variable('Label', { value: [''] }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  linkTo: endpoint('Page', {
    value: '',
    configuration: {
      showOnDrop: true,
    },
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
  icon: icon('Icon', {
    value: '',
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
