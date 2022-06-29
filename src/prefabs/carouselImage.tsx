import { prefab, Icon } from '@betty-blocks/component-sdk';
import { CarouselImage } from './structures/CarouselImage';

const attr = {
  icon: Icon.ImageIcon,
  category: 'CONTENT',
  keywords: ['image', 'carousel', 'image carousel'],
};

export default prefab('Carousel image', attr, undefined, [
  CarouselImage({}, []),
]);
