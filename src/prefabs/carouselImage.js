(() => ({
  name: 'Carousel Image',
  icon: 'ImageIcon',
  category: 'CONTENT',
  keywords: ['image', 'carousel', 'image carousel'],
  structure: [
    {
      name: 'CarouselImage',
      options: [
        {
          value: [
            'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/image-carousel-preview',
          ],
          label: 'Source',
          key: 'imageSource',
          type: 'VARIABLE',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['CarouselImage'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
