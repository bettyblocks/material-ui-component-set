import {
  filter,
  hideIf,
  model,
  number,
  option,
  property,
  showIf,
  showIfTrue,
  toggle,
  size,
  color,
  ThemeColor,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'width',
      'height',
      'dotColor',
      'inactiveDotColor',
      'buttonBackgroundColor',
      'buttonColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const carouselOptions = {
  select: option('CUSTOM', {
    label: 'Source',
    value: 'custom',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'URL',
          value: 'custom',
        },
        {
          name: 'Model',
          value: 'model',
        },
      ],
    },
  }),
  model: model('Model', {
    value: '',
    configuration: {
      condition: showIf('select', 'EQ', 'model'),
    },
  }),
  property: property('Property', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: showIf('select', 'EQ', 'model'),
    },
  }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
      condition: showIf('select', 'EQ', 'model'),
    },
  }),
  orderProperty: property('Order by', {
    value: '',
    configuration: {
      dependsOn: 'model',
      condition: showIf('select', 'EQ', 'model'),
    },
  }),
  sortOrder: option('CUSTOM', {
    value: 'asc',
    label: 'Sort order',
    configuration: {
      dependsOn: 'model',
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
      ],
      condition: hideIf('orderProperty', 'EQ', ''),
    },
  }),
  maxImages: number('Max images', {
    value: 50,
    configuration: {
      condition: showIf('select', 'EQ', 'model'),
    },
  }),
  activeStep: number('Show image', {
    value: 1,
    configuration: {
      condition: showIf('select', 'EQ', 'custom'),
    },
  }),
  allImages: toggle('Show all images', {
    value: false,
    configuration: {
      condition: showIf('select', 'EQ', 'custom'),
    },
  }),
  continuousLoop: toggle('Continuous loop', { value: false }),
  autoplay: toggle('Autoplay', { value: false }),
  duration: number('Autoplay duration (ms)', {
    value: 5000,
    configuration: {
      condition: showIfTrue('autoplay'),
    },
  }),
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'horizontal',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Overlay', value: 'horizontal' },
        { name: 'Bottom', value: 'mobile' },
      ],
    },
  }),
  dotColor: color('Active dot color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('variant', 'EQ', 'horizontal'),
    },
  }),
  inactiveDotColor: color('Inactive dot color', {
    value: ThemeColor.LIGHT,
    configuration: {
      condition: showIf('variant', 'EQ', 'horizontal'),
    },
  }),
  buttonBackgroundColor: color('Button background color', {
    value: ThemeColor.LIGHT,
    configuration: {
      condition: showIf('variant', 'EQ', 'horizontal'),
    },
  }),
  buttonColor: color('Button icon color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'variant',
        comparator: 'EQ',
        value: 'horizontal',
      },
    },
  }),
  buttonNext: variable('Button next label', {
    value: ['Next'],
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  buttonPrev: variable('Button previous label', {
    value: ['Back'],
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  activeColor: color('Active color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  activeLabelColor: color('Active label color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  inactiveColor: color('Inactive color', {
    value: ThemeColor.SECONDARY,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  inactiveLabelColor: color('Inactive label color', {
    value: ThemeColor.MEDIUM,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),
  stepProgressColor: color('Step progress color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('variant', 'EQ', 'mobile'),
    },
  }),

  ...advanced('Carousel'),
};
