import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Icon as TsIcon } from './structures/Icon';

const attributes = {
  category: 'CONTENT',
  icon: Icon.IconIcon,
  keywords: ['Content', 'icon', 'symbol'],
};

export default prefab('Icon', attributes, undefined, [TsIcon({})]);
