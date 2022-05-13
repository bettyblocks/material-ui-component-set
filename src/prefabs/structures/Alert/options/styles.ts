import {
  color,
  hideIf,
  option,
  sizes,
  ThemeColor,
} from '@betty-blocks/component-sdk';

export const styles = {
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
  }),
  iconColor: color('Icon color', {
    value: ThemeColor.BLACK,
  }),
  background: color('Background color', {
    value: ThemeColor.SUCCESS,
  }),
  borderColor: color('Border color', {
    value: ThemeColor.TRANSPARENT,
  }),

  horizontalAlignment: option('CUSTOM', {
    label: 'Horizontal Alignment',
    value: 'flex-start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'flex-end' },
      ],
      condition: hideIf('collapsable', 'EQ', true),
    },
  }),
  verticalAlignment: option('CUSTOM', {
    label: 'Vertical Alignment',
    value: 'stretch',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Top', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Bottom', value: 'flex-end' },
        { name: 'Justified', value: 'stretch' },
      ],
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', 'M', '0rem'],
  }),
};
