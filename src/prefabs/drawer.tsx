import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { Drawer } from './structures/Drawer';
import { drawerBar } from './structures/drawerbar';
import { drawerContainer } from './structures/drawerContainer';
import { List } from './structures/List';
import { ListItem } from './structures/ListItem';
import { options } from './structures/ListItem/options';

const attrs = {
  icon: Icon.DrawerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar'],
};

options.secondaryText = variable('Secondary text', {
  value: ['Secondary text'],
});

export default prefab('Drawer', attrs, undefined, [
  Drawer({}, [
    drawerBar({}, [List({}, [ListItem({ options })])]),
    drawerContainer({}),
  ]),
]);
