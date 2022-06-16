import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Avatar } from './structures/Avatar';

const attributes = {
  category: 'CONTENT',
  icon: Icon.AvatarIcon,
  keywords: ['Content', 'avatar', 'profile picture'],
};

export default prefab('Avatar', attributes, undefined, [Avatar({})]);
