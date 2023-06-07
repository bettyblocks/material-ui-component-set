import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import {
  Drawer,
  DrawerBar,
  DrawerContainer,
  List,
  ListItem,
  listItemOptions,
} from './structures';

const attrs = {
  icon: Icon.DrawerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'drawer', 'sidebar'],
};

export default prefab('Drawer', attrs, undefined, [
  Drawer({}, [
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
    DrawerContainer({}),
  ]),
]);
