import {
  buttongroup,
  dropdown,
  size,
  toggle,
  variable,
  icon,
  sizes,
  color,
  ThemeColor,
  option,
  showIf,
  hideIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'hideLabel',
      'emptyColor',
      'filledColor',
      'helperColor',
      'errorColor',
      'labelColor',
    ],
  },
  {
    label: 'Validation Options',
    expanded: false,
    members: ['required', 'validationValueMissing'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const ratingInputOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
  actionProperty: option('ACTION_JS_PROPERTY', {
    label: 'Property',
    value: '',
    configuration: { condition: hideIf('actionProperty', 'EQ', '') },
  }),
  hideLabel: toggle('Hide label'),

  label: variable('Label', { value: ['Select'] }),
  value: variable('Value', { value: [''] }),
  required: toggle('Required'),
  validationValueMissing: variable('Validation error text', {
    value: ['This value is required'],
  }),
  disabled: toggle('Disabled'),
  readonly: toggle('Is read only'),
  helperText: variable('Helper text', { value: [''] }),
  numberOfIcons: dropdown(
    'Number of icons',
    [
      ['1', '1'],
      ['2', '2'],
      ['3', '3'],
      ['4', '4'],
      ['5', '5'],
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
  precision: buttongroup(
    'Precision',
    [
      ['Half', '0.5'],
      ['Full', '1.0'],
    ],
    {
      value: '1.0',
    },
  ),
  size: buttongroup(
    'Size',
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
  customSize: size('Custom size', {
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
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  icon: icon('Icon', { value: 'Star' }),
  emptyColor: color('Empty icon color', {
    value: ThemeColor.LIGHT,
  }),
  filledColor: color('Filled icon color', {
    value: ThemeColor.WARNING,
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
  }),

  ...advanced('RatingInput'),
};
