import {
  prefab,
  component,
  text,
  color,
  sizes,
  variable,
  toggle,
  dropdown,
  buttongroup,
  showIfTrue,
  ThemeColor,
  Icon,
} from '@betty-blocks/component-sdk';

type DropdownInput = [string, string][];

const attributes = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};

const maxRowWidth = buttongroup(
  'Width',
  [
    ['S', 'S'],
    ['M', 'M'],
    ['L', 'L'],
    ['XL', 'XL'],
    ['Full', 'Full'],
  ],
  {
    value: 'XL',
  },
);

const outerSpacing = sizes('Outer space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});

const advancedSettings = {
  advancedSettings: toggle('Advanced settings'),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Row'],
    configuration: { condition: showIfTrue('advanedSettings') },
  }),
};

const rowOptions = {
  maxRowWidth,
  rowHeight: text('Height', { configuration: { as: 'UNIT' } }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  outerSpacing,
  ...advancedSettings,
};

const allowedWidthInput: DropdownInput = [
  ['Fit content', 'fitContent'],
  ['Flexible', 'flexible'],
  ['Hidden', 'hidden'],
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
  ['11', '11'],
  ['12', '12'],
];

const allowedAlignmentInput: DropdownInput = [
  ['None', 'inherit'],
  ['Top', 'flex-start'],
  ['Center', 'center'],
  ['Bottom', 'flex-end'],
];

const columnOptions = {
  visible: toggle('Toggle visibility', { configuration: { as: 'VISIBILITY' } }),
  columnWidth: dropdown('Column width', allowedWidthInput, {
    value: 'flexible',
  }),
  columnWidthTabletLandscape: dropdown(
    'Column width (tablet landscape)',
    allowedWidthInput,
    { value: 'flexible' },
  ),
  columnWidthTabletPortrait: dropdown(
    'Column width (tablet portrait)',
    allowedWidthInput,
    { value: 'flexible' },
  ),
  columnWidthMobile: dropdown('Column width (mobile)', allowedWidthInput, {
    value: 'flefxible',
  }),
  columnHeight: text('Height', { configuration: { as: 'UNIT' } }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  horizontalAlignment: buttongroup(
    'Horizontal Alignment',
    allowedAlignmentInput,
    { value: 'inherit' },
  ),
  verticalAlignment: buttongroup('Vertical Alignment', allowedAlignmentInput, {
    value: 'inherit',
  }),
  outerSpacing,
  innerSpacing: sizes('Inner space', { value: ['M', 'M', 'M', 'M'] }),
  ...advancedSettings,
};

export default prefab('1 Column', attributes, undefined, [
  component('Row', { options: rowOptions }, [
    component('Column', { options: columnOptions }, []),
  ]),
]);
