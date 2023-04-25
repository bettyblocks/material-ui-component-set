import {
  sizes,
  size,
  color,
  option,
  ThemeColor,
  model,
  text,
} from '@betty-blocks/component-sdk';
import { advanced } from '../advanced';

// export const categories = [
//   {
//     label: 'Alignment',
//     expanded: true,
//     members: ['alignment', 'valignment', 'stretch'],
//   },
//   {
//     label: 'Styling',
//     expanded: false,
//     members: ['innerSpacing', 'outerSpacing', 'transparent', 'height', 'width'],
//   },
//   {
//     label: 'Positioning',
//     expanded: false,
//     members: ['position', 'top', 'right', 'bottom', 'left'],
//   },
//   {
//     label: 'Background',
//     expanded: false,
//     members: [
//       'backgroundColor',
//       'backgroundColorAlpha',
//       'backgroundUrl',
//       'backgroundSize',
//       'backgroundPosition',
//       'backgroundRepeat',
//       'backgroundAttachment',
//       'borderColor',
//       'borderWidth',
//       'borderStyle',
//       'borderRadius',
//     ],
//   },
//   {
//     label: 'Advanced Options',
//     expanded: false,
//     members: ['dataComponentAttribute'],
//   },
// ];

export const filterComponentOptions = {
  modelId: model('Model'),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  highlightColor: color('Highlight Color', {
    value: ThemeColor.PRIMARY,
  }),
  textColor: color('Text Color', {
    value: ThemeColor.WHITE,
  }),
  borderColor: color('Border color', {
    value: ThemeColor.LIGHT,
  }),
  borderRadius: size('Border radius', {
    value: '4px',
    configuration: {
      as: 'UNIT',
    },
  }),
  backgroundColor: color('Background color', {
    value: ThemeColor.TRANSPARENT,
  }),
  backgroundColorAlpha: option('NUMBER', {
    label: 'Background color opacity',
    value: 100,
  }),
  propertyWhiteList: text('Property Whitelist', {}),
  ...advanced,
};
