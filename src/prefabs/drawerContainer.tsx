import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DrawerContainer } from './structures';

const attr = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'container', 'drawercontainer'],
};

export default prefab('Drawer Container', attr, undefined, [
  DrawerContainer({}, []),
]);
