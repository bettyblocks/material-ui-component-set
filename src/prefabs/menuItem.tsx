import { prefab, Icon } from '@betty-blocks/component-sdk';
import { MenuItem } from './structures/MenuItem';

const attr = {
  icon: Icon.MenuItemIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'menu', 'item', 'menuitem', 'dropdown item'],
};

export default prefab('Menu Item', attr, undefined, [MenuItem({}, [])]);
