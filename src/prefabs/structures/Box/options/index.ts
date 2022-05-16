import {
  sizes,
  size,
  color,
  option,
  ThemeColor,
  toggle,
  variable,
  showIf,
  buttongroup,
  dropdown,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  alignment: buttongroup(
    'Alignment',
    [
      ['None', 'none'],
      ['Left', 'flex-start'],
      ['Center', 'center'],
      ['Right', 'flex-end'],
      ['Justified', 'space-between'],
    ],
    {
      value: 'none',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  valignment: buttongroup(
    'Vertical alignment',
    [
      ['None', 'none'],
      ['Top', 'flex-start'],
      ['Center', 'center'],
      ['Bottom', 'flex-end'],
    ],
    {
      value: 'none',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  stretch: toggle('Stretch (when in flex container)', {
    value: false,
  }),
  transparent: toggle('Transparent', {
    value: false,
  }),
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
  innerSpacing: sizes('Inner space', {
    value: ['M', 'M', 'M', 'M'],
  }),
  positioningOptions: toggle('Show positioning options', {
    value: false,
  }),
  position: buttongroup(
    'Position',
    [
      ['Static', 'static'],
      ['Relative', 'relative'],
      ['Absolute', 'absolute'],
      ['Fixed', 'fixed'],
      ['Sticky', 'sticky'],
    ],
    {
      value: 'static',
      configuration: {
        dataType: 'string',
        condition: showIf('positioningOptions', 'EQ', true),
      },
    },
  ),
  top: size('Top position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  right: size('Right position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  bottom: size('Bottom position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  left: size('Left position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  backgroundOptions: toggle('Show background options', {
    value: false,
  }),
  backgroundColor: color('Background color', {
    value: ThemeColor.TRANSPARENT,
    configuration: {
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundColorAlpha: option('NUMBER', {
    label: 'Background color opacity',
    value: 100,
    configuration: {
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundUrl: variable('Background url', {
    value: [''],
    configuration: {
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundSize: buttongroup(
    'Background size',
    [
      ['Initial', 'initial'],
      ['Contain', 'contain'],
      ['Cover', 'cover'],
    ],
    {
      value: 'initial',
      configuration: {
        dataType: 'string',
        condition: showIf('backgroundOptions', 'EQ', true),
      },
    },
  ),
  backgroundPosition: dropdown(
    'Background position',
    [
      ['Left top', 'left top'],
      ['Left center', 'left center'],
      ['Left bottom', 'left bottom'],
      ['Center top', 'center top'],
      ['Center center', 'center center'],
      ['Center bottom', 'center bottom'],
      ['Right top', 'right top'],
      ['Right center', 'right center'],
      ['Right bottom', 'right bottom'],
    ],
    {
      value: 'center center',
      configuration: {
        dataType: 'string',
        condition: showIf('backgroundOptions', 'EQ', true),
      },
    },
  ),
  backgroundRepeat: buttongroup(
    'Background repeat',
    [
      ['None', 'no-repeat'],
      ['X', 'repeat-x'],
      ['Y', 'repeat-y'],
      ['All', 'repeat'],
    ],
    {
      value: 'no-repeat',
      configuration: {
        dataType: 'string',
        condition: showIf('backgroundOptions', 'EQ', true),
      },
    },
  ),
  backgroundAttachment: buttongroup(
    'Background attachment',
    [
      ['Inherit', 'inherit'],
      ['Scroll', 'scroll'],
      ['Fixed', 'fixed'],
    ],
    {
      value: 'inherit',
      configuration: {
        dataType: 'string',
        condition: showIf('backgroundOptions', 'EQ', true),
      },
    },
  ),
  borderColor: color('Border color', {
    value: ThemeColor.TRANSPARENT,
    configuration: {
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderWidth: size('Border thickness', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderStyle: buttongroup(
    'Border style',
    [
      ['None', 'none'],
      ['Solid', 'solid'],
      ['Dashed', 'dashed'],
      ['Dotted', 'dotted'],
    ],
    {
      value: 'solid',
      configuration: {
        dataType: 'string',
        condition: showIf('backgroundOptions', 'EQ', true),
      },
    },
  ),
  borderRadius: size('Border radius', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  ...advanced,
};
