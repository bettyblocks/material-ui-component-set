import {
  color,
  endpoint,
  hideIf,
  icon,
  option,
  ThemeColor,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const breadcrumbItemOptions = {
  breadcrumbContent: variable('Content', {
    value: ['Breadcrumb Item'],
    configuration: {
      showOnDrop: true,
    },
  }),
  endpoint: endpoint('Page', {
    value: '',
    configuration: {
      showOnDrop: true,
    },
  }),
  textColor: color('Text Color', { value: ThemeColor.BLACK }),
  icon: icon('Icon', {
    value: 'None',
    configuration: {
      showOnDrop: true,
    },
  }),
  iconPosition: option('CUSTOM', {
    label: 'Icon position',
    value: 'start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      condition: hideIf('variant', 'EQ', 'icon'),
      allowedInput: [
        { name: 'Start', value: 'start' },
        { name: 'End', value: 'end' },
      ],
    },
  }),

  ...advanced('Breadcrumb item'),
};
