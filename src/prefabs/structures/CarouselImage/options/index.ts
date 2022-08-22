import { variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const carouselImageOptions = {
  imageSource: variable('Source', {
    value: [
      'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/image-carousel-preview',
    ],
  }),

  ...advanced('CarouselImage'),
};
