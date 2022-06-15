import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { Drawer } from './structures/Drawer';
import { DrawerBar } from './structures/DrawerBar';
import { DrawerContainer } from './structures/DrawerContainer';
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
    DrawerBar({}, [List({}, [ListItem({ options })])]),
    DrawerContainer({}),
  ]),
]);
