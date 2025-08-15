import {
  sizes,
  size,
  color,
  ThemeColor,
  model,
  text,
} from '@betty-blocks/component-sdk';
import { advanced } from '../advanced';

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
  propertyWhiteList: text('Property Whitelist', {}),
  ...advanced,
};
