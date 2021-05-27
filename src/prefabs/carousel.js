(() => ({
  name: 'Carousel',
  icon: 'StepperIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Carousel',
      options: [
        {
          type: 'CUSTOM',
          label: 'Select',
          key: 'select',
          value: 'custom',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Model',
                value: 'model',
              },
              {
                name: 'Custom',
                value: 'custom',
              },
            ],
          },
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: '',
          label: 'Order by',
          key: 'orderProperty',
          type: 'PROPERTY',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: 'asc',
          label: 'Sort order',
          key: 'sortOrder',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
            condition: {
              type: 'HIDE',
              option: 'orderProperty',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Show image',
          key: 'activeStep',
          value: '1',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'custom',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Show all images',
          key: 'allImages',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'custom',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Continious loop',
          key: 'continiousLoop',
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
          label: 'Inactive dot color',
          key: 'incativeDotColor',
          value: 'Light',
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
          key: 'buttonBackgroundColor',
          value: 'Light',
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
          label: 'Button icon color',
          key: 'buttonColor',
          value: 'Black',
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
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
