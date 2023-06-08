import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Media3D } from './structures/Media3D';

const attributes = {
  category: 'CONTENT',
  icon: Icon.ImageIcon,
  keywords: ['Content', 'media', 'image', 'picture', '3D'],
};

export default prefab('Media 3D', attributes, undefined, [Media3D({})]);
