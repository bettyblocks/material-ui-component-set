import {
  ThemeColor,
  addChild,
  color,
  hideIf,
  icon,
  option,
  reconfigure,
  sizes,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

import { advanced } from '../../advanced';
import { MenuItem } from '../../MenuItem';
import { menuItemOptions } from '../../MenuItem/options';

export const categories = [
  {
    label: 'Position',
    expanded: false,
    members: ['placement'],
  },
  {
    label: 'State',
    expanded: false,
    members: ['disabled'],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'size',
      'fullWidth',
      'outerSpacing',
      'textColor',
      'background',
      'menuColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

const children = [
  MenuItem({
    options: {
      ...menuItemOptions,
      primaryText: variable('Primary text', {
        value: [],
        showInAddChild: true,
        showInReconfigure: true,
      }),
      icon: icon('Icon', {
        value: 'none',
        showInAddChild: true,
        showInReconfigure: true,
      }),
    },
  }),
];

export const menuOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add Menu Item', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  isMenuListVisible: toggle('Toggle menu', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  variant: option('CUSTOM', {
    label: 'Menu Button Variant',
    value: 'contained',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Text', value: 'text' },
        { name: 'Outlined', value: 'outlined' },
        { name: 'Contain', value: 'contained' },
        { name: 'Icon', value: 'icon' },
      ],
    },
  }),
  buttonText: variable('Button text', {
    value: ['Menu'],
    configuration: {
      condition: hideIf('variant', 'EQ', 'icon'),
    },
  }),
  fullWidth: toggle('Full width', {
    value: false,
    configuration: {
      condition: hideIf('variant', 'EQ', 'icon'),
    },
  }),
  size: option('CUSTOM', {
    value: 'medium',
    label: 'Button Size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Large', value: 'large' },
        { name: 'Medium', value: 'medium' },
        { name: 'Small', value: 'small' },
      ],
    },
  }),
  icon: icon('Icon', { value: 'None' }),
  iconPosition: option('CUSTOM', {
    label: 'Icon position',
    value: 'start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      condition: hideIf('variant', 'EQ', 'icon'),
      allowedInput: [
        { name: 'Start', value: 'start' },
        { name: 'End', value: 'end' },
      ],
    },
  }),
  textColor: color('Button Text color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: hideIf('variant', 'EQ', 'icon'),
    },
  }),
  background: color('Button Color', { value: ThemeColor.PRIMARY }),
  outerSpacing: sizes('Button Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  menuColor: color('Menu color', { value: ThemeColor.WHITE }),
  placement: option('CUSTOM', {
    label: 'Menu Placement',
    value: 'bottom-start',
    configuration: {
      as: 'DROPDOWN',
      allowedInput: [
        {
          name: 'Bottom-End',
          value: 'bottom-end',
        },
        {
          name: 'Bottom-Start',
          value: 'bottom-start',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
        {
          name: 'Left-End',
          value: 'left-end',
        },
        {
          name: 'Left-Start',
          value: 'left-start',
        },
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right-End',
          value: 'right-end',
        },
        {
          name: 'Right-Start',
          value: 'right-start',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Top-End',
          value: 'top-end',
        },
        {
          name: 'Top-Start',
          value: 'top-start',
        },
        {
          name: 'Top',
          value: 'top',
        },
      ],
    },
  }),
  disabled: toggle('Disabled', { value: false }),

  ...advanced('Menu'),
};
