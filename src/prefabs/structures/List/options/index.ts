import {
  ThemeColor,
  addChild,
  color,
  reconfigure,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

import { advanced } from '../../advanced';
import { ListItem } from '../../ListItem';
import { listItemOptions } from '../../ListItem/options';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

const children = [
  ListItem({
    options: {
      ...listItemOptions,
      primaryText: variable('Primary text', {
        value: ['Title'],
        showInAddChild: true,
        showInReconfigure: true,
      }),
      secondaryText: variable('Secondary text', {
        value: [''],
        showInAddChild: true,
      }),
    },
  }),
];

export const listOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add List Item', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
  disablePadding: toggle('Disable padding', { value: false }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  dense: toggle('Dense', { value: false }),

  ...advanced('List'),
};
