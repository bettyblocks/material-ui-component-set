import {
  buttongroup,
  dropdown,
  size,
  toggle,
  variable,
  icon,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const ratingInputOptions = {
  content: variable('Rating', {
    value: [],
    configuration: { as: 'MULTILINE', allowedTypes: ['decimal'] },
  }),
  hideLabel: toggle('Hide label'),
  numberOfIcons: dropdown(
    'Number of icons',
    [
      ['1', '1'],
      ['2', '2'],
      ['3', '3'],
      ['4', '4'],
      ['6', '6'],
      ['7', '7'],
      ['8', '8'],
      ['9', '9'],
      ['10', '10'],
    ],
    {
      value: '5',
    },
  ),
  validationOptions: toggle('Validation options', { value: true }),
  validationValueMissing: variable('Position', {
    value: 'end',
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'validationOptions',
        comparator: 'EQ',
        value: 'true',
      },
    },
  }),
  disabled: toggle('Disabled'),
  readonly: toggle('Is read only'),
  precision: buttongroup(
    'Precision',
    [
      ['Half', '0.5'],
      ['Full', '1'],
    ],
    {
      value: '1',
    },
  ),
  size: buttongroup(
    'Precision',
    [
      ['Small', 'small'],
      ['Medium', 'medium'],
      ['Large', 'large'],
      ['Custom', 'custom'],
    ],
    {
      value: 'medium',
    },
  ),
  customSize: size('customSize', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'size',
        comparator: 'EQ',
        value: 'custom',
      },
    },
  }),
  helperText: variable('Helper text', { value: '' }),
  icon: icon('Icon', { value: 'Star' }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  styles: toggle('Styles'),
  ...advanced('RatingInput'),
};
