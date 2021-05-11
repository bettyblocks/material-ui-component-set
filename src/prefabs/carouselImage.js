(() => ({
  name: 'CarouselImage',
  icon: 'StepIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'CarouselImage',
      options: [
        {
          value: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
          ],
          label: 'Source',
          key: 'imageSource',
          type: 'VARIABLE',
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
