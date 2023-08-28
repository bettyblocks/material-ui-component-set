import {
  ThemeColor,
  buttongroup,
  color,
  dropdown,
  hideIf,
  icon,
  option,
  property,
  showIf,
  size,
  sizes,
  toggle,
  variable,
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
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['DECIMAL'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
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
    value: ThemeColor.BLACK,
  }),

  ...advanced('RatingInput'),
};
