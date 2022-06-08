import { Icon, prefab } from '@betty-blocks/component-sdk';
import { drawerContainer } from './structures/drawerContainer';

const attr = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'container', 'drawercontainer'],
};

export default prefab('Drawer Container (TS)', attr, undefined, [
  drawerContainer({}, []),
]);
