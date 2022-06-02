import {
  buttongroup,
  color,
  hideIf,
  icon,
  sizes,
  ThemeColor,
  toggle,
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
  icon: icon('Icon', {
    value: 'None',
  }),
  collapsable: toggle('Collapsable', {
    value: false,
  }),
  horizontalAlignment: buttongroup(
    'Horizontal Alignment',
    [
      ['Left', 'flex-start'],
      ['Center', 'center'],
      ['Right', 'flex-end'],
    ],
    {
      value: 'flex-start',
      configuration: {
        dataType: 'string',
        condition: hideIf('collapsable', 'EQ', true),
      },
    },
  ),
  verticalAlignment: buttongroup(
    'Vertical Alignment',
    [
      ['Top', 'flex-start'],
      ['Center', 'center'],
      ['Bottom', 'flex-end'],
      ['Justified', 'stretch'],
    ],
    {
      value: 'stretch',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', 'M', '0rem'],
  }),
};
