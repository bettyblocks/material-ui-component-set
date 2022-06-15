import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DrawerBar } from './structures/DrawerBar';
import { List } from './structures/List';
import { ListItem } from './structures/ListItem';

const attr = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar', 'drawersidebar'],
};

export default prefab('Drawer Sidebar', attr, undefined, [
  DrawerBar({}, [List({}, [ListItem({})])]),
]);
