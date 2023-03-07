import { prefab, Icon } from '@betty-blocks/component-sdk';

import { SubviewItem } from './structures';

const attr = {
  icon: Icon.SubViewItemIcon,
  category: 'LIST',
  keywords: ['List', 'item', 'listitem'],
};

export default prefab('Subview item', attr, undefined, [SubviewItem({}, [])]);
