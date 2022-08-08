import { prefab, Icon } from '@betty-blocks/component-sdk';
import { ListItem } from './structures';

const attr = {
  icon: Icon.ListItemIcon,
  category: 'LIST',
  keywords: ['List', 'item', 'listitem'],
};

export default prefab('List item', attr, undefined, [ListItem({}, [])]);
