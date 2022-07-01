import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Media } from './structures/Media';

const attributes = {
  category: 'CONTENT',
  icon: Icon.ImageIcon,
  keywords: ['Content', 'media', 'image', 'video', 'iframe', 'picture'],
};

export default prefab('Media', attributes, undefined, [Media({})]);
