import { buttongroup, toggle, icon } from '@betty-blocks/component-sdk';

const variant = buttongroup('Variant', [
  ['Standard', 'standard'],
  ['Outlined', 'outlined'],
  ['Filled', 'filled'],
]);

const size = buttongroup('Size', [
  ['Medium', 'medium'],
  ['Small', 'small'],
]);

const margin = buttongroup('Margin', [
  ['None', 'none'],
  ['Dense', 'dense'],
  ['Normal', 'normal'],
]);

const adornmentPosition = buttongroup(
  'Position',
  [
    ['Start', 'start'],
    ['End', 'end'],
  ],
  {
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
