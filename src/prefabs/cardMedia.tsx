import { Icon, prefab } from '@betty-blocks/component-sdk';
import { CardMedia } from './structures';

const attr = {
  icon: Icon.CardMediaIcon,
  category: 'CARDS',
  keywords: ['Cards', 'card', 'media', 'cardmedia'],
};

export default prefab('Card Media', attr, undefined, [CardMedia({}, [])]);
