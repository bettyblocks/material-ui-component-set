import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Menu } from './structures/Menu';
import { MenuItem } from './structures/MenuItem';

const attr = {
  icon: Icon.MenuIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'menu', 'item', 'menuitem', 'dropdown item'],
};

export default prefab('Menu', attr, undefined, [Menu({}, [MenuItem({}, [])])]);
