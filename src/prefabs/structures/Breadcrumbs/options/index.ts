import {
  ThemeColor,
  addChild,
  color,
  endpoint,
  hideIf,
  icon,
  option,
  reconfigure,
  showIf,
  text,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { BreadcrumbItem } from '../../BreadcrumbItem';
import { breadcrumbItemOptions } from '../../BreadcrumbItem/options';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

const children = [
  BreadcrumbItem({
    options: {
      ...breadcrumbItemOptions,
      breadcrumbContent: variable('Content', {
        value: ['Breadcrumb Item'],
        showInAddChild: true,
        showInReconfigure: true,
      }),
      icon: icon('Icon', {
        value: 'None',
        showInAddChild: true,
        showInReconfigure: true,
      }),
      endpoint: endpoint('Page', {
        value: '',
        showInAddChild: true,
      }),
    },
  }),
];

export const breadcrumbsOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add Breadcrumb Item', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  maxItems: option('CUSTOM', {
    label: 'Max Items',
    value: '0',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'All', value: '0' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
      ],
    },
  }),
  itemsBeforeCollapse: option('CUSTOM', {
    label: 'Items before collapse',
    value: '1',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
      ],
      condition: hideIf('maxItems', 'EQ', '0'),
    },
  }),
  itemsAfterCollapse: option('CUSTOM', {
    label: 'Items after collapse',
    value: '1',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
      ],
      condition: hideIf('maxItems', 'EQ', '0'),
    },
  }),
  separatorType: option('CUSTOM', {
    label: 'Separator Type',
    value: 'text',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Text', value: 'text' },
        { name: 'Icon', value: 'icon' },
      ],
    },
  }),
  separatorText: text('Separator Text', {
    value: '/',
    configuration: {
      condition: showIf('separatorType', 'EQ', 'text'),
    },
  }),
  separatorIcon: icon('Separator Icon', {
    value: 'ChevronRight',
    configuration: {
      condition: showIf('separatorType', 'EQ', 'icon'),
    },
  }),
  separatorColor: color('Separator Color', { value: ThemeColor.BLACK }),

  ...advanced('Breadcrumbs'),
};
