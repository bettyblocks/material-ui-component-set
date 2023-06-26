import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { DrawerBar, List, ListItem, listItemOptions } from './structures';

const attr = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar', 'drawersidebar'],
};

export default prefab('Drawer Sidebar', attr, undefined, [
  DrawerBar({}, [
    List({}, [
      ListItem({
        options: {
          ...listItemOptions,
          secondaryText: variable('Secondary text', {
            ...listItemOptions.secondaryText('secondaryText'),
            value: ['Secondary text'],
          }),
        },
      }),
    ]),
  ]),
]);
