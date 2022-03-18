import {
  showIfTrue,
  color,
  toggle,
  ThemeColor,
  buttongroup,
  icon,
} from '@betty-blocks/component-sdk';

const stylesAttrs = {
  configuration: { condition: showIfTrue('styles') },
};

const variant = buttongroup(
  'Variant',
  [
    ['Standard', 'standard'],
    ['Outlined', 'outlined'],
    ['Filled', 'filled'],
  ],
  { value: 'outlined'},
);

const size = buttongroup(
  'Size',
  [
    ['Medium', 'medium'],
    ['Small', 'small'],
  ],
  { value: 'medium'},
);

const margin = buttongroup(
  'Margin',
  [
    ['None', 'none'],
    ['Dense', 'dense'],
    ['Normal', 'normal'],
  ],
  { value: 'normal'},
);

const adornmentPosition = buttongroup(
  'Position',
  [
    ['Start', 'start'],
    ['End', 'end'],
  ],
  {
    value: 'end',
    configuration: {
      condition: {
        type: 'HIDE',
        option: 'adornmentIcon',
        comparator: 'EQ',
        value: '',
      },
    },
  },
);

export const defaultStylesOptions = {
  margin,
  size,
  fullWidth: toggle('Full width', { value: true }),
  variant,
  adornmentIcon: icon('Icon', {
    value: '',
  }),
  adornmentPosition,
  styles: toggle('Styles'),
  hideLabel: toggle('Hide label', stylesAttrs),
  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    ...stylesAttrs,
  }),
  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
    ...stylesAttrs,
  }),
  borderHoverColor: color('Border color (hover)', {
    value: ThemeColor.BLACK,
    ...stylesAttrs,
  }),
  borderFocusColor: color('Border color (focus)', {
    value: ThemeColor.PRIMARY,
    ...stylesAttrs,
  }),
  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    ...stylesAttrs,
  }),
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    ...stylesAttrs,
  }),
  placeholderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
    ...stylesAttrs,
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
    ...stylesAttrs,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
    ...stylesAttrs,
  }),
};
