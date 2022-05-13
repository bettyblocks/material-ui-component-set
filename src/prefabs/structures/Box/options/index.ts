import {
  sizes,
  color,
  option,
  ThemeColor,
  toggle,
  variable,
  showIf,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  alignment: option('CUSTOM', {
    value: 'none',
    label: 'Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Left', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'flex-end' },
        { name: 'Justified', value: 'space-between' },
      ],
    },
  }),
  valignment: option('CUSTOM', {
    value: 'none',
    label: 'Vertical alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Top', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Bottom', value: 'flex-end' },
      ],
    },
  }),
  stretch: toggle('Stretch (when in flex container)', {
    value: false,
  }),
  transparent: toggle('Transparent', {
    value: false,
  }),
  height: sizes('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: sizes('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: option('SIZES', {
    label: 'Outer space',
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  innerSpacing: option('SIZES', {
    label: 'Inner space',
    value: ['M', 'M', 'M', 'M'],
  }),
  positioningOptions: toggle('Show positioning options', {
    value: false,
  }),
  position: option('CUSTOM', {
    value: 'static',
    label: 'Position',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Static', value: 'static' },
        { name: 'Relative', value: 'relative' },
        { name: 'Absolute', value: 'absolute' },
        { name: 'Fixed', value: 'fixed' },
        { name: 'Sticky', value: 'sticky' },
      ],
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  top: sizes('Top position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  right: sizes('Right position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  bottom: sizes('Bottom position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('positioningOptions', 'EQ', true),
    },
  }),
  left: sizes('Left position', {
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
  backgroundSize: option('CUSTOM', {
    value: 'initial',
    label: 'Background size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Initial', value: 'initial' },
        { name: 'Contain', value: 'contain' },
        { name: 'Cover', value: 'cover' },
      ],
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundPosition: option('CUSTOM', {
    value: 'center center',
    label: 'Background position',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Left top', value: 'left top' },
        { name: 'Left center', value: 'left center' },
        { name: 'Left bottom', value: 'left bottom' },
        { name: 'Center top', value: 'center top' },
        { name: 'Center center', value: 'center center' },
        { name: 'Center bottom', value: 'center bottom' },
        { name: 'Right top', value: 'right top' },
        { name: 'Right center', value: 'right center' },
        { name: 'Right bottom', value: 'right bottom' },
      ],
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundRepeat: option('CUSTOM', {
    value: 'no-repeat',
    label: 'Background repeat',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'no-repeat' },
        { name: 'X', value: 'repeat-x' },
        { name: 'Y', value: 'repeat-y' },
        { name: 'All', value: 'repeat' },
      ],
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  backgroundAttachment: option('CUSTOM', {
    value: 'inherit',
    label: 'Background attachment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Inherit', value: 'inherit' },
        { name: 'Scroll', value: 'scroll' },
        { name: 'Fixed', value: 'fixed' },
      ],
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderColor: color('Border color', {
    value: ThemeColor.TRANSPARENT,
    configuration: {
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderWidth: sizes('Border thickness', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderStyle: option('CUSTOM', {
    value: 'solid',
    label: 'Border style',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Solid', value: 'solid' },
        { name: 'Dashed', value: 'dashed' },
        { name: 'Dotted', value: 'dotted' },
      ],
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  borderRadius: sizes('Border radius', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('backgroundOptions', 'EQ', true),
    },
  }),
  ...advanced,
};
