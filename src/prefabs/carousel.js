(() => ({
  name: 'Carousel',
  icon: 'StepperIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Carousel',
      options: [
        {
          type: 'NUMBER',
          label: 'Show image',
          key: 'activeStep',
          value: '1',
        },
        {
          type: 'TOGGLE',
          label: 'Show all images',
          key: 'allImages',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Autoplay',
          key: 'autoplay',
          value: false,
        },
        {
          type: 'NUMBER',
          label: 'Autoplay duration (ms)',
          key: 'duration',
          value: '5000',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'autoplay',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Variant',
          key: 'variant',
          value: 'horizontal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Overlay', value: 'horizontal' },
              { name: 'Bottom', value: 'mobile' },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Active dot color',
          key: 'dotColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Button background color',
          key: 'buttonBackground',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button next label',
          key: 'buttonNext',
          value: ['Next'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button previous label',
          key: 'buttonPrev',
          value: ['Back'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active color',
          key: 'activeColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active Label color',
          key: 'activeLabelColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive color',
          key: 'inactiveColor',
          value: 'Secondary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive Label color',
          key: 'inactiveLabelColor',
          value: 'Medium',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Step Progress color',
          key: 'stepProgressColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
      ],
      descendants: [
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
    },
  ],
}))();
