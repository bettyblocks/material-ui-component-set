import {
  prefab,
  Icon,
  variable,
  option,
  showIf,
  icon,
} from '@betty-blocks/component-sdk';
import { List } from './structures/List';
import { ListItem } from './structures/ListItem';
import { options as listItemOptions } from './structures/ListItem/options';

const attr = {
  icon: Icon.OrderedListIcon,
  category: 'LIST',
  keywords: ['List'],
};

export default prefab('List', attr, undefined, [
  List({}, [
    ListItem(
      {
        options: {
          ...listItemOptions,
          primaryText: variable('Primary text', { value: ['First List Item'] }),
          secondaryText: variable('Secondary text', {
            value: ['Secondary text'],
          }),
          avatarOrIcon: option('CUSTOM', {
            label: 'Visual',
            value: 'icon',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'None', value: 'none' },
                { name: 'Icon', value: 'icon' },
                { name: 'Avatar', value: 'avatar' },
              ],
            },
          }),
          icon: icon('Icon', {
            value: 'Apartment',
            configuration: {
              condition: showIf('avatarOrIcon', 'EQ', 'icon'),
            },
          }),
        },
      },
      [],
    ),
    ListItem(
      {
        options: {
          ...listItemOptions,
          primaryText: variable('Primary text', {
            value: ['Second List Item'],
          }),
          secondaryText: variable('Secondary text', {
            value: ['Secondary text'],
          }),
          avatarOrIcon: option('CUSTOM', {
            label: 'Visual',
            value: 'icon',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'None', value: 'none' },
                { name: 'Icon', value: 'icon' },
                { name: 'Avatar', value: 'avatar' },
              ],
            },
          }),
          icon: icon('Icon', {
            value: 'Person',
            configuration: {
              condition: showIf('avatarOrIcon', 'EQ', 'icon'),
            },
          }),
        },
      },
      [],
    ),
  ]),
]);
