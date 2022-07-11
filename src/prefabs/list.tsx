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

const customListItemOptions = (iconValue: string) => ({
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
    value: iconValue,
    configuration: {
      condition: showIf('avatarOrIcon', 'EQ', 'icon'),
    },
  }),
});

export default prefab('List', attr, undefined, [
  List({}, [
    ListItem(
      {
        options: customListItemOptions('Apartment'),
      },
      [],
    ),
    ListItem(
      {
        options: customListItemOptions('Person'),
      },
      [],
    ),
  ]),
]);
