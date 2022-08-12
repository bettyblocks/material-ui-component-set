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
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const breadcrumbItemOptions = {
  breadcrumbContent: variable('Content', { value: ['Breadcrumb Item'] }),
  endpoint: endpoint('Page', { value: '' }),
  textColor: color('Text Color', { value: ThemeColor.BLACK }),
  icon: icon('Icon', { value: 'None' }),
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
