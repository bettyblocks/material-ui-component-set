import { buttongroup, toggle, icon } from '@betty-blocks/component-sdk';

const variant = buttongroup(
  'Variant',
  [
    ['Standard', 'standard'],
    ['Outlined', 'outlined'],
    ['Filled', 'filled'],
  ],
  { value: 'outlined' },
);

const size = buttongroup(
  'Size',
  [
    ['Medium', 'medium'],
    ['Small', 'small'],
  ],
  { value: 'medium' },
);

const margin = buttongroup(
  'Margin',
  [
    ['None', 'none'],
    ['Dense', 'dense'],
    ['Normal', 'normal'],
  ],
  { value: 'normal' },
);

const adornmentPosition = buttongroup(
  'Position',
  [
    ['Start', 'start'],
    ['End', 'end'],
  ],
  {
    value: 'start',
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

export const defaultInputOptions = {
  variant,
  fullWidth: toggle('Full width', { value: true }),
  size,
  margin,
  adornmentIcon: icon('Adornment'),
  adornmentPosition,
};
