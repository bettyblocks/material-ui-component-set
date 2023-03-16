import {
  ThemeColor,
  addChild,
  buttongroup,
  color,
  endpoint,
  property,
  reconfigure,
  size,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { SubviewItem } from '../../SubviewItem';
import { subviewItemOptions } from '../../SubviewItem/options';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

const children = [
  SubviewItem({
    options: {
      ...subviewItemOptions,
      prop: property('Property', {
        value: '',
        showInAddChild: true,
        showInReconfigure: true,
        configuration: {
          allowRelations: true,
          allowedKinds: [
            'BELONGS_TO',
            'HAS_AND_BELONGS_TO_MANY',
            'HAS_MANY',
            'HAS_ONE',
          ],
        },
      }),
      content: variable('Label', {
        value: [''],
        showInReconfigure: true,
      }),
      linkTo: endpoint('Page', {
        value: '',
        showInAddChild: true,
      }),
    },
  }),
];

export const subviewOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add Subview Item', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
  }),
  borderWidth: size('Border thickness', {
    value: '1px',
    configuration: {
      as: 'UNIT',
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
      },
    },
  ),
  borderRadius: size('Border radius', {
    value: '3px',
    configuration: {
      as: 'UNIT',
    },
  }),
  dense: toggle('Dense', { value: false }),

  ...advanced('Subview'),
};
