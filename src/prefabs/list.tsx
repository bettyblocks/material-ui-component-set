import {
  prefab,
  Icon,
  variable,
  option,
  icon,
} from '@betty-blocks/component-sdk';
import { List, ListItem, listItemOptions } from './structures';

const attr = {
  icon: Icon.OrderedListIcon,
  category: 'LIST',
  keywords: ['List'],
};

const customListItemOptions = (iconValue: string) => ({
  ...listItemOptions,
  primaryText: variable('Primary text', {
    ...listItemOptions.primaryText('primaryText'),
    value: ['First List Item'],
  }),
  secondaryText: variable('Secondary text', {
    ...listItemOptions.secondaryText('secondaryText'),
    value: ['Secondary text'],
  }),
  avatarOrIcon: option('CUSTOM', {
    ...listItemOptions.avatarOrIcon('avatarOrIcon'),
    value: 'icon',
  }),
  icon: icon('Icon', {
    ...listItemOptions.icon('icon'),
    value: iconValue,
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
