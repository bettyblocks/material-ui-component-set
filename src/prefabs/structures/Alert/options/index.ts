import {
  buttongroup,
  color,
  font,
  hideIf,
  icon,
  sizes,
  ThemeColor,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'titleFont',
      'font',
      'textColor',
      'iconColor',
      'background',
      'borderColor',
    ],
  },
  {
    label: 'Alignment',
    expanded: false,
    members: ['horizontalAlignment', 'verticalAlignment'],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['outerSpacing'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const alertOptions = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  titleText: variable('Title text', {
    value: [''],
  }),
  allowTitleServerResponse: toggle(
    'Allow to overwrite by the server response',
    {
      value: false,
    },
  ),
  bodyText: variable('Body text', {
    value: ['Type your content here...'],
  }),
  allowTextServerResponse: toggle('Allow to overwrite by the server response', {
    value: false,
  }),

  titleFont: font('Title text style', { value: 'Body1' }),
  font: font('Body text style', { value: 'Body1' }),

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

  ...advanced('Alert'),
};
